# Folder Model Artefak

Letakkan **4 file `.pkl` hasil training** dari notebook skripsi Anda di folder ini:

```
ml-service/models/
  ├─ hea_model.pkl          # objek LMPNNFast hasil fit (k=9)
  ├─ hea_vectorizer.pkl     # TfidfVectorizer (5000 fitur, unigram+bigram)
  ├─ hea_label_encoder.pkl  # LabelEncoder (107 kelas)
  └─ hea_calibration.pkl    # array nonconformity scores kalibrasi
```

## Penting
- Kelas `LMPNNFast` sudah direplikasi di `inference.py` agar `hea_model.pkl`
  bisa di-*unpickle*. Jangan ubah nama/struktur kelas tersebut.
- Jika muncul warning versi scikit-learn saat load, samakan versi di
  `requirements.txt` dengan versi yang dipakai saat training (lihat sel Fase 0
  notebook — kolom `scikit-learn`).
- File `.pkl` sengaja di-*ignore* git (lihat `.gitignore`) karena ukurannya besar.
