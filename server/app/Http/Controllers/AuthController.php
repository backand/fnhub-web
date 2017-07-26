<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
class AuthController extends Controller
{

    public function __construct(){
      
    }

    /**
     * render signin view.
     */
    public function signin()
    {
        return view('auth.signin');
    }

     /**
     * render signup view.
     */
    public function signup()
    {
        return view('auth.signup');
    }

    /**
     * render forgotPassword view.
     */
    public function forgotPassword()
    {
        return view('auth.forgotPassword');
    }

    /**
     * render resetPassword view.
     */
    public function resetPassword()
    {
        return view('auth.resetPassword');
    }

}
