-- Create table if it does not exist
CREATE TABLE IF NOT EXISTS gps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(32)
);

-- Delete all existing content, id will be reset to 1
TRUNCATE TABLE gps;

-- Insert 25 example rows
INSERT INTO gps (name, email, phone)
VALUES
    ('John Doe', 'john.doe@example.com', '+31 6 1000 0001'),
    ('Jane Smith', 'jane.smith@example.com', '+31 6 1000 0002'),
    ('Jim Brown', 'jim.brown@example.com', '+31 6 1000 0003'),
    ('Jill Johnson', 'jill.johnson@example.com', '+31 6 1000 0004'),
    ('Jack Williams', 'jack.williams@example.com', '+31 6 1000 0005'),
    ('Jenny Jones', 'jenny.jones@example.com', '+31 6 1000 0006'),
    ('Jason Miller', 'jason.miller@example.com', '+31 6 1000 0007'),
    ('Julia Davis', 'julia.davis@example.com', '+31 6 1000 0008'),
    ('Jordan Garcia', 'jordan.garcia@example.com', '+31 6 1000 0009'),
    ('Joan Rodriguez', 'joan.rodriguez@example.com', '+31 6 1000 0010'),
    ('Jeremy Martinez', 'jeremy.martinez@example.com', '+31 6 1000 0011'),
    ('Janet Hernandez', 'janet.hernandez@example.com', '+31 6 1000 0012'),
    ('Justin Lopez', 'justin.lopez@example.com', '+31 6 1000 0013'),
    ('Joy Gonzalez', 'joy.gonzalez@example.com', '+31 6 1000 0014'),
    ('Jared Wilson', 'jared.wilson@example.com', '+31 6 1000 0015'),
    ('Jasmine Anderson', 'jasmine.anderson@example.com', '+31 6 1000 0016'),
    ('Jonah Thomas', 'jonah.thomas@example.com', '+31 6 1000 0017'),
    ('Judy Taylor', 'judy.taylor@example.com', '+31 6 1000 0018'),
    ('Joel Moore', 'joel.moore@example.com', '+31 6 1000 0019'),
    ('June Jackson', 'june.jackson@example.com', '+31 6 1000 0020'),
    ('Jeff Martin', 'jeff.martin@example.com', '+31 6 1000 0021'),
    ('Jean Lee', 'jean.lee@example.com', '+31 6 1000 0022'),
    ('Jude Perez', 'jude.perez@example.com', '+31 6 1000 0023'),
    ('Jocelyn Thompson', 'jocelyn.thompson@example.com', '+31 6 1000 0024'),
    ('Jesse White', 'jesse.white@example.com', '+31 6 1000 0025');