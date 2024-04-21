<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('news', function (Blueprint $table) {
            $table->date('started_at')->default(now())->change();
            $table->date('expired_at')->default(now()->addDays(7))->change();
        });
    }

    public function down()
    {
        Schema::table('news', function (Blueprint $table) {
            $table->date('started_at')->change();
            $table->date('expired_at')->change();
        });
    }
};
