var mysql = require("mysql");
var inquirer = require("inquirer");

var supervisor_choices = ["View Product Sales by Department", "Create New Department", "End"]

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
            name: "choice",
            message: "What would you like to do: ",
            type: "input",
            choices: supervisor_choices
        }
    ])
    .then(function(res){
        switch(res.choice){
            case supervisor_choices[0]:
            viewSales();
            break;

            case supervisor_choices[1]:
            createDepartment();
            break;

            case supervisor_choices[2]:
            connection.end();
            break;
        }
    })
}

function viewSales(){
    
}

function createDepartment(){

}