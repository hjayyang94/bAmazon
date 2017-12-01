/* Schema for SQL database/table. We haven't discussed this type of file yet */
DROP DATABASE IF EXISTS bamazonDB;

/* Create database */
CREATE DATABASE bamazonDB;
USE bamazonDB;

/* Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2),
  stock_quantity INT(5),
  PRIMARY KEY (id)
);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(10,2),
  PRIMARY KEY (id)
)

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Fan", "Samsung",25.00,100), ("Book","Scholastic",5.00,30),("Laptop","HP",500.00,5),
("Scarf","ScarfPlace",6.00,1000),("Mittens","ScarfPlace",3.00,1000),("Boots","Macy",625.00,10),
("Wallet","Quicksilver",20.00,450),("Skateboard","Quicksilver",70.00,30),("Shoes","Quicksilver",80.00,34),
("iPhone","Apple",675.30,27)

