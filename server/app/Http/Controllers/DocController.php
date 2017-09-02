<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DocController extends Controller
{
    protected $links;
    public function __construct()
    {
        $path = resource_path() . "/doc.links.json";
        $this->links = json_decode(file_get_contents($path), true);
    }


    /**
     * render index view.
     */
    public function index()
    {

         return view('docs.index', ['links'=>$this->links]);
}

    /**
     * render page view.
     */
    public function getPageBySlug(Request $request, $page_slug)
    {
        if(view()->exists('docs.'.$page_slug)){
            return view('docs.docs', ['links'=>$this->links, 'page_slug' =>$page_slug ]);
        }else{
            return view('errors.404');
        }

    }

}
