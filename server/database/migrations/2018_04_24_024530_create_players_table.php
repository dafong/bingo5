<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlayersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('players');
        Schema::create('players', function (Blueprint $table) {

            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email');
            $table->string('api_token')->nullable(true);
            $table->string('address')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('players');
    }
}
