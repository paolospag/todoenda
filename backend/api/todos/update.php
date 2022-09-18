<?php
if ( realpath($_SERVER['SCRIPT_FILENAME']) == __FILE__ ) {
  http_response_code(403);
  die("<h1>Forbidden</h1>\n<p>You don't have permission to access this resource.</p>");
}

// get raw posted data.
$data = json_decode( file_get_contents('php://input'), true );
if ( !isset($data['id']) ) {
  http_response_code(400);
  echo json_encode([
    'message' => 'Missing task ID'
  ]);
  return false;
}

// try to find task by provided ID in the db.
$todos = $db->todos ?: [];
if ( !array_search_by_id($todos, $data['id']) ) {
  http_response_code(404);
  echo json_encode([
    'message' => 'Task with provided ID not found.'
  ]);
  return false;
}

// prepare data to update in the db.
$task_key = array_search_key_by_id($todos, $data['id']);
foreach(array_keys_from_object($todos[$task_key]) as $prop_key) {
  if ($prop_key === 'id') {
    continue;
  }
  if ( isset($data[$prop_key]) && property_exists( $todos[$task_key], $prop_key) ) {
    $todos[$task_key]->$prop_key = $data[$prop_key];
  }
}

// update & write the db.
$db->todos = $todos;
try {
  $fp = fopen(DB_FILE_PATH, 'w');
  fwrite($fp, json_pretty_encode($db));
  fclose($fp);
  http_response_code(200);
  echo json_encode([
    'id'      => $data['id'],
    'message' => 'Todo task updated successfully'
  ]);
} catch(Exception $e) {
  http_response_code(400);
  echo json_encode([
    'message' => 'Caught exception: '. $e->getMessage()
  ]);
}
