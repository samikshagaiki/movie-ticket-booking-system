
CREATE DATABASE IF NOT EXISTS movie_booking;
USE movie_booking;

CREATE TABLE IF NOT EXISTS BOOKING (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    show_id INT,
    customer_name VARCHAR(100),
    seats_booked INT,
    total_amount DECIMAL(10,2),
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS PAYMENT (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10,2),
    payment_method VARCHAR(50),
    status VARCHAR(20) CHECK (status IN ('SUCCESS', 'FAILED', 'PENDING')),
    FOREIGN KEY (booking_id) REFERENCES BOOKING(booking_id)
);


INSERT INTO BOOKING (show_id, customer_name, seats_booked, total_amount)
VALUES
(101, 'Alice', 2, 250.00),
(102, 'Bob', 1, 180.00),
(103, 'Charlie', 2, 250.00),
(104, 'Diana', 3, 300.00);

INSERT INTO PAYMENT (booking_id, amount, payment_method, status)
VALUES
(1, 250.00, 'Credit Card', 'SUCCESS'),
(2, 180.00, 'UPI', 'SUCCESS'),
(3, 250.00, 'Credit Card', 'FAILED');



