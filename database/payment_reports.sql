
USE movie_booking;

-- Stored Procedure: Daily Revenue Calculation
DELIMITER $$

CREATE PROCEDURE CalculateDailyRevenue(IN target_date DATE)
BEGIN
    SELECT 
        DATE(payment_date) AS payment_day,
        SUM(amount) AS total_revenue,
        COUNT(payment_id) AS total_payments
    FROM PAYMENT
    WHERE DATE(payment_date) = target_date AND status = 'SUCCESS'
    GROUP BY DATE(payment_date);
END $$

DELIMITER ;


CREATE OR REPLACE VIEW Daily_Report AS
SELECT 
    DATE(p.payment_date) AS report_date,
    COUNT(p.payment_id) AS total_transactions,
    SUM(p.amount) AS total_revenue,
    COUNT(DISTINCT b.show_id) AS total_shows
FROM PAYMENT p
JOIN BOOKING b ON p.booking_id = b.booking_id
WHERE p.status = 'SUCCESS'
GROUP BY DATE(p.payment_date)
HAVING SUM(p.amount) > 0;


SELECT DATE(payment_date) AS payment_day, SUM(amount) AS revenue
FROM PAYMENT
WHERE status = 'SUCCESS'
GROUP BY DATE(payment_date)
HAVING revenue > 0;

SELECT payment_method, SUM(amount) AS total_amount
FROM PAYMENT
WHERE status = 'SUCCESS'
GROUP BY payment_method;
