var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "hichew132",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;

    displayProducts();

});

function displayProducts() {
    connection.query(
        "SELECT item_id, product_name, price FROM products", function (err, res) {
            console.log("\nItems currently on sale on bAmazon!\n")
        
            for (var i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price: " + res[i].price + " |");
            }
            attemptPurchase();
        }
    )
}

function attemptPurchase() {
    inquirer
        .prompt([
            {
                name: "item",
                message: "\nInput the ID of the product you wish to buy",
                type: "input"
            },
            {
                name: "quantity",
                message: "How many of this item would you like to buy",
                type: "input"
            }
        ])
        .then(function (response) {
            connection.query(
                "SELECT * FROM products WHERE item_id = ?", [response.item], function (err, res) {
                    if (err) throw err;
                    
                    if (res[0].stock_quantity < response.quantity) {
                        cantBuy();
                    }
                    else {
                        console.log("this is id_num: " + parseInt(res[0].item_id))
                        successfulBought(res[0], response.quantity);
                    }
                })
        })
}

function successfulBought(row, amount) {
    console.log("You bought " + amount + " " + row.product_name + "(s)\n");
    console.log("Your total will be $"+amount*row.price);

    connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
        [row.stock_quantity-amount,row.item_id],
        function (err, res) {
            if (err) throw err;
            
        }
    )

    displayProducts();
}

function cantBuy() {
    console.log("\nError: Not enough inventory!")
    displayProducts();
}