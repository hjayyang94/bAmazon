var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');

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
            message: "\nWhat would you like to do: ",
            type: "list",
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
    sql = "SELECT d.department_id AS d_id, d.department_name AS d_name, d.over_head_costs AS d_costs, products.product_sales AS p_sales" 
    sql+= " FROM departments AS d INNER JOIN products ON d.department_name = products.department_name GROUP by products.department_name ORDER by d.department_id"
    connection.query(
        sql,
        function(err,res){
            if (err) throw err;
            var results = [];

            for (var i = 0; i < res.length; i++){
                var deps = {
                    department_id: res[i].d_id,
                    department_name: res[i].d_name,
                    over_head_costs: res[i].d_costs,
                    product_sales: res[i].p_sales,
                    total_profits: (res[i].p_sales-res[i].d_costs)
                }
                results.push(deps);
            }
            console.table(results);
            start();
        }
    )
}

function createDepartment(){
    inquirer
    .prompt([
        {
            name: "name",
            message: "Name of Department:",
            type: "input"
        },
        {
            name: "cost",
            message: "Over head costs:",
            type: "input"
        }
    ])
    .then(function(res){
        connection.query(
            "INSERT INTO departments (department_name,over_head_costs)" 
            +" VALUES (?,?)",
            [res.name,parseFloat(res.cost)],
            function(err,response){
                if (err) throw err;
                console.log("Added new product into inventory!");
                start();
            }
        )
    })
}