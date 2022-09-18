<?php
if ( realpath($_SERVER['SCRIPT_FILENAME']) == __FILE__ ) {
  http_response_code(403);
  die("<h1>Forbidden</h1>\n<p>You don't have permission to access this resource.</p>");
}

// get raw posted data.
$data = json_decode( file_get_contents('php://input'), true );

// delete all tasks & write the db.
if ( empty($data) ) {
  $db->todos = [];
  try {
    $fp = fopen(DB_FILE_PATH, 'w');
    fwrite($fp, json_pretty_encode($db));
    fclose($fp);
    http_response_code(200);
    echo json_encode([
      'message' => 'All tasks deleted successfully'
    ]);
  } catch(Exception $e) {
    http_response_code(400);
    echo json_encode([
      'message' => 'Caught exception: '. $e->getMessage()
    ]);
  }
  return true;
}

// try to find task by provided ID in the db.
$todos = $db->todos ?: [];
if ( isset($data['id']) && !array_search_by_id($todos, $data['id']) ) {
  http_response_code(404);
  echo json_encode([
    'message' => 'Task with provided ID not found.'
  ]);
  return false;
}

// prepare data to delete in the db.
$todos = array_filter($todos, function($t) use ($data) {
  return $t->id != $data['id'];
});

// update & write the db.
$db->todos = $todos;
try {
  $fp = fopen(DB_FILE_PATH, 'w');
  fwrite($fp, json_pretty_encode($db));
  fclose($fp);
  http_response_code(200);
  echo json_encode([
    'id'      => $data['id'],
    'message' => 'Todo task deleted successfully'
  ]);
} catch(Exception $e) {
  http_response_code(400);
  echo json_encode([
    'message' => 'Caught exception: '. $e->getMessage()
  ]);
}
