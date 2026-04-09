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

    public function create(array $data): string
    {
        $sql = "INSERT INTO invoice (status, totalGross_value) VALUES (:status, :totalGross_value)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':status', $data['status'], PDO::PARAM_STR);
        $stmt->bindValue(':totalGross_value', $data['totalGross_value'], PDO::PARAM_STR);
        $stmt->execute();

        return $this->conn->lastInsertId();
    }
}