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

    public function get(string $id): array | false
    {
        $sql = "SELECT * FROM invoice WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($data) {
            $data["totalGross_value"] = (float) $data["totalGross_value"];
        }

        return $data;
    }

    public function update(array $current, array $new): int
    {
        $sql = "UPDATE invoice SET status = :status, totalGross_value = :totalGross_value WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id', $current['id'], PDO::PARAM_INT);
        $stmt->bindValue(':status', $new['status'] ?? $current['status'], PDO::PARAM_STR);
        $stmt->bindValue(':totalGross_value', $new['totalGross_value'] ?? $current['totalGross_value'], PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->rowCount();
    }

    public function delete(string $id): int
    {
        $sql = "DELETE FROM invoice WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

     
        return $stmt->rowCount();
    }
}