<?php
namespace App\Services;
use Illuminate\Support\Facades\Cookie;

class Backand
{

    private $ANONYMOUS_TOKEN;
    private $APP_NAME;
    private $REST_URL;

    public function __construct()
    {
        $this->ANONYMOUS_TOKEN = env('ANONYMOUS_TOKEN');
        $this->APP_NAME = env('APP_NAME');
        $this->REST_URL = env('REST_URL');
    }


    public function getUser(){
        return Cookie::get('backand_token');
    }

    public function isAnonymous(){
        return 'yes';
    }
}
