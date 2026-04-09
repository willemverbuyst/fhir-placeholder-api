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
        switch ($method) {
            case 'GET':
                $this->getInvoice($id);
                break;
            case 'PUT':
                $this->updateInvoice($id);
                break;
            case 'DELETE':
                $this->deleteInvoice($id);
                break;
            default:
                http_response_code(405);
                header('Allow: GET, PUT, DELETE');
        }
    }

    private function processCollectionRequest(string $method): void
    {
        switch ($method) {
            case 'GET':
                echo json_encode($this->gateway->getAll());
                break;
            // case 'POST':
            //     $this->createInvoice();
            //     break;
            default:
                http_response_code(405);
                header('Allow: GET, POST');
        }
    }
}