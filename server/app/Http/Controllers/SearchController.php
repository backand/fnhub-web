<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
class SearchController extends Controller
{

    public function __construct(){
      
    }

    /**
     * render index view.
     */
    public function index()
    {
        return view('search');
    }

}
