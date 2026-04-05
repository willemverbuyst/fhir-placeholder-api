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
<section>
  <fieldset>
    <legend>Search by</legend>
      <div class="form-check form-check-inline">
        <input type="radio" id="name" name="searchBy" value="name" checked />
        <label for="name">Name</label>
      </div>
      <div class="form-check form-check-inline">
        <input type="radio" id="email" name="searchBy" value="email" />
        <label for="email">Email</label>
      </div>
      <div class="form-check form-check-inline">
        <input type="radio" id="phone" name="searchBy" value="phone" />
        <label for="phone">Phone</label>
      </div>
      <div class="form-check form-check-inline">
        <input type="radio" id="organization" name="searchBy" value="organization" />
        <label for="organization">Organization</label>
      </div>
  </fieldset>
</section>

</section>
  <section class="row">
      <div class="input-group">
          <input class="form-control" type="text" id="search" placeholder="Search for a GP">
          <div class="input-group-append">
              <span class="input-group-text" id="clear">Clear</span>
          </div>
      </div>
  </section>
  <section class="row">
    <div id="results">
      <table class="table table-striped table-hover table-bordered align-middle">
        <thead class="table-light">
          <tr>
            <th scope="col" class="text-uppercase small">Name</th>
            <th scope="col" class="text-uppercase small">Email</th>
            <th scope="col" class="text-uppercase small">Phone</th>
            <th scope="col" class="text-uppercase small">Organization</th>
          </tr>
        </thead>
        <tbody id="results-body" class="table-group-divider">
          <tr class="table-info">
            <td colspan="4" class="text-muted fw-semibold">No results yet.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</main>

<script>
$(document).ready(function() {
  let searchTimeoutId = null;
  const $resultsBody = $('#results-body');

  function renderRows(data) {
    console.log('Search results:', data);
    if (!Array.isArray(data) || data.length === 0) {
      $resultsBody.html(`
        <tr class="table-warning">
          <td colspan="4" class="text-muted fw-semibold">No results found.</td>
        </tr>
      `);
      return;
    }

    const html = data
      .map(gp => `
        <tr>
          <td class="fw-medium">${gp?.name}</td>
          <td>${gp?.email}</td>
          <td>${gp?.phone}</td>
          <td>${gp?.organization}</td>
        </tr>
      `)
      .join('');

    $resultsBody.html(html);
  }

  $('#search').on('keyup', function() {
    const query = String($(this).val() ?? '').trim();

    if (searchTimeoutId !== null) {
      clearTimeout(searchTimeoutId);
    }

    searchTimeoutId = setTimeout(function() {
      if (query === '') {
        $resultsBody.empty();
        return;
      }

      const criterion = $('input[name="searchBy"]:checked').val() || 'name';

      $.getJSON('search.php', { query: query, criterion: criterion })
        .done(function(data) {
          renderRows(data);
        })
        .fail(function() {
          $resultsBody.html(`
            <tr class="table-danger">
              <td colspan="4" class="text-danger fw-semibold">Search failed. Please try again.</td>
            </tr>
          `);
        });
    }, 250);
  });

  $('input[name="searchBy"]').on('change', function() {
    $('#search').trigger('keyup');
  });

  $('#clear').on('click', function() {
    $('#search').val('');
    $resultsBody.empty();
  });
});
</script>

</body>
</html>