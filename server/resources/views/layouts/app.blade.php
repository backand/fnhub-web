<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>funhub - Publish and Consume lambda functions</title>
  <meta name="description" content="funhub - Publish and Consume lambda functions">
  <!-- base url -->
    <base href="/">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <!-- Configured Head Tags  -->
	<link rel="manifest" href="/assets/manifest.json">
	<meta name="msapplication-TileColor" content="#00bcd4">
	<meta name="msapplication-TileImage" content="/assets/icon/ms-icon-144x144.png">
	<meta name="theme-color" content="#00bcd4">

  <!-- Async Google Analytics: change UA-71073175-1 to be your site's ID -->
  <script>
    window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
    ga('create', 'UA-71073175-1', 'auto');
    ga('send', 'pageview');
  </script>
  <script async src="https://www.google-analytics.com/analytics.js"></script>
  <!-- End Google Analytics -->

  <!-- CSS will be injected by webpack here -->
  <!-- Preload link tags will be injected by webpack here -->
  <link href="main.css" rel="stylesheet"><link rel="preload" href="main.bundle.js" as="script"/><link rel="preload" href="polyfills.bundle.js" as="script"/></head>
<body class="bg-none  @stack('body-class') ">
  <div class="app">
  <div class="app-content">
    <app-header></app-header>
    <div class="app-body">
       @yield('content')
    </div>
    <div class="app-footer"></div>
  </div>
</div>
  <!-- Scripts will be injected by webpack here -->
<script type="text/javascript" src="polyfills.bundle.js"></script>
<script type="text/javascript" src="main.bundle.js" async></script>
</body>
</html>
