<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('consultations', function (Blueprint $table) {
            $table->id();
            $table->string('session_id', 64)->nullable()->index();
            $table->text('input_text');
            $table->text('clean_text')->nullable();
            $table->string('prediction')->nullable();
            $table->float('credibility')->nullable();
            $table->float('confidence')->nullable();
            $table->string('credibility_level')->nullable();
            $table->string('credibility_color', 16)->nullable();
            $table->jsonb('prediction_set')->nullable();
            $table->unsignedInteger('prediction_set_size')->default(0);
            $table->float('epsilon')->default(0.10);
            $table->jsonb('top_classes')->nullable();
            $table->jsonb('top_pvalues')->nullable();
            $table->jsonb('top_similarity')->nullable();
            $table->jsonb('top_distance')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};
