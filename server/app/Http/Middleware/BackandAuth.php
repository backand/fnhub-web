<?php

namespace App\Http\Middleware;

use Closure;
use Cookie;
use App\Services\Backand;

class BackandAuth
{
  private $backand;
  
  public function __construct(Backand $backand){
      $this->backand = $backand;
  }

  /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next){   
      if($request->path() === '/'){
        if(!$this->backand->isAuthenticated() && !($request->input('q') || $request->input('l')) ){
         // return redirect('/features');
        } 
      }
      return $next($request);
    }
}
