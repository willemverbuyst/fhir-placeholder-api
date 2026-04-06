<?php include 'config/database.php';
include './lib/organization_options.php';

$organization_options = [];

$api_response = @file_get_contents('http://fhir-server:8080/api/v2/r5/Organization');
// $api_response = @file_get_contents('http://gateway:3000/api/public/organizations');

if ($api_response !== false) {
    $echo = 'API response: ' . $api_response; // Debugging line to check the API response
    $decoded_response = json_decode($api_response, true);
    if (is_array($decoded_response)) {
        $organization_options = extract_organization_options($decoded_response);
    }
} else {
    // Handle API request failure (e.g., log the error, show a message, etc.)
    error_log('Failed to fetch organization data from API.');
}

// if (isset($_POST['submit'])) {
//     if (empty($_POST['author'])) {
//         $author_error = 'Name is required';
//     } else {
//         $author = filter_input(INPUT_POST, 'author', FILTER_SANITIZE_SPECIAL_CHARS);
//     }

//     if (empty($_POST['body'])) {
//         $body_error = 'Review is required';
//     } else {
//         $body = filter_input(INPUT_POST, 'body', FILTER_SANITIZE_SPECIAL_CHARS);
//     }

//     if (empty($_POST['organization'])) {
//         $organization_error = 'Organization is required';
//     } else {
//         $organization = filter_input(INPUT_POST, 'organization', FILTER_SANITIZE_SPECIAL_CHARS);
//     }

//     if (
//         empty($author_error) &&
//         empty($body_error) &&
//         empty($organization_error)
//     ) {
//         $sql = "INSERT INTO reviews (author, organization, body) VALUES ('{$author}', '{$organization}', '{$body}')";
//         if (mysqli_query($conn, $sql)) {
//             header('Location: reviews.php');
//             exit();
//         } else {
//             echo 'Error: '.$sql.'<br>'.mysqli_error($conn);
//         }
//     }
// }
?>

<form class="col-4 mx-auto border p-4 rounded" action="/includes/new-review.inc.php" method="POST">
  <div class="mb-3">
    <label for="organization" class="form-label" >Organization</label>
    <select class="form-select" name="organization" id="organization" <?php echo empty($organization_options) ? 'disabled' : ''; ?>>
      <option value="">
        <?php echo empty($organization_options) ? 'No organizations available' : 'Select organization'; ?>
      </option>
      <?php foreach ($organization_options as $organization_name) { ?>
        <option value="<?php echo htmlspecialchars($organization_name); ?>">
          <?php echo htmlspecialchars($organization_name); ?>
        </option>
      <?php } ?>
    </select>
  </div>
  <div class="mb-3">
    <label for="review" class="form-label" >Review</label>
    <textarea type="text" class="form-control" name="review"></textarea>
  </div>
  <div class="mb-3">
    <button type="submit" name="submit" class="btn btn-primary w-100">SUBMIT REVIEW</button>
  </div>
</form>