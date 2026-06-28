"""
HeA AI — Inference core (LMPNN k=9 + Split Conformal Prediction)
================================================================
Replika persis dari notebook skripsi (HeCa.ipynb) Fase 4 & Fase 6.
Kelas LMPNNFast WAJIB identik dengan saat training agar file
`hea_model.pkl` dapat di-unpickle dengan benar.

Artefak yang dibutuhkan di folder ./models :
  - hea_model.pkl          (objek LMPNNFast hasil fit, k=9)
  - hea_vectorizer.pkl     (TfidfVectorizer, 5000 fitur)
  - hea_label_encoder.pkl  (LabelEncoder, 107 kelas)
  - hea_calibration.pkl    (array nonconformity scores kalibrasi)
"""
import os
import re
import sys
import types
import pickle
import numpy as np
from scipy.sparse import issparse

MODELS_DIR = os.environ.get(
    "MODELS_DIR", os.path.join(os.path.dirname(__file__), "models")
)

# Produksi berjalan CPU-only (tanpa CuPy/GPU).
GPU_AVAILABLE = False


# ============================================================
# CUPY STUB
# Model dilatih di Kaggle (GPU aktif), sehingga class_means_gpu_
# ikut tersimpan sebagai cupy.ndarray di dalam hea_model.pkl.
# Stub ini memalsukan modul cupy agar pickle.load tidak crash
# di mesin tanpa GPU/CuPy.
# ============================================================

class _CupyArrayStub:
    """Penampung kosong untuk cupy.ndarray saat unpickle. Tidak dipakai saat inferensi."""
    def __new__(cls, *args, **kwargs):
        return object.__new__(cls)

    def __setstate__(self, state):
        # Buang state CuPy — atribut ini tidak dipakai karena GPU_AVAILABLE=False.
        self._cupy_state = state

    def __reduce_ex__(self, protocol):
        return (object.__new__, (self.__class__,), {})


def _install_cupy_stub():
    """Masukkan modul cupy palsu ke sys.modules sebelum pickle.load."""
    submodules = [
        "cupy",
        "cupy.core",
        "cupy._core",
        "cupy._core.core",
        "cupy.core.core",
        "cupy.cuda",
        "cupy.cuda.memory",
        "cupy.cuda.runtime",
        "cupy.random",
        "cupy.linalg",
    ]
    for name in submodules:
        if name not in sys.modules:
            m = types.ModuleType(name)
            # Setiap submodul punya ndarray = stub agar pickle bisa resolve
            m.ndarray = _CupyArrayStub
            # Fungsi umum yang mungkin direferensikan
            m.array = lambda *a, **kw: np.array(*a, **kw)
            m.zeros = lambda *a, **kw: np.zeros(*a, **kw)
            m.asnumpy = lambda x: np.array(x) if not isinstance(x, np.ndarray) else x
            sys.modules[name] = m

    # Pastikan cupy.ndarray selalu menunjuk ke stub
    sys.modules["cupy"].ndarray = _CupyArrayStub


# ============================================================
# CLASS LMPNN — VECTORIZED (disalin verbatim dari notebook)
# Harus identik supaya pickle.load(hea_model.pkl) berhasil.
# ============================================================
class LMPNNFast:
    """LMPNN dengan prediksi fully-vectorized (cosine distance ke local mean)."""

    def __init__(self, k=5, n_jobs=-1):
        self.k = k
        self.n_jobs = n_jobs

    def fit(self, X, y):
        self.classes_ = np.unique(y)
        n_classes = len(self.classes_)

        if issparse(X):
            X_dense = np.asarray(X.todense(), dtype=np.float32)
        else:
            X_dense = X.astype(np.float32)

        n_features = X_dense.shape[1]
        class_means = np.zeros((n_classes, n_features), dtype=np.float32)

        for ci, cls in enumerate(self.classes_):
            idx = np.where(y == cls)[0]
            X_cls = X_dense[idx]
            n_cls = len(idx)
            k_eff = min(self.k, n_cls)

            if k_eff == n_cls:
                class_means[ci] = X_cls.mean(axis=0)
            else:
                norms = np.linalg.norm(X_cls, axis=1, keepdims=True)
                norms = np.where(norms == 0, 1e-10, norms)
                X_norm = X_cls / norms
                sim_mat = X_norm @ X_norm.T

                local_means = np.zeros_like(X_cls)
                for si in range(n_cls):
                    sims = sim_mat[si].copy()
                    sims[si] = -999
                    knn_idx = np.argpartition(sims, -k_eff)[-k_eff:]
                    local_means[si] = X_cls[knn_idx].mean(axis=0)

                class_means[ci] = local_means.mean(axis=0)

        self.class_means_ = class_means
        if GPU_AVAILABLE:
            import cupy as cp  # pragma: no cover
            self.class_means_gpu_ = cp.array(class_means)
        return self

    def predict(self, X, batch_size=512):
        if issparse(X):
            X_dense = np.asarray(X.todense(), dtype=np.float32)
        else:
            X_dense = X.astype(np.float32)

        n_test = X_dense.shape[0]
        preds = np.zeros(n_test, dtype=np.int32)

        m_norms = np.linalg.norm(self.class_means_, axis=1, keepdims=True)
        m_norms = np.where(m_norms == 0, 1e-10, m_norms)
        means_norm = self.class_means_ / m_norms

        for start in range(0, n_test, batch_size):
            end = min(start + batch_size, n_test)
            X_bat = X_dense[start:end]
            x_norms = np.linalg.norm(X_bat, axis=1, keepdims=True)
            x_norms = np.where(x_norms == 0, 1e-10, x_norms)
            X_norm = X_bat / x_norms
            cos_sim = X_norm @ means_norm.T
            preds[start:end] = np.argmax(cos_sim, axis=1)

        return preds

    def predict_with_distances(self, X, batch_size=512):
        """Predict + kembalikan cosine distance per kelas (untuk CP)."""
        if issparse(X):
            X_dense = np.asarray(X.todense(), dtype=np.float32)
        else:
            X_dense = X.astype(np.float32)

        n_test = X_dense.shape[0]
        n_classes = len(self.classes_)
        all_dists = np.zeros((n_test, n_classes), dtype=np.float32)

        m_norms = np.linalg.norm(self.class_means_, axis=1, keepdims=True)
        m_norms = np.where(m_norms == 0, 1e-10, m_norms)
        means_norm = self.class_means_ / m_norms

        for start in range(0, n_test, batch_size):
            end = min(start + batch_size, n_test)
            X_bat = X_dense[start:end]
            x_norms = np.linalg.norm(X_bat, axis=1, keepdims=True)
            x_norms = np.where(x_norms == 0, 1e-10, x_norms)
            X_norm = X_bat / x_norms
            cos_sim = X_norm @ means_norm.T
            all_dists[start:end] = 1.0 - cos_sim

        preds = np.argmin(all_dists, axis=1)
        return preds, all_dists


# Daftarkan ke __main__ agar pickle yang dibuat di Kaggle (__main__.LMPNNFast)
# tetap bisa dimuat saat dijalankan via uvicorn.
import __main__  # noqa: E402

if not hasattr(__main__, "LMPNNFast"):
    setattr(__main__, "LMPNNFast", LMPNNFast)


# ============================================================
# PREPROCESSING — identik dengan _preprocess() di notebook
# Case folding → cleaning regex → stopword removal → stemming (Sastrawi)
# ============================================================
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory

_stemmer = StemmerFactory().create_stemmer()
_stopwords = set(StopWordRemoverFactory().get_stop_words())


def preprocess(text: str) -> str:
    text = text.lower()
    text = re.sub(r"http\S+|www\S+", "", text)
    text = re.sub(r"[^a-zA-Z\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    tokens = [
        _stemmer.stem(t)
        for t in text.split()
        if t not in _stopwords and len(t) > 1
    ]
    return " ".join(tokens)


# ============================================================
# MODEL HOLDER
# ============================================================
class HeCaModel:
    def __init__(self):
        self.model = None
        self.vectorizer = None
        self.le = None
        self.alpha = None
        self.loaded = False

    def load(self):
        # Pasang CuPy stub SEBELUM pickle.load agar model yang
        # dilatih di GPU (Kaggle) bisa dimuat di mesin tanpa CuPy.
        _install_cupy_stub()

        def _p(name):
            return os.path.join(MODELS_DIR, name)

        with open(_p("hea_model.pkl"), "rb") as f:
            self.model = pickle.load(f)
        with open(_p("hea_vectorizer.pkl"), "rb") as f:
            self.vectorizer = pickle.load(f)
        with open(_p("hea_label_encoder.pkl"), "rb") as f:
            self.le = pickle.load(f)
        with open(_p("hea_calibration.pkl"), "rb") as f:
            self.alpha = np.asarray(pickle.load(f))

        self.loaded = True
        return self

    @property
    def classes(self):
        return self.le.classes_.tolist()

    def predict(self, text: str, epsilon: float = 0.10, top_k: int = 15) -> dict:
        if not self.loaded:
            raise RuntimeError("Model belum dimuat. Panggil load() lebih dulu.")

        clean = preprocess(text) or text.lower()
        X = self.vectorizer.transform([clean])
        x_arr = X.toarray()[0]
        x_norm = float(np.linalg.norm(x_arr))

        pred_idx = int(self.model.predict(X)[0])
        pred_class = self.le.classes_[pred_idx]

        n_calib = len(self.alpha)
        n_cls = len(self.le.classes_)
        p_values = np.zeros(n_cls, dtype=np.float64)
        cos_sims = np.zeros(n_cls, dtype=np.float64)

        for c in range(n_cls):
            mc = self.model.class_means_[c]
            denom = x_norm * float(np.linalg.norm(mc)) + 1e-10
            cos = float(np.dot(x_arr, mc) / denom)
            cos_sims[c] = cos
            alpha_test = float(np.clip(1 - cos, 0, 1))
            p_values[c] = float(np.sum(self.alpha >= alpha_test) / (n_calib + 1))

        sp = np.sort(p_values)[::-1]
        credibility = float(sp[0])
        confidence = float(1 - sp[1]) if len(sp) > 1 else 1.0

        pred_set = self.le.classes_[p_values > epsilon].tolist()
        if pred_class not in pred_set:
            pred_set.insert(0, pred_class)

        top_idx = np.argsort(p_values)[::-1][:top_k]

        cred_level = (
            "Sangat Yakin"
            if credibility >= 0.7
            else "Cukup Yakin"
            if credibility >= 0.3
            else "Tidak Yakin — Perlu Verifikasi Dokter"
        )
        cred_color = (
            "green" if credibility >= 0.7 else "orange" if credibility >= 0.3 else "red"
        )

        return {
            "input_text": text,
            "clean_text": clean,
            "prediction": pred_class,
            "credibility": round(credibility, 4),
            "confidence": round(confidence, 4),
            "credibility_level": cred_level,
            "credibility_color": cred_color,
            "prediction_set": pred_set,
            "prediction_set_size": len(pred_set),
            "epsilon": epsilon,
            # data untuk visualisasi KNN / p-value landscape
            "top_classes": self.le.classes_[top_idx].tolist(),
            "top_pvalues": [round(float(p_values[i]), 4) for i in top_idx],
            "top_similarity": [round(float(cos_sims[i]), 4) for i in top_idx],
            "top_distance": [round(float(1 - cos_sims[i]), 4) for i in top_idx],
        }


MODEL = HeCaModel()
