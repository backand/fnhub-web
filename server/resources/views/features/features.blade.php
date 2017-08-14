@extends('layouts.app')
@push('body-class', 'bg-pattern')
@push('body-class', ' page-features')
@section('content')
    <div class="section">
        <div class="container text-center text-white features-banner">
            <div class="justify-content-md-center">
                <h1 class="_300 m-b-sm">A Hub for Your Functions</h1>
                <h5 class="m-b-lg">Simplify sharing your functions with the serverless community</h5>
                <app-search-module data-comp-id="app_search_module"></app-search-module>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="page-features-container">
            <div class="section">
                <div class="section-item">
                    <div class="mx-auto w-m-920">
                        <div class="row justify-content-md-center">
                            <div class="col align-self-center col-xs-12">
                                <h2 class="_300">Open-Source</h2>
                                <h5>FnHub.io uses open source software to provide all
                                    functionality.</h5>
                            </div>
                            <div class="col col-xs-12 text-center">
                                <img src="/assets/img/open-source.png">
                            </div>
                        </div>
                    </div>

                </div>
                <div class="section-item">
                    <div class="mx-auto w-m-920">
                        <div class="row justify-content-md-center">
                            <div class="col text-center"><img src="/assets/img/provider-agnostic.png"></div>
                            <div class="col align-self-center">
                                <h2 class="_300">Provider-agnostic</h2>
                                <h5>FnHub.io is built to make working with any serverless function
                                    provider
                                    painless.</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="section-item">
                    <div class="mx-auto w-m-920">
                        <div class="row justify-content-md-center">
                            <div class="col align-self-center">
                                <h2 class="_300">Language-Independent</h2>
                                <h5>FnHub.io adds no special restrictions on languages or
                                    platforms.</h5>
                            </div>
                            <div class="col text-center">
                                <img src="/assets/img/language-independent.png">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="section-item">
                    <div class="mx-auto w-m-920">
                        <div class="row justify-content-md-center">
                            <div class="col text-center">
                                <img src="/assets/img/easy-deployment.png">
                            </div>
                            <div class="col align-self-center">
                                <h2 class="_300">Easy Deployment</h2>
                                <h5>Deploy your functions with a single command, instead of a
                                    labyrinthine
                                    GUI</h5>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>

    <div class="container">
        <div class="section bg-faded">
            <div class="section-item">
                <div class="mx-auto w-m-920">
                    <div class="justify-content-md-center text-center m-b-lg">
                        <h2 class="_300">Community Driven</h2>
                        <h5>Our CLI gives you all the tools you need to work with FnHub functions.</h5>
                    </div>
                    <div class="row">
                        <div class="col col-xs-12">
                            <img src="/assets/img/cmd.png" class="img-fluid">
                        </div>
                        <div class="col col-xs-12 align-self-center">
                            <div>
                                <h3>For Publishers</h3>
                                <p>Want to share a new function? Publish it with a single command.</p>
                            </div>
                            <div class="m-t-md">
                                <h3>For Consumers</h3>
                                <p>Want to include another serverless function in your app? Use our CLI to pull down
                                    the
                                    and deploy the code.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container">
        <div class="section bg-white cli-section">
            <div class="section-item">
                <div class="mx-auto p-x-lg">
                    <div class="justify-content-md-center text-center m-b-lg">
                        <h2 class="_300">CLI-Powered</h2>
                        <h5>FnHub.io is focused on building a serverless community. Our source code is available on
                            GitHub,
                            and you retain all rights to the functions you share per your project's license.</h5>
                    </div>
                    <div class="row justify-content-md-center">
                        <div class="col col-sm-2 col-xs-6">
                            <img src="/assets/img/github.png">
                        </div>
                        <div class="col col-sm-2 col-xs-6">
                            <img src="/assets/img/node.png">
                        </div>
                        <div class="col col-sm-2 col-xs-6">
                            <img src="/assets/img/aws-lambda.png">
                        </div>
                        <div class="col col-sm-2 col-xs-6">
                            <img src="/assets/img/google.png">
                        </div>
                        <div class="col col-sm-2 col-xs-6">
                            <img src="/assets/img/microsoft.png">
                        </div>
                        <div class="col col-sm-2 col-xs-6">
                            <img src="/assets/img/python-logo.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div class="container">
        <div class="section bg-white">
            <div class="section-item">
                <div class="mx-auto w-m-920">
                    <div class="justify-content-md-center text-center m-b-lg ">
                        <h2 class="_300">Get Started</h2>
                        <h5>Ready to get started? Just pick one of the following quickstart guides:</h5>
                    </div>
                    <div class="row">
                        <div class="col">
                            <button  class="btn primary btn-block btn-lg" type="button">Publish a
                                package
                            </button>
                        </div>
                        <div class="col">
                            <button  class="btn primary btn-block btn-lg" type="button">Import a
                                package
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection