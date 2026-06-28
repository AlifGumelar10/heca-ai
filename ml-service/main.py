"""
HeA AI — ML Inference Service (FastAPI)
=======================================
Menyajikan model LMPNN k=9 + Conformal Prediction sebagai REST API.
Dipanggil oleh backend Laravel (bukan langsung dari browser).

Jalankan lokal:
  uvicorn main:app --host 0.0.0.0 --port 8001 --reload
"""
import os
import logging

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

import inference

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("hea-ml")

app = FastAPI(title="HeA AI — ML Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Keluhan/pertanyaan kesehatan")
    epsilon: float = Field(0.10, ge=0.0, le=1.0, description="Tingkat signifikansi CP")


@app.on_event("startup")
def _startup():
    try:
        inference.MODEL.load()
        logger.info(
            "Model dimuat: %d kelas, %d sampel kalibrasi",
            len(inference.MODEL.classes),
            len(inference.MODEL.alpha),
        )
    except FileNotFoundError as exc:
        logger.warning(
            "Artefak model belum ada di %s (%s). "
            "Letakkan file .pkl lalu restart service.",
            inference.MODELS_DIR,
            exc,
        )
    except Exception as exc:  # noqa: BLE001
        logger.exception("Gagal memuat model: %s", exc)


@app.get("/health")
def health():
    return {
        "status": "ok" if inference.MODEL.loaded else "model_not_loaded",
        "loaded": inference.MODEL.loaded,
        "classes": len(inference.MODEL.classes) if inference.MODEL.loaded else 0,
    }


@app.get("/classes")
def classes():
    if not inference.MODEL.loaded:
        raise HTTPException(status_code=503, detail="Model belum dimuat")
    cls = inference.MODEL.classes
    return {"classes": cls, "total": len(cls)}


@app.post("/predict")
def predict(req: PredictRequest):
    if not inference.MODEL.loaded:
        raise HTTPException(
            status_code=503,
            detail="Model belum dimuat. Pastikan file .pkl ada di folder models/.",
        )
    try:
        return inference.MODEL.predict(req.text, req.epsilon)
    except Exception as exc:  # noqa: BLE001
        logger.exception("Prediksi gagal")
        raise HTTPException(status_code=500, detail=str(exc))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.environ.get("PORT", "8001")),
        reload=True,
    )
