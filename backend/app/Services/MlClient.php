<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

/**
 * Klien HTTP untuk ml-service (FastAPI) yang menyajikan LMPNN + Conformal Prediction.
 */
class MlClient
{
    protected string $baseUrl;
    protected int $timeout;

    public function __construct()
    {
        $this->baseUrl = rtrim((string) config('services.ml.url'), '/');
        $this->timeout = (int) config('services.ml.timeout', 30);
    }

    public function predict(string $text, float $epsilon = 0.10): array
    {
        $response = Http::timeout($this->timeout)
            ->acceptJson()
            ->post($this->baseUrl.'/predict', [
                'text' => $text,
                'epsilon' => $epsilon,
            ]);

        $response->throw();

        return $response->json();
    }

    public function classes(): array
    {
        $response = Http::timeout($this->timeout)
            ->acceptJson()
            ->get($this->baseUrl.'/classes');

        $response->throw();

        return $response->json();
    }

    public function health(): array
    {
        $response = Http::timeout($this->timeout)
            ->acceptJson()
            ->get($this->baseUrl.'/health');

        return $response->json() ?? ['status' => 'unreachable'];
    }
}
