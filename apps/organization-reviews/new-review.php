<?php include 'config/database.php';
include 'lib/organization_options.php';
$author = $organization = $body = '';
$author_error = $organization_error = $body_error = '';

$organization_options = [];

$api_response = @file_get_contents('http://gateway:3000/api/public/organizations');

if ($api_response !== false) {
    $decoded_response = json_decode($api_response, true);
    if (is_array($decoded_response)) {
        $organization_options = extract_organization_options($decoded_response);
    }
}

if (isset($_POST['submit'])) {
    if (empty($_POST['author'])) {
        $author_error = 'Name is required';
    } else {
        $author = filter_input(INPUT_POST, 'author', FILTER_SANITIZE_SPECIAL_CHARS);
    }

    if (empty($_POST['body'])) {
        $body_error = 'Review is required';
    } else {
        $body = filter_input(INPUT_POST, 'body', FILTER_SANITIZE_SPECIAL_CHARS);
    }

    if (empty($_POST['organization'])) {
        $organization_error = 'Organization is required';
    } else {
        $organization = filter_input(INPUT_POST, 'organization', FILTER_SANITIZE_SPECIAL_CHARS);
    }

    if (
        empty($author_error) &&
        empty($body_error) &&
        empty($organization_error)
    ) {
        $sql = "INSERT INTO reviews (author, organization, body) VALUES ('{$author}', '{$organization}', '{$body}')";
        if (mysqli_query($conn, $sql)) {
            header('Location: reviews.php');
            exit();
        } else {
            echo 'Error: '.$sql.'<br>'.mysqli_error($conn);
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Organization Reviews</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss-browser/4.1.13/index.global.js" integrity="sha512-RAOoTi4JqATUmfyj+oyxwAo3JtUeZwLsBpNisDcY5VzvXZARuuaE5zfwUCDVa2LBBUax70uBlO4+eZA1Y/tk0A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>
<body class="w-screen flex flex-col items-center justify-center bg-gray-100 p-10 ">
  <?php include 'inc/header.php'; ?>
  <main class="flex flex-col items-center justify-center gap-4">
    <h2 class="text-xl text-center">new review</h2>
    <?php if (! empty($selected_organization_message)) { ?>
      <p class="bg-green-100 text-green-900 px-4 py-2 rounded-md w-[400px]">
        <?php echo $selected_organization_message; ?>
      </p>
    <?php } ?>
    <form class="flex flex-col gap-6 w-[400px]" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
      <div class="flex flex-col gap-2">
        <label class="text-gray-500 font-bold" for="organization">Organization</label>
        <select class="border border-gray-300 rounded-md p-2 bg-white" name="organization" id="organization" <?php echo empty($organization_options) ? 'disabled' : ''; ?>>
          <option value="">
            <?php echo empty($organization_options) ? 'No organizations available' : 'Select organization'; ?>
          </option>
          <?php foreach ($organization_options as $organization_name) { ?>
            <option value="<?php echo htmlspecialchars($organization_name); ?>" <?php echo $organization === $organization_name ? 'selected' : ''; ?>>
              <?php echo htmlspecialchars($organization_name); ?>
            </option>
          <?php } ?>
        </select>
        <p class="text-red-500"><?php echo $organization_error; ?></p>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-gray-500 font-bold" for="body">Review</label>
        <textarea class="border border-gray-300 rounded-md p-2 bg-white" name="body" id="body"><?php echo $body; ?></textarea>
        <p class="text-red-500"><?php echo $body_error; ?></p>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-gray-500 font-bold" for="author">Name</label>
        <input class="border border-gray-300 rounded-md p-2 bg-white" type="text" name="author" id="author" value="<?php echo $author; ?>">
        <p class="text-red-500"><?php echo $author_error; ?></p>
      </div>
      <div class="flex flex-col gap-2">
        <input class="bg-black text-white rounded-md p-2" type="submit" name="submit" value="Submit">
      </div>
    </form>
  </main>
</body>
</html>