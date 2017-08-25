@extends('layouts.app')

@section('content')
    <div class="container page-module-detail">
        <div class="row">
            <div class="col-md-8">
                <div class="page-content">
                    <div class="d-flex mb-3">
                        <div>
                        <img src="{{ $avatar }}" class="w-56 circle" />
                        </div>
                        <div class="align-self-center p-2 pl-3"><h2 class="mt-0 mb-0">{{$user['fullName']}}</h2></div>
                    </div>

                    <p class="text-gray-lt"> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>

                    <div class="text-grey-lighter">
                        <span class="mr-3">20.5.2016</span>
                        <span class="mr-3">github.com/itay/vanilla-sdk</span>
                        <span><i class="fa fa-code-fork fa-fw"aria-hidden="true"></i><span>3.3.1</span></span>
                    </div>

                    <h4 class="mt-lg-5">Projects</h4>
                    <div class="list-container">
                        <ul class="list package-list">
                            @if( isset($user['modules']) && is_array($user['modules']) && count($user['modules']) > 0)
                                @foreach ($user['modules'] as $module)
                                    <li class="list-item px-0">
                                        <div class="list-body">
                                            <h5><a href="/module/{{$module['name']}}" class="_600 text-black">{{$module['name']}}</a></h5>
                                            <div><span class="text-gray-lt small">by: </span><a href="">{{$user['fullName']}}</a></div>
                                            <p class="text-gray-lt">{{$module['description']}}</p>
                                            <div class="text-gray-lt"><i class="fa fa-code-fork fa-fw" aria-hidden="true"></i><span>{{$module['latestVersion']}}</span></div>
                                        </div>
                                    </li>
                                @endforeach
                            @else
                                <li class="list-item px-0">
                                    <div class="list-body">
                                        No project
                                    </div>
                                </li>
                            @endif
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col-md-4 sidebar with-border">
                <nav>
                    <div class="sidebar-item">
                        <div class="sidebar-item-heading">Install</div>
                        <p class="text-gray-lt">blambda i @backand/vanilla-sdk</p>
                        <p class="text-primary _600"><a href="">need help? learn more</a></p>
                    </div>
                    <div class="sidebar-item">
                        <ul class="list small sidebar-list">
                            <li class="list-item d-flex">
                            <div class="d-flex mb-3">
                              <div>
                                <img src="{{ $avatar }}" class="w-40 circle" />
                              </div>
                                <div class="align-self-center p-2 pl-3"> Change your avatar at <a href="https://en.gravatar.com/" target="_blank">gravatar.com</a></div>
                              </div>
                            </li>
                            <li class="list-item">
                                <div class="list-left">
                                    <i class="fa fa-code-fork fa-fw fa-2x" aria-hidden="true"></i>
                                </div>
                                <div class="list-body">
                                    <span class="text-gray-lt">
                                       1.2.2
                                    </span>
                                </div>
                            </li>
                            <li class="list-item">
                                <div class="list-left">
                                    <i class="fa fa-github fa-fw fa-2x"></i>
                                </div>
                                <div class="list-body">
                                    <a href="" target="_blank"
                                       class="_600">http://google.com</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="sidebar-item">
                      <div class="sidebar-item-heading">collaboators <a href="" class="pull-right text-primary">All</a></div>
                     
                      <div class="team">
                      <div class="d-inline m-r-sm">
                        <img src="/assets/img/avatar/1.png" class="w-56 circle img-thumbnail">
                        </div>
                        <div class="d-inline m-r-sm">
                        <img src="/assets/img/avatar/2.png" class="w-56 circle img-thumbnail">
                        </div>
                        <div class="d-inline m-r-sm">
                        <img src="/assets/img/avatar/3.png" class="w-56 circle img-thumbnail">
                        </div>
                        <div class="d-inline m-r-sm">
                        <img src="/assets/img/avatar/4.png" class="w-56 circle img-thumbnail">
                        </div>
                        <div class="d-inline m-r-sm">
                        <img src="/assets/img/avatar/5.png" class="w-56 circle img-thumbnail">
                        </div>
                      </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
@endsection