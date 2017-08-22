<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group(['middleware' => ['web','backandAuth']], function () {
      Route::get('/', function () {
        return view('home');
    });
    Route::get('/module/{module_name}', array('as' => 'module', 'uses' => 'ModuleController@show'))->middleware('checkGuid');

    Route::get('/auth/signin', array('as' => 'signin', 'uses' => 'AuthController@signin') );
    Route::get('/auth/signup', array('as' => 'signup', 'uses' => 'AuthController@signup') );
    Route::get('/auth/reset-password', 'AuthController@resetPassword');
    Route::get('/auth/forgot-password','AuthController@forgotPassword');

    Route::get('/users','UserController@show');
    Route::get('/users/{user_name}','UserController@show');

    Route::get('/features','FeatureController@index');
});