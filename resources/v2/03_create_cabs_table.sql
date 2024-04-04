CREATE TABLE cabs (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    driver_id  INT NOT NULL,
    car_details_id INT NOT NULL,
    location POINT NOT NULL,
    status ENUM('not-available', 'available') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_driver FOREIGN KEY (driver_id) REFERENCES drivers(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_car_details FOREIGN KEY (car_details_id) REFERENCES car_details(id) ON UPDATE CASCADE on DELETE NO ACTION
);
