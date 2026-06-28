# HeA AI — Health Analysis AI

Web chatbot klasifikasi keluhan kesehatan berbahasa Indonesia berbasis **LMPNN (k=9) + Conformal Prediction**, dengan UI ber-estetika **Apple / Glass UI** (sudut membulat, kaca buram).

> Berdasarkan skripsi *Alif Gumelar Syah Moeslim* — "Klasifikasi Teks Kesehatan Indonesia: LMPNN + Conformal Prediction".

---

## Arsitektur (3-tier)

```
   Browser
      │
      ▼  HTTP (JSON)
┌──────────────┐      ┌────────────────┐      ┌──────────────────┐
│  Frontend    │ ───▶ │  Backend API   │ ───▶ │  ML Service      │
│  Next.js     │      │  Laravel       │      │  FastAPI (Python)│
│  (Vercel)    │ ◀─── │  + PostgreSQL  │ ◀─── │  LMPNN + CP      │
└──────────────┘      └────────────────┘      └──────────────────┘
   :3000               :8000  /api            :8001
```

**Kenapa ada ML Service terpisah?** Model Anda 100% Python (scikit-learn, Sastrawi, numpy). Laravel berjalan di PHP dan tidak bisa menjalankan model itu secara native. Maka model disajikan sebagai microservice FastAPI; Laravel menjadi *API gateway* (validasi, simpan riwayat ke PostgreSQL, proxy) dan Next.js sebagai antarmuka.

```
heca-ai/
├─ ml-service/     # FastAPI — inferensi LMPNN + Conformal Prediction
├─ backend/        # Laravel — API gateway + PostgreSQL (riwayat)
├─ frontend/       # Next.js — UI Apple/Glass + chat + visualisasi KNN/CP
└─ docker-compose.yml
```

---

## ⚡ Cara cepat (Docker, semua sekaligus)

```bash
# 1) Letakkan 4 file model di ml-service/models/ (lihat di bawah)
# 2) Generate APP_KEY Laravel sekali:
docker run --rm php:8.2-cli php -r "echo 'base64:'.base64_encode(random_bytes(32)).PHP_EOL;"
#    salin hasilnya ke variabel APP_KEY (buat file .env dari .env.example)
cp .env.example .env   # lalu isi APP_KEY

# 3) Jalankan semuanya
docker compose up --build
```

Akses: **http://localhost:3000**

---

## 📦 File model (WAJIB)

Salin 4 artefak hasil training dari notebook ke `ml-service/models/`:

| File | Isi |
|------|-----|
| `hea_model.pkl` | objek `LMPNNFast` hasil fit (k=9) |
| `hea_vectorizer.pkl` | `TfidfVectorizer` (5000 fitur) |
| `hea_label_encoder.pkl` | `LabelEncoder` (107 kelas) |
| `hea_calibration.pkl` | array nonconformity scores kalibrasi |

Kelas `LMPNNFast` sudah direplikasi di `ml-service/inference.py` agar `hea_model.pkl` dapat dimuat.

---

## 🛠️ Menjalankan manual di VS Code (3 terminal)

### Terminal 1 — ML Service (Python)
```bash
cd ml-service
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```
Cek: http://localhost:8001/health

### Terminal 2 — Backend (Laravel)
Prasyarat: PHP 8.2+, Composer, PostgreSQL berjalan + database `heca`.
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve --port=8000
```
Cek: http://localhost:8000/api/health

### Terminal 3 — Frontend (Next.js)
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```
Buka: http://localhost:3000

---

## 🗄️ Database

Buat database & user PostgreSQL (sesuaikan dengan `.env`):
```sql
CREATE DATABASE heca;
CREATE USER heca WITH PASSWORD 'secret';
GRANT ALL PRIVILEGES ON DATABASE heca TO heca;
```
Tabel `consultations` dibuat otomatis lewat `php artisan migrate` dan menyimpan tiap analisis (input, prediksi, credibility, confidence, prediction set, top-15 p-value).

---

## 🔌 Kontrak API (Laravel)

| Method | Endpoint | Keterangan |
|--------|----------|-----------|
| `POST` | `/api/consultations` | `{ text, epsilon, session_id }` → prediksi + simpan |
| `GET`  | `/api/consultations` | riwayat (filter `?session_id=`) |
| `GET`  | `/api/classes` | 107 kelas medis |
| `GET`  | `/api/health` | status backend + ml-service |

Contoh respons `POST /api/consultations` (`data`):
```json
{
  "prediction": "Sakit Kepala",
  "credibility": 0.82,
  "confidence": 0.74,
  "credibility_level": "Sangat Yakin",
  "credibility_color": "green",
  "prediction_set": ["Sakit Kepala", "Migrain"],
  "epsilon": 0.1,
  "top_classes": ["..."],
  "top_pvalues": [0.82, 0.31],
  "top_similarity": [0.61, 0.40]
}
```

---

## 🚀 Deployment

- **Frontend → Vercel.** Import folder `frontend/`, set env `NEXT_PUBLIC_API_URL` ke URL backend publik Anda.
- **Backend (Laravel) + ML Service + PostgreSQL → VPS/Cloud via Docker.** `docker compose up -d` di server, lalu arahkan domain/HTTPS (mis. Nginx/Caddy) ke port 8000.
- Pastikan `FRONTEND_URL` di backend menunjuk domain Vercel agar CORS lolos.

---

## ⚠️ Disclaimer
HeA AI adalah alat bantu klasifikasi teks, **bukan** pengganti diagnosis dokter.
