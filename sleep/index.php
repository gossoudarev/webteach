<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
header('By: Ilya Goss');

if (isset($_GET['error'])) {
    header('Content-type: text/html'); 
    header('HTTP/1.0 404 Not Found');
    die('<h1>404 Not found</h1>');
}

if (isset($_GET['n'])) {
    $n = $_GET['n'];
} else {
    $n = 15;
}

echo '{"date1":"' .  date('H:i:s') . '",';

//sleep for 15 seconds
sleep($n);

//start again
echo '"date2":"' .  date('H:i:s') . '"}';

?>