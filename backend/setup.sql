CREATE DATABASE IF NOT EXISTS commuter_demand_db;
USE commuter_demand_db;

CREATE TABLE IF NOT EXISTS waitlist_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    job_city VARCHAR(100) NOT NULL,
    hometown VARCHAR(100) NOT NULL,
    travel_frequency ENUM('Every Weekend', 'Alternate Weekends', 'Once a Month', 'Rarely') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
