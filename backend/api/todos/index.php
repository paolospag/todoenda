<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

define('DB_FILE_PATH',  dirname(__DIR__, 1) .'/db.json');

$db_str = file_get_contents(DB_FILE_PATH);
$db = json_decode($db_str, false);

function json_pretty_encode($data) {
  return preg_replace_callback ('/^ +/m', function($m) {
    return str_repeat (' ', strlen ($m[0]) / 2);
  }, json_encode ($data, JSON_PRETTY_PRINT));
}

function array_search_by_id($arr, $id) {
  $search = array_filter($arr, function($obj) use($id) {
    return property_exists($obj, 'id') && $obj->id == $id;
  });
  return !empty($search) ? reset($search) : false;
}

function array_search_key_by_id($arr, $id) {
  $arr_normalized = json_decode(json_encode($arr), true);
  return array_search($id, array_column($arr_normalized, 'id'));
}

function array_keys_from_object($obj) {
  return array_keys( get_object_vars($obj) );
}

switch($_SERVER['REQUEST_METHOD']) {
  case 'POST':
    include_once __DIR__ .'/create.php';
    break;
  case 'GET':
    include_once __DIR__ .'/read.php';
    break;
  case 'PUT': case 'PATCH':
    include_once __DIR__ .'/update.php';
    break;
  case 'DELETE':
    include_once __DIR__ .'/delete.php';
    break;
  case 'OPTIONS':
    http_response_code(204);
    echo '<h1>No content</h1>';
    break;
  default:
    http_response_code(400);
    echo '<h1>Bad Request</h1>';
}

die;
