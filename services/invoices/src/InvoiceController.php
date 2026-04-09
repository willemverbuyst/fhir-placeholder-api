<?php

class InvoiceController
{
    public function __construct(private InvoiceGateway $gateway)
    {    
    }

    public function processRequest(string $method, ?string $id): void
    {
        if ($id) {
            $this->processResourceRequest($method, $id);
        } else {
            $this->processCollectionRequest($method);
        }
    }

    private function processResourceRequest(string $method, string $id): void
    {
        $invoice = $this->gateway->get($id);
        
        if (!$invoice) {
            http_response_code(404);
            echo json_encode(['message' => 'Invoice not found']);
            return;
        }

        switch ($method) {
            case 'GET':
                echo json_encode($invoice);
                break;
            case 'PATCH':
                $data = (array) json_decode(file_get_contents('php://input'), true);
                $errors = $this->getValidationErrors($data, false);

                if (!empty($errors)) {
                    http_response_code(422);
                    echo json_encode(['errors' => $errors]);
                    return;
                }

                $rows = $this->gateway->update($invoice, $data);

                echo json_encode([
                    'message' => "Invoice $id updated", 
                    'rows' => $rows
                    ]);

                break;
            case 'DELETE':
                $rows = $this->gateway->delete($id);
                echo json_encode(['message' => "Invoice $id deleted", 'rows' => $rows]);
                break;
            default:
                http_response_code(405);
                header('Allow: GET, PATCH, DELETE');
        }
    }

    private function processCollectionRequest(string $method): void
    {
        switch ($method) {
            case 'GET':
                echo json_encode($this->gateway->getAll());
                break;
            case 'POST':
                $data = (array) json_decode(file_get_contents('php://input'), true);
                $errors = $this->getValidationErrors($data);

                if (!empty($errors)) {
                    http_response_code(422);
                    echo json_encode(['errors' => $errors]);
                    return;
                }

                $id = $this->gateway->create($data);

                http_response_code(201);
                echo json_encode([
                    'message' => 'Invoice created', 
                    'id' => $id
                    ]);

                break;
            default:
                http_response_code(405);
                header('Allow: GET, POST');
        }
    }

    private function getValidationErrors(array $data, bool $is_new = true): array
    {
        $errors = [];

        if (!isset($data['status']) || !is_string($data['status'])) {
            $errors[] = "Status is required and must be a string.";
        }

        if ($is_new && (!isset($data['totalGross_value']) || !is_numeric($data['totalGross_value']))) {
            $errors[] = "Total gross value is required and must be a number.";
        }

        if (!$is_new && isset($data['totalGross_value'])) {
            $errors[] = "You cannot update the total gross value.";
        }

        return $errors;
    }
}