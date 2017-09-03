@extends('layouts.app')
@section('content')
    <div class="container page-docs">

        <div class="row">
            <div class="col-md-3 sidebar hidden-xs-down">
                <nav>
                    <div class="sidebar-item">
                        <ul class="nav flex-column">
                        @foreach ($links as $link)
                                <li class="nav-item">
                                    <a class="nav-link px-0" href="#">{{$link['title']}}</a>
                                    @if(isset($link['sub_menu']) && count($link['sub_menu']) > 0)
                                        <ul class="nav flex-column">
                                            @foreach ($link['sub_menu'] as $sub_link)
                                                <li class="nav-item">
                                                <a href="{{$sub_link['link']}}"
                                                   class="nav-link d-block _300"><i class="fa fa-caret-right fa-fw text-primary" aria-hidden="true" style="visibility:{{($page_slug == str_replace("/docs/", "", $sub_link['link'])) ? 'visible' : 'hidden' }}"></i>{{$sub_link['title']}} </a>
                                                </li>
                                            @endforeach
                                        </ul>
                                    @endif
                                </li>
                        @endforeach
                        </ul>
                    </div>
                </nav>
            </div>

            <div class="col-md-9">
                <div class="page-entry">
                    @include('docs.'.$page_slug)
                </div>
            </div>
        </div>
    </div>
@endsection