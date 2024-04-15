CREATE TABLE IF NOT EXISTS car_details (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    car_name VARCHAR(50) NOT NULL,
    license_plate_number VARCHAR(50) NOT NULL,
    car_brand VARCHAR(50)
);