<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'app' => 'HeA AI — Laravel API',
        'status' => 'running',
        'docs' => '/api/health',
    ]);
});
