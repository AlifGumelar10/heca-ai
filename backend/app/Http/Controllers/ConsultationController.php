<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Services\MlClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ConsultationController extends Controller
{
    public function __construct(protected MlClient $ml) {}

    /**
     * POST /api/consultations
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'text'       => ['required', 'string', 'min:3', 'max:2000'],
            'epsilon'    => ['nullable', 'numeric', 'min:0', 'max:1'],
            'session_id' => ['nullable', 'string', 'max:64'],
        ]);

        $epsilon = (float) ($data['epsilon'] ?? 0.10);

        try {
            $result = $this->ml->predict($data['text'], $epsilon);
        } catch (\Throwable $e) {
            Log::error('ML predict gagal', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Layanan model sedang tidak tersedia. Coba lagi sebentar.',
            ], 503);
        }

        $consultation = Consultation::create([
            'session_id'          => $data['session_id'] ?? null,
            'input_text'          => $result['input_text']          ?? $data['text'],
            'clean_text'          => $result['clean_text']          ?? null,
            'prediction'          => $result['prediction']          ?? null,
            'credibility'         => $result['credibility']         ?? null,
            'confidence'          => $result['confidence']          ?? null,
            'credibility_level'   => $result['credibility_level']   ?? null,
            'credibility_color'   => $result['credibility_color']   ?? null,
            'prediction_set'      => $result['prediction_set']      ?? [],
            'prediction_set_size' => $result['prediction_set_size'] ?? 0,
            'epsilon'             => $epsilon,
            'top_classes'         => $result['top_classes']         ?? [],
            'top_pvalues'         => $result['top_pvalues']         ?? [],
            'top_similarity'      => $result['top_similarity']      ?? [],
            'top_distance'        => $result['top_distance']        ?? [],
        ]);

        return response()->json([
            'data'       => $result,
            'id'         => $consultation->id,
            'created_at' => $consultation->created_at,
        ], 201);
    }

    /**
     * GET /api/consultations
     */
    public function index(Request $request): JsonResponse
    {
        $query = Consultation::query()->latest();
        if ($sid = $request->query('session_id')) {
            $query->where('session_id', $sid);
        }
        return response()->json([
            'data' => $query->limit((int) $request->query('limit', 30))->get(),
        ]);
    }

    /**
     * GET /api/classes
     */
    public function classes(): JsonResponse
    {
        try {
            return response()->json($this->ml->classes());
        } catch (\Throwable $e) {
            return response()->json(['classes' => [], 'total' => 0], 503);
        }
    }

    /**
     * GET /api/health
     */
    public function health(): JsonResponse
    {
        return response()->json([
            'backend'    => 'ok',
            'ml_service' => $this->ml->health(),
        ]);
    }
}
