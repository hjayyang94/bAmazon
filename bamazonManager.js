var mysql = require("mysql");
var inquirer = require('inquirer');

var manager_choices = ["View Products for Sale","View Low Inventory", "Add to Inventory", "Add New Product","End"]

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
    start();
});

function start(){
    inquirer
    .prompt([
        {
            name: "menu",
            message: "\nWhat would you like to do:",
            type: "list",
            choices: manager_choices
        }
    ])
    .then(function(res){
        switch(res.menu){
            case manager_choices[0]:
            viewProducts();
            break;

            case manager_choices[1]:
            viewLow();
            break;

            case manager_choices[2]:
            addInventory();
            break;

            case manager_choices[3]:
            addNew();
            break;

            case manager_choices[4]:
            connection.end();
            break;
        }
    })
}

function viewProducts(){
    connection.query(
        "SELECT * FROM products", function (err, res) {
            if (err) throw err;
            console.log("\nItems currently in the Inventory\n")

            for (var i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price: " + res[i].price + " | Quantity: "+res[i].stock_quantity);
            }
            start();
        }
    )
    
}

function viewLow(){
    connection.query(
        "SELECT * FROM products", function (err, res) {
            if (err) throw err;
            console.log("\nItems low in Inventory\n")

            for (var i = 0; i < res.length; i++) {
                if (res[i].stock_quantity<5){
                    console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price: " + res[i].price + " | Quantity: "+res[i].stock_quantity);
                }
            }
            start();
        }
    )
}

function addInventory(){
    inquirer
    .prompt([
        {
            name: "id",
            message: "Which item do you wish to restock? (ID number)",
            type: "input"
        },
        {
            name: "amount",
            message: "How much/many would you like to add to the inventory?",
            type: "input"
        }
    ])
    .then(function(choice){
        if (choice.input<1){
            console.log("Error: You cannot add "+choice.input+" amounts into the inventory")
            start();
        }
        connection.query(
            "SELECT * FROM products WHERE item_id = ?", [choice.id], function(err,res){
                if (err) throw err;
                successUpdate(res[0].item_id,res[0].stock_quantity,choice.amount);
            }
            
        )
    })
}

function successUpdate(id,stock,amount){
    console.log(id+","+stock+","+amount)
    connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
        [stock+amount,id],
        function(err,res){
            if (err) throw err;
            console.log("Inventory was restocked!");
            start();
        }
        
    )
}

function addNew(){
    inquirer
    .prompt([
        {
            name: "name",
            message: "Name of product:",
            type: "input"
        },
        {
            name: "department",
            message: "Name of department it is from:",
            type: "input"
        },
        {
            name: "price",
            message: "How much is each unit:",
            type: "input"
        },
        {
            name: "stock",
            message: "How many of the items are put into the inventory:",
            type: "input"
        }
    ])
    .then(function(res){
        connection.query(
            "INSERT INTO products (product_name,department_name,price,stock_quantity)" 
            +" VALUES (?,?,?,?)",
            [res.name,res.department,parseFloat(res.price),parseInt(res.stock)],
            function(err,response){
                if (err) throw err;
                console.log("Added new product into inventory!");
                start();
            }
        )
    })
}