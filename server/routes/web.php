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


Route::group(['middleware' => ['web']], function () {
      Route::get('/', function () {
        return view('home');
    });
    Route::get('/module/{module_name}', 'ModuleController@show');

    Route::get('/auth/signin', 'AuthController@signin');
    Route::get('/auth/signup', 'AuthController@signup');
    Route::get('/auth/reset-password', 'AuthController@resetPassword');
    Route::get('/auth/forgot-password','AuthController@forgotPassword');

    Route::get('/users','UserController@show');
    Route::get('/users/{user_name}','UserController@show');

    Route::get('/features','FeatureController@index');
});