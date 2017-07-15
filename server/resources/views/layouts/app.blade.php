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
  <link rel="apple-touch-icon" sizes="57x57" href="/assets/icon/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="/assets/icon/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/assets/icon/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/assets/icon/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/assets/icon/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="/assets/icon/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="/assets/icon/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="/assets/icon/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/assets/icon/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192" href="/assets/icon/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/assets/icon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="/assets/icon/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/assets/icon/favicon-16x16.png">
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
<body>
  <div class="app">
  <div class="app-content">
    <header class="app-header single-layout">
      <!---->

      <!----><div class="container-fluid">
        <div class="row">
          <div class="col col-lg-2 col-sm-2 logo-wrapper">
            <div class="logo">
              <a class="fnHub" routerlink="/" href="#/">
              <img class="hidden-xs-down" src="/assets/img/logo.png">
              <img class="hidden-sm-up" src="/assets/img/logo_mobile.png">
              </a>
            </div>
          </div>
          <div class="col">
            <div class="nav-wrapper">
              <div class="row hidden-xs-down">
                <div class="col">
                  <div class="row justify-content-md-center">                
                    <div class="col-12 col-md-auto">
                      <nav class="nav main-nav">
                        <a class="nav-link" href="#">features</a>
                        <a class="nav-link" href="#">documentation</a>
                        <a class="nav-link" href="#">support</a>
                      </nav>
                    </div>
                  </div>
                </div>
                <div class="col col-lg-3">
                  <ul class="nav pull-right right-nav">
                    <li class="nav-item">
                      <a class="nav-link active" href="#">singup</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">login</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="row search-wrapper">
                <div class="col">
                  <form style="display:flex; width:100%" method="GET" action = "/">
                  <div class="input-group search-input">
  <input class="form-control" placeholder="find packages" name="q" type="text">
  <span class="input-group-btn">
                      <i class="fa fa-search"></i>
                  </span>
</div>
</form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      
    </header>
    <div class="app-body">
       @yield('content')
    </div>
    <div class="app-footer"></div>
  </div>
</div>
</body>
</html>
