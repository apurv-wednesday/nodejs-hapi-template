CREATE TABLE IF NOT EXISTS drivers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    license_number VARCHAR(50) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    ratings DECIMAL(3, 2),
    status ENUM ('active', 'inactive') NOT NULL
);
