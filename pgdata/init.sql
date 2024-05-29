-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  pin VARCHAR(10),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone_number VARCHAR(20),
  is_admin BOOLEAN DEFAULT FALSE
);

-- Create daily_cash_flows table
CREATE TABLE daily_cash_flows (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  coins_count INT NOT NULL,
  bills_count INT NOT NULL,
  date TIMESTAMP NOT NULL,
  disbursements JSONB NOT NULL,
  reimbursements JSONB NOT NULL
);

-- Create time_cards table
CREATE TABLE time_cards (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  clock_in TIMESTAMP NOT NULL,
  clock_out TIMESTAMP
);

-- Create product_warranty table
CREATE TABLE product_warranty (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  date DATE NOT NULL
);

-- Create damaged_goods table
CREATE TABLE damaged_goods (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  date DATE NOT NULL
);

-- Create returns table
CREATE TABLE returns (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  battery_details TEXT NOT NULL,
  current_voltage DECIMAL(5, 2),
  cca INT,
  customer_type VARCHAR(20) NOT NULL,
  battery_date DATE,
  status VARCHAR(50) NOT NULL,
  return_date DATE NOT NULL
);

-- Create vacation_requests table
CREATE TABLE vacation_requests (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending'
);

-- Create notifications table
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  admin_id INT REFERENCES users(id),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read BOOLEAN DEFAULT FALSE
);

-- Example Insertions
INSERT INTO users (username, password, pin, first_name, last_name, phone_number, is_admin) VALUES ('admin', 'admin123', '1234', 'Admin', 'User', '555-0000', TRUE);
INSERT INTO daily_cash_flows (user_id, coins_count, bills_count, date, disbursements, reimbursements) VALUES (1, 200, 500, '2024-05-26 08:00:00', '[{"id": 1, "description": "Refund", "amount": 100}]', '[{"id": 1, "description": "Reimbursement", "amount": 50}]');
INSERT INTO time_cards (user_id, clock_in) VALUES (1, '2024-05-26 08:00:00');
INSERT INTO product_warranty (product_id, date) VALUES (1, '2024-05-26');
INSERT INTO damaged_goods (product_id, date) VALUES (1, '2024-05-26');
INSERT INTO returns (customer_name, customer_phone, battery_details, current_voltage, cca, customer_type, battery_date, status, return_date) 
VALUES ('John Doe', '555-1234', 'Car Battery, Model XYZ', 12.5, 750, 'Walk-in', '2024-01-15', 'Pending', '2024-05-26');
INSERT INTO vacation_requests (user_id, start_date, end_date) VALUES (1, '2024-06-01', '2024-06-10');
INSERT INTO notifications (admin_id, message) VALUES (1, 'New return request from John Doe.');
