<?php

header("Access-Control-Allow-Origin: *"); 
header("Content-type: application/json; charset=utf-8" );

require 'vendor/autoload.php';
$client = new MongoDB\Client("mongodb://student_account:Qwerty.123@kodaktor.ru/experimental");
$collection = $client->experimental->users; 

$get_name = isset($_GET['name']) ? $_GET['name'] : '';

$result = $collection->find($get_name ? ['name'=> $get_name] : []);

$json_response = [];

foreach ($result as $entry) {
    $json_response[] = [
        'name' => $entry['name'],
        'fname' => $entry['fname']
    ];
}

echo json_encode(['users' => $json_response]);