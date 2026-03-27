<?php

define('DB_HOST', getenv('DB_HOST') ?: 'organization-reviews-db');
define('DB_PORT', (int) (getenv('DB_PORT') ?: 3306));
define('DB_NAME', getenv('DB_NAME') ?: 'app_db');
define('DB_USER', getenv('DB_USER') ?: 'app_user');
define('DB_PASSWORD', getenv('DB_PASSWORD') ?: 'secret');

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT);

if ($conn->connect_error) {
    exit('Connection failed: '.$conn->connect_error);
}

$conn->set_charset('utf8mb4');
