<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Backand;

class UserController extends Controller
{

    private $backand;

    public function __construct(Backand $backand)
    {
        $this->backand = $backand;
    }



    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $user_name="")
    {
        
        $user = $this->backand->getUserbyUserName($user_name);
        $avatar = get_gravatar($user['email'], 56);
        return view('user.profile', compact('user', 'avatar'));
    }
}
