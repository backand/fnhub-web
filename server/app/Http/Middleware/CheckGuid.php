<?php

namespace App\Http\Middleware;

use Closure;
use App\Services\Backand;

class CheckGuid
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
    public function handle($request, Closure $next)
    {
     
      $route = $request->route()->getAction();
      $routeName = isset($route['as']) ? $route['as'] : '';
      $guid = $request->input('guid');
      $module = $request->route('module_name', '');
     if( isset($guid) &&  ($guid !== '') ){
      if(!$this->backand->isAuthenticated()){
        return redirect()->route('signin', array('guid'=>$guid, 'module'=>$module));
      }
     }
      return $next($request);
    }
}
