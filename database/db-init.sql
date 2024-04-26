# Create Database
CREATE DATABASE Restaurant;

# Use Databse
USE Restaurant;

# Create Reservations Table
CREATE TABLE reservations (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(250),
    last_name VARCHAR(250),
    party_size INT,
    date DATE,
    time VARCHAR(250),
    PRIMARY KEY(id)
);

