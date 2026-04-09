<?php

declare(strict_types=1);

spl_autoload_register(function ($class) {
    include __DIR__ . '/src/' . $class . '.php';
});

set_exception_handler("ErrorHandler::handleException");

header("Content-Type: application/json; charset=UTF-8");

$parts = explode('/', $_SERVER['REQUEST_URI']);

if ($parts[1] != 'invoices') {
    http_response_code(404);
    exit;
}

$id = $parts[2] ?? null;

$database = new Database("invoices-db", "app_db", "app_user", "secret");

$gateway = new InvoiceGateway($database);

$controller = new InvoiceController($gateway);

$controller->processRequest($_SERVER['REQUEST_METHOD'], $id);