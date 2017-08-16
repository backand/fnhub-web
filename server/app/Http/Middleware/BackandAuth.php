<?php

namespace App\Http\Middleware;

use Closure;
use Cookie;

class BackandAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
     
      $user = isset($_COOKIE['BACKAND_user']) ? json_decode($_COOKIE['BACKAND_user'], true) : null;
      //die($request->path());
      if($request->path() === '/'){
        if(!$user && !($request->input('q') || $request->input('l')) ){
          return redirect('/features');
        } 
      }
      return $next($request);
    }
}
