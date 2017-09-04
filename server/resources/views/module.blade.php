@extends('layouts.app')
@section('content')
    <div class="container page-module-detail">
        <div class="row">
            <div class="col-md-8">
               <h2 class="page-heading" *ngIf="$module.name"><i class="fa fa-star fa-fw text-primary"></i> {{$module['name']}}</h2>
                    <div class="page-content m-t-md text-gray-lt">
                        <div class="markdown-body">
                            {!! $detail !!}
                        </div>
                    </div>
            </div>

            <div class="col-md-4 sidebar with-border">
                <nav>
                    <div class="sidebar-item p-b-sm">
                        <div class="sidebar-item-heading">Install</div>
                        <p class="text-gray-lt">blambda i @backand/vanilla-sdk</p>
                        <p class="text-primary _600"><a href="">need help? learn more</a></p>
                    </div>
                    <div class="sidebar-item p-b-sm">
                        <ul class="list small sidebar-list">
                            <li class="list-item d-flex">
                            <div class="d-flex mb-3">
                              <div>
                                <img src="{{ $avatar }}" class="w-40 circle" />
                              </div>
                                <div class="align-self-center p-2 pl-3"> <a class="text-primary" href="/users/{{$user['username']}}">{{$user['fullName']}}</a> <span class="text-gray-lt">updated at {{$module['updatedAt']}}</span></div>
                              </div>
                            </li>
                            <li class="list-item">
                                <div class="list-left">
                                    <i class="fa fa-code-fork fa-fw fa-2x" aria-hidden="true"></i>
                                </div>
                                <div class="list-body">
                                    <span class="text-gray-lt">
                                        @if(isset($module['latestVersion']))
                                            {{$module['latestVersion']}}
                                        @else
                                        1.0.0
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

                    <div class="sidebar-item p-b-sm">
                    <team data-comp-id="module" data-module = "{{$module['name']}}" data-team="{{isset($module['team']) && count($module['team']) ?  json_encode($module['team']) : json_encode(array())}}"></team>
                    </div>

                    <div class="sidebar-item p-b-sm">
                        <div class="sidebar-item-heading">Language</div>
                        <ul class="nav flex-column">
                                <li class="nav-item">
                                  <span class="nav-link text-primary"><i class="fa fa-caret-right fa-fw" aria-hidden="true"></i>  {{$module['language']}}</span>
                                </li>
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
                </nav>
            </div>
        </div>
    </div>
@endsection