<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GP Search</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.js"></script>
</head>
<body>

<h1>GP Search</h1>

<input type="text" id="search" placeholder="Search for a GP">
<div id="results"></div>

<script>
$(document).ready(function() {

  $('#search').on('keyup', function() {
    const query = $(this).val();

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

  });

});
</script>

</body>
</html>