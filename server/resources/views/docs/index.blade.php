@extends('layouts.app')
@section('content')
    <div class="container page-docs">
        <div class="section">
            <div class="section-body">
                <div class="mx-auto">
                    <div class="row justify-content-md-center">
                        <div class="col-md-12">
                            <h1 class="page-heading text-center _300">Help and Documentation</h1>
                            <div class="row">
                                @foreach ($links as $link)
                                    <div class="col-md-4">
                                        <h4 class="mb-3">{{$link['title']}}</h4>
                                        @if(isset($link['sub_menu']) && count($link['sub_menu']) > 0)
                                            <div>
                                                @foreach ($link['sub_menu'] as $sub_link)
                                                    <a href="{{$sub_link['link']}}"
                                                       class="d-block _600 mb-2"> {{$sub_link['title']}} </a>
                                                @endforeach
                                            </div>
                                        @endif
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr class="small"/>
        <div class="section">
            <div class="section-body">
                <div class="mx-auto">
                    <div class="row justify-content-md-center">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-4">
                                    <h4 class="mb-3">Function Submission Guidelines</h4>
                                    <p class="text-muted"><a href="">repo</a> Provides quick details on the information needed to successfully submit a
                                        function to the repo</p>
                                </div>
                                <div class="col-md-4">
                                    <h4 class="mb-3">Report an Issue</h4>
                                    <p class="text-muted"><a href="">repo</a> a quick means through which they can
                                        report an issue with the site or with the
                                        function hub itself
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection