CREATE TABLE customer (
  id INT PRIMARY KEY,
  userId VARCHAR(255),
  name VARCHAR(255),
  phone VARCHAR(20),
  address VARCHAR(255),
  address2 VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zipcode VARCHAR(20)
);
INSERT INTO Customer (id, userId, name, phone, address, address2, city, state, zipcode) 
VALUES (123456, 'starlord2002@gmail.com', 'Star Lord', '+14122144122', '48 Galaxy Rd', 'suite 4', 'Fargo', 'ND', '58102');

-- Inserting a customer with id 789 and missing address2
INSERT INTO Customer (id, userId, name, phone, address, city, state, zipcode) 
VALUES (789, 'groot23@yahoo.com', 'Groot', '+19852534213', '27 Flora Ave', 'San Francisco', 'CA', '94107');

-- Inserting a customer with id 98765 and a different phone number
INSERT INTO Customer (id, userId, name, phone, address, address2, city, state, zipcode) 
VALUES (98765, 'gamoraX@yahoo.com', 'Gamora', '+14129999222', '10 Zenith Dr', '', 'New York', 'NY', '10023');

-- Inserting a customer with id 456 and a different state and zip code
INSERT INTO Customer (id, userId, name, phone, address, address2, city, state, zipcode) 
VALUES (456, 'rocket25@gmail.com', 'Rocket', '+19857774433', '82 Alpha St', '', 'Seattle', 'WA', '98122');

-- Inserting a customer with id 13579 and a missing address2 and phone number
INSERT INTO Customer (id, userId, name, address, city, state, zipcode) 
VALUES (13579, 'nebula4ever@gmail.com', 'Nebula', '51 Delta Ave', 'Los Angeles', 'CA', '90005');
