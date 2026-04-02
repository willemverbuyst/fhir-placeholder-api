<?php

define('DB_HOST', getenv('DB_HOST') ?: 'fhir-data-db');
define('DB_PORT', (int) (getenv('DB_PORT') ?: 5432));
define('DB_NAME', getenv('DB_NAME') ?: 'fhir_db');
define('DB_USER', getenv('DB_USER') ?: 'postgres');
define('DB_PASSWORD', getenv('DB_PASSWORD') ?: 'password');

$dsn = sprintf(
    'pgsql:host=%s;port=%d;dbname=%s',
    DB_HOST,
    DB_PORT,
    DB_NAME
);

$pdo = new PDO($dsn, DB_USER, DB_PASSWORD, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);
