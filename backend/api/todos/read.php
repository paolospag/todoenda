<?php
if ( realpath($_SERVER['SCRIPT_FILENAME']) == __FILE__ ) {
  http_response_code(403);
  die("<h1>Forbidden</h1>\n<p>You don't have permission to access this resource.</p>");
}
// get todos data.
$todos = $db->todos ?: [];

// if set, get & return a single todo item by its id.
if ( isset($_GET['id']) && ($id = $_GET['id']) ) {
  $todo = array_search_by_id($todos, $id);
  if (!$todo) {
    echo '{}';
    return false;
  }
  echo json_encode($todo, JSON_PRETTY_PRINT);
  return true;
}

// otherwise, return all the todo items.
echo json_encode($todos, JSON_PRETTY_PRINT);
