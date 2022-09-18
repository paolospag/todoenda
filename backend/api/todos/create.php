<?php
if ( realpath($_SERVER['SCRIPT_FILENAME']) == __FILE__ ) {
  http_response_code(403);
  die("<h1>Forbidden</h1>\n<p>You don't have permission to access this resource.</p>");
}

// get raw posted data.
$data = json_decode( file_get_contents('php://input'), true );

// prepare data to insert in the db.
if ( !isset($data['id']) ) {
  $data['id'] = uniqid('task_');
}
$todos = $db->todos ?: [];
array_push($todos, $data);

// update & write the db.
$db->todos = $todos;
try {
  $fp = fopen(DB_FILE_PATH, 'w');
  fwrite($fp, json_pretty_encode($db));
  fclose($fp);
  http_response_code(200);
  echo json_encode([
    'id'      => $data['id'],
    'message' => 'Todo task created successfully'
  ]);
} catch(Exception $e) {
  http_response_code(400);
  echo json_encode([
    'message' => 'Caught exception: '. $e->getMessage()
  ]);
}
