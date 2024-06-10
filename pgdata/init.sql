
-- returns table
CREATE TABLE product_support (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  product VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,         -- Type of return (New for credit, warranty check, recharge check)
  status VARCHAR(255) NOT NULL,       -- Status of the return (Picked-up, charging, holding, returned, scrapped, credited)
  outcome VARCHAR(255) NOT NULL,      -- Outcome of the return (Battery is good, battery is bad, battery is good but customer is bad)
  dropoff_date DATE NOT NULL,       -- Date which the product was returned
  isWholesale BOOLEAN NOT NULL,     -- True if the customer is a wholesaler, false if walkin
  phone_number VARCHAR(255) NULL,
  age VARCHAR(4) NULL, 
  cca int NULL,
  voltage float NULL,
  hasLoaner BOOLEAN NOT NULL,       -- True if the customer has a loaner battery 
  isResolved BOOLEAN NOT NULL,       -- True if the issue has been resolved
  resolveDate DATE NULL,            -- Date the issue was resolved
  FOREIGN KEY (support_comments_id) REFERENCES support_comments(id) NULL
);

CREATE TABLE support_comments (
  id SERIAL PRIMARY KEY,
  comment TEXT NOT NULL,
  comment_date DATE NOT NULL,
);
