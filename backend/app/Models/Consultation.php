<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    protected $fillable = [
        'session_id',
        'input_text',
        'clean_text',
        'prediction',
        'credibility',
        'confidence',
        'credibility_level',
        'credibility_color',
        'prediction_set',
        'prediction_set_size',
        'epsilon',
        'top_classes',
        'top_pvalues',
        'top_similarity',
        'top_distance',
    ];

    protected $casts = [
        'credibility' => 'float',
        'confidence' => 'float',
        'epsilon' => 'float',
        'prediction_set' => 'array',
        'top_classes' => 'array',
        'top_pvalues' => 'array',
        'top_similarity' => 'array',
        'top_distance' => 'array',
    ];
}
