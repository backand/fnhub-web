@extends('layouts.app')
@section('content')
    <div class="container page-module-detail">
        <div class="row">

            <div class="col-md-9">
               <h2 class="page-heading" *ngIf="$module.name"><i class="fa fa-star fa-fw text-primary"></i> {{$module['name']}}</h2>
                    <div class="page-content m-t-md text-gray-lt">
                        <div class="markdown-body">
                            {!! $detail !!}
                        </div>
                    </div>
            </div>

            <div class="col-md-3 sidebar with-border">
                <nav>
                    <div class="sidebar-item">
                        <div class="sidebar-item-heading">Install</div>
                        <p class="text-gray-lt">blambda i @backand/vanilla-sdk</p>
                        <p class="text-primary _600"><a href="">need help? learn more</a></p>
                    </div>
                    <div class="sidebar-item">
                        <ul class="list small sidebar-list">
                            <li class="list-item">
                                <div class="list-left">
                                    <img src="/assets/img/avatar/user_50px.png" class="w-32 circle img-thumbnail">
                                </div>
                                <div class="list-body">
                                    <span class="text-primary">{{$user['fullName']}}</span> <span class="text-gray-lt">updated at {{$module['updatedAt']}}</span>
                                </div>
                            </li>
                            <li class="list-item">
                                <div class="list-left">
                                    <i class="fa fa-code-fork fa-fw fa-2x" aria-hidden="true"></i>
                                </div>
                                <div class="list-body">
                                    <span class="text-gray-lt">
                                        @if(isset($module['versions']) && count($module['versions']) > 0)
                                            {{$module['versions'][0]['major']}}
                                        @endif
                                    </span>
                                </div>
                            </li>
                            <li class="list-item">
                                <div class="list-left">
                                    <i class="fa fa-github fa-fw fa-2x"></i>
                                </div>
                                <div class="list-body">
                                    <a href="{{$module['githubRepo']}}" target="_blank"
                                       class="_600">{{$module['githubRepo']}}</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <!--div class="sidebar-item">
                      <div class="sidebar-item-heading">collaboators <a href="" class="pull-right text-primary">All</a></div>
                      <div>
                        <img src="/assets/img/avatar/avatar.png" class="w-48 circle img-thumbnail m-r-sm"> <img src="/assets/img/avatar/avatar04.png"
                          class="w-48 circle img-thumbnail m-r-sm"><img src="/assets/img/avatar/avatar2.png" class="w-48 circle img-thumbnail m-r-sm">
                        <img src="/assets/img/avatar/avatar3.png" class="w-48 circle img-thumbnail">
                      </div>
                    </div -->

                    <div class="sidebar-item">
                        <div class="sidebar-item-heading">Language</div>
                        <ul class="nav flex-column">
                            @foreach ($languages as $language)
                                <li class="nav-item">
                                    <span class="nav-link {{ $language['key'] == strtolower($module['language']) ? 'text-primary' : '' }}">   @if ($language['key'] == strtolower($module['language']))
                                            <i class="fa fa-caret-right"
                                               aria-hidden="true"></i> @endif  {{$language['name']}}</span>
                                </li>
                            @endforeach
                        </ul>
                    </div>

                    <div class="sidebar-item">
                        <div class="sidebar-item-heading">Keywords</div>
                        @if ( count($module['keywords']) == 0)
                            <p>No keyword</p>
                        @endif
                        <ul class="nav flex-column">
                            @foreach ($module['keywords'] as $keyword)
                                <li class="nav-item">
                                    <span class="nav-link">{{$keyword}}</span>
                                </li>
                            @endforeach
                        </ul>
                    </div>

                    <div class="sidebar-item">
                    <team data-comp-id="module" data-module = "{{$module['name']}}" data-team="{{isset($module['team']) && count($module['team']) ?  json_encode($module['team']) : json_encode(array())}}"></team>
                </nav>
            </div>
        </div>
    </div>
@endsection