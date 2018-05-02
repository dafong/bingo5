<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    //
    protected $fillable = ['name','address','email'];

    protected $guarded = [];

    public function generateToken(){
        $this->api_token = str_random(60);
        $this->save();
        return $this->api_token;
    }
}
