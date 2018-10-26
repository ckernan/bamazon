DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price DECIMAL (10,2) NOT NULL,
	stock_quantity INT NOT NULL,
    product_sales DECIMAL(10,2) DEFAULT 0
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Shining", "DVDs", 13.59, 30), 
("Seinfeld Box Set", "DVDs", 99.99, 50), 
("Avengers Infinity War", "DVDs", 22.99, 50),
("Nintendo 64 System", "Video Games", 79.99, 25),
("Nintendo NES System", "Video Games", 59.99, 25),
("Super Mario Bros 3", "Video Games", 9.99, 50),
("Donkey Kong Country", "Video Games", 14.99, 60),
("Tamagotchi", "Toys", 20.99, 100),
("Polly Pocket House", "Toys", 14.59, 50),
("Inflatable Chihuahua", "Toys", 25.99, 60);

CREATE TABLE departments(
	department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL
);

INSERT INTO departments(department_name, over_head_costs)
VALUES("DVDs", 1500),
("Video Games", 2000),
("Toys", 1000);