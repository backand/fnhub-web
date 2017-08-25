<?php
function get_gravatar( $email, $s = 80, $d = 'mm', $r = 'g', $img = false,$default=1, $atts = array() ) {
  $baseURL = $_SERVER['SERVER_NAME'];
  $whitelist = array(
    '127.0.0.1',
    '::1',
    'localhost'
  );
  if(in_array($_SERVER['SERVER_NAME'], $whitelist)){
    $baseURL = 'https://fnhubqa.herokuapp.com';
  }
    $url = 'https://www.gravatar.com/avatar/';
    $url .= md5( strtolower( trim( $email ) ) );
    $url .= "?s=$s&default=".urlencode($baseURL.'/assets/img/avatar/'.rand(1,6).'.png');
    if ( $img ) {
        $url = '<img src="' . $url . '"';
        foreach ( $atts as $key => $val )
            $url .= ' ' . $key . '="' . $val . '"';
        $url .= ' />';
    }
    return $url;
}
