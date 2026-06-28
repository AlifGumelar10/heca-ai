<?php

return [

    /*
    |--------------------------------------------------------------------------
    | ML Inference Service (FastAPI)
    |--------------------------------------------------------------------------
    */
    'ml' => [
        'url'     => env('ML_SERVICE_URL', 'http://localhost:8001'),
        'timeout' => env('ML_SERVICE_TIMEOUT', 30),
    ],

];
