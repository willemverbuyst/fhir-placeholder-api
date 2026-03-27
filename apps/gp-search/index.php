<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GP Search</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.js"></script>
</head>
<body class="container p-4">

<header>
  <h1>GP Search</h1>
</header>

<main class="container d-flex flex-column gap-4 p-4">
  <section class="row">
      <label class="form-label" for="search">Search</label>
      <input class="form-control" type="text" id="search" placeholder="Search for a GP">
  </section>
  <section class="row">
    <label class="form-label" for="results">Results</label>
    <div id="results" class="list-group"></div>
  </section>
</main>

<script>
$(document).ready(function() {
  let searchTimeoutId = null;

  $('#search').on('keyup', function() {
    const query = $(this).val();

    if (searchTimeoutId !== null) {
      clearTimeout(searchTimeoutId);
    }

    searchTimeoutId = setTimeout(function() {
      $.getJSON('search.php', { query: query }, function(data) {

        let html = '';

        if (data.length === 0) {
          html = '<p>No results found</p>';
        } else {
          data.forEach(gp => {
            html += `<p>${gp.name} (${gp.email})</p>`;  
          });
        }

        $('#results').html(html);
      });
    }, 250);
  });

});
</script>

</body>
</html>