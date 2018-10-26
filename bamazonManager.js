require("dotenv").config();

const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");
const chalk = require('chalk');


let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.mysqlPassword,
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log(chalk.hex("#a5038d")("\n-----WELCOME, MANAGER!-----\n"));
    managerPrompt();
});

function managerPrompt(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]

    }).then(function(answer){
        switch(answer.action){
            case "View products for sale":
            viewAll();
            break;

            case "View low inventory":
            lowInventory();
            break;

            case "Add to inventory":
            addInventory();
            break;

            case "Add new product":
            newProduct();
            break;
        }
    });
};


function viewAll(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        var table = new Table({
            head: ["ID#", "Product", "Price", 'Quantity']
        });
        for (let i = 0; i < res.length; i++){
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
            )
            
        }
        console.log(table.toString() + "\n");
        nextAction();
    });
};



function lowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res){
        if (err) throw err;
        var table = new Table({
            head: ["ID#", "Product", "Price", 'Quantity']
        });
        for (let i = 0; i < res.length; i++){
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
            )
            
        }
        console.log(table.toString() + "\n");
        nextAction();
    });
};

function addInventory(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        var table = new Table({
            head: ["ID#", "Product", "Price", 'Quantity']
        });
        for (let i = 0; i < res.length; i++){
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
            )
            
        }
        console.log(table.toString() + "\n");
        
        inquirer.prompt([{
            name: "item",
            type: "input",
            message: "What is the ID number of the item you would like to add inventory to?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log(" Please enter a number!");
                    return false;
                }
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units of this item would you like to add?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log(" Please enter a number!");
                    return false;
                }
            }
        }]).then(function(answer){
            var id = answer.item;
            var addQuantity = answer.quantity;
            connection.query("SELECT * FROM products WHERE ?", {item_id: id}, function(err, res){
                var newQuantity = parseInt(addQuantity) + parseInt(res[0].stock_quantity);
                var product = res[0].product_name;
            connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: newQuantity
                }, 
                {
                    item_id: id
                }
            ],function(error){
                if (error) throw error;
                console.log(chalk.hex("#a5038d")(`\nThe quantity for ${product} has been increased to ${newQuantity}\n`));
                nextAction();
            })
          })
        })
    });
};

function newProduct(){
    inquirer.prompt([{
        name: "product",
        type: "input",
        message: "What is the name of the new product you would like to add?"
    },
    {
        name: "department",
        type: "input",
        message: "What is the name of the department you would like to add it to?"
    },
    {
        name: "price",
        type: "input",
        message: "What price would you like to sell it for?",
        validate: function(value) {
            if (isNaN(value) === false){
                return true;
            } else {
                console.log(chalk.hex("#a5038d")(" Please enter a number!"));
                return false;
            }
        }
    },
    {
        name: "quantity",
        type: "input",
        message: "How many units would you like to add to inventory?",
        validate: function(value){
            if(isNaN(value) === false){
                return true;
            } else {
                console.log(chalk.hex("#a5038d")(" Please enter a number!"));
                return false;
            }
        }
    }]).then(function(answer){
        connection.query("INSERT INTO products SET ?",
        {
            product_name: answer.product,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
        },
        function(err){
            if(err) throw err;
            console.log(chalk.hex("#a5038d")(`\nYou have successfully added ${answer.product} to your inventory!\n`));
            nextAction();
        })
    })
}

function nextAction(){
    inquirer.prompt({
        name: "nextAction",
        type: "list",
        message: "What would you like to do next?",
        choices: ["Keep Working", "Exit"]

    }).then(function(answer){
        if(answer.nextAction === "Keep Working"){
            managerPrompt();
        }
        else {
            console.log(chalk.hex("#a5038d")("\nThanks for all your hard work!  See you next time!\n"));
            connection.end();
        }
    })
}