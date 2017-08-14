@extends('layouts.app')
@push('body-class', 'bg-pattern')
@push('body-class', ' page-features')
@section('content')
<div class="section">
  <div class="container text-center text-white" style="max-width:700px;">
    <div class="mx-auto">
      <h1 class="_300">A Hub for Your Functions</h1>
      <p class="lead">Simplify sharing your functions with the serverless community</p>
      <app-search-module data-comp-id="app_search_module"></app-search-module>
    </div>
  </div>
</div>
@endsection