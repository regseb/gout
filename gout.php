<?php

// Creer la requete.
$ch = curl_init();
curl_setopt_array($ch, array(
    CURLOPT_URL            => $_GET['url'],
    // CURLOPT_PROXY          => 'www.proxy.com:80',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_USERAGENT      => $_SERVER['HTTP_USER_AGENT'],
    CURLOPT_ENCODING       => $_SERVER['HTTP_ACCEPT_ENCODING'],
    CURLOPT_HTTPHEADER     => array('Accept: ' . $_SERVER['HTTP_ACCEPT'],
                                    'Accept-Language: '
                                    . $_SERVER['HTTP_ACCEPT_LANGUAGE'])));

// $log = fopen(rand() . 'request.txt', 'w');
// curl_setopt_array($ch, array(
//     CURLOPT_VERBOSE => 1,
//     CURLOPT_STDERR  => $log));

// Gerer les cookies.
if (array_key_exists('id', $_GET)) {
    $cookie = __DIR__ . '/tmp/' . $_GET['id'] . '.cookie';
    if (file_exists($cookie))
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie);
    else
        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie);
}

// Gerer les parametres en methode POST.
if ('POST' === $_SERVER['REQUEST_METHOD']) {
    $fields = '';
    foreach ($_POST as $var => $val)
        if (is_array($val))
            foreach ($val as $subval)
                $fields .= '&' . $var . '[]=' . urlencodes($subval);
        else
            $fields .= '&' . $var . '=' . urlencode($val);
    curl_setopt_array($ch, array(
        CURLOPT_POST       => true,
        CURLOPT_POSTFIELDS => substr($fields, 1)));
}

$res = curl_exec($ch);
if (false === $res) {
    $err = 'Curl error: ' . curl_error($soap_do);
    curl_close($ch);
//     fclose($log);
    print $err;
} else {
    curl_close($ch);
//     fclose($log);
    echo $res;
}
