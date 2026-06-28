FROM python:3.11-slim

WORKDIR /app

# Dependency layer (cache friendly)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Source
COPY . .

ENV MODELS_DIR=/app/models
EXPOSE 8001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
