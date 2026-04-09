<?php

class InvoiceGateway
{
    private PDO $conn;

    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getAll(): array
    {
        $sql = "SELECT * FROM invoice";
        $stmt = $this->conn->query($sql);
        
        $data = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $row["totalGross_value"] = (float) $row["totalGross_value"];
            $data[] = $row;
        }

        return $data;
    }
}