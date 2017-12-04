USE bamazon;


CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(45) NULL,
	department_name VARCHAR(50) NULL,
	price DECIMAL(10,2),
	stock_quantity INT,
  PRIMARY KEY (item_id)
);

USE bamazon;
SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Carryon Suitcase", "Luggage", 59.99, 5)

