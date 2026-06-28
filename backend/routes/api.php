<?php

use App\Http\Controllers\ConsultationController;
use Illuminate\Support\Facades\Route;

Route::get('/health', [ConsultationController::class, 'health']);
Route::get('/classes', [ConsultationController::class, 'classes']);

Route::post('/consultations', [ConsultationController::class, 'store']);
Route::get('/consultations', [ConsultationController::class, 'index']);
