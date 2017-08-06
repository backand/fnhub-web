@extends('layouts.app')

@section('content')
    <div class="container page-module-detail">
        <div class="row">

            <div class="col-md-9">
                <div class="page-content">
                    <div class="d-flex mb-3">
                        <div>
                            <img class="w-64 circle img-thumbnail" src="/assets/img/avatar/avatar.png"
                                 alt="Generic placeholder image">
                        </div>
                        <div class="align-self-center p-2 pl-3"><h2 class="mt-0 mb-0">Itay Last Name</h2></div>
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

                            <li class="list-item px-0">
                                <div class="list-body">
                                    <h5><a routerLink="/module/1" class="_600">template-mailer-aws-lambda</a></h5>
                                    <div><span class="text-gray-lt small">by: </span><a href="">coderbyheart</a></div>
                                    <p class="text-gray-lt">A transactional email mailer that runs on AWS lambda and
                                        sends emails via SES</p>
                                    <div class="text-gray-lt"><i class="fa fa-code-fork fa-fw"
                                                                 aria-hidden="true"></i><span>3.3.1</span></div>
                                </div>
                            </li>

                            <li class="list-item px-0">
                                <div class="list-body">
                                    <h5><a routerLink="/module/1" class="_600">template-mailer-aws-lambda</a></h5>
                                    <div><span class="text-gray-lt small">by: </span><a href="">coderbyheart</a></div>
                                    <p class="text-gray-lt">A transactional email mailer that runs on AWS lambda and
                                        sends emails via SES</p>
                                    <div class="text-gray-lt"><i class="fa fa-code-fork fa-fw"
                                                                 aria-hidden="true"></i><span>3.3.1</span></div>
                                </div>
                            </li>

                            <li class="list-item px-0">
                                <div class="list-body">
                                    <h5><a routerLink="/module/1" class="_600">template-mailer-aws-lambda</a></h5>
                                    <div><span class="text-gray-lt small">by: </span><a href="">coderbyheart</a></div>
                                    <p class="text-gray-lt">A transactional email mailer that runs on AWS lambda and
                                        sends emails via SES</p>
                                    <div class="text-gray-lt"><i class="fa fa-code-fork fa-fw"
                                                                 aria-hidden="true"></i><span>3.3.1</span></div>
                                </div>
                            </li>
                        </ul>
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
                                    <img src="/assets/img/avatar/avatar.png" class="w-32 circle img-thumbnail">
                                </div>
                                <div class="list-body">
                                    <span class="text-primary">UserName</span> <span class="text-gray-lt">updated at 12/12/2017</span>
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
                      <div>
                        <img src="/assets/img/avatar/avatar.png" class="w-48 circle img-thumbnail m-r-sm"> <img src="/assets/img/avatar/avatar04.png"
                          class="w-48 circle img-thumbnail m-r-sm"><img src="/assets/img/avatar/avatar2.png" class="w-48 circle img-thumbnail m-r-sm">
                        <img src="/assets/img/avatar/avatar3.png" class="w-48 circle img-thumbnail">
                      </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
@endsection