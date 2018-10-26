require("dotenv").config();

const mysql = require ("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.mysqlPassword,
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    showProducts();
});

function showProducts(){
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
        console.log("\n-----WELCOME TO CRISTINA'S BAMAZON STORE!-----\n");
        console.log(table.toString() + "\n");
        orderPrompt();
    });
    
};


function orderPrompt(){
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "What is the ID number of the item you would like to purchase?",
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
        message: "How many units of this item would you like to purchase?",
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
        var orderQuantity = answer.quantity;
        connection.query("SELECT * FROM products WHERE ?", {item_id: id}, function(err, results){
            var stockQuantity = results[0].stock_quantity;
            var price = results[0].price;
            var total = orderQuantity * price;
            var productSales = results[0].product_sales
            if (err) throw err;
            if(stockQuantity < orderQuantity){
                console.log(`\nSorry!  We only have ${stockQuantity} of that item in stock.  Please enter a lower quantity.\n`);
                orderPrompt();
            }
            else {
                connection.query(
                    "UPDATE products SET ? WHERE ?", 
                    [
                        {
                            stock_quantity: stockQuantity - orderQuantity,
                            product_sales: productSales + total

                        }, 
                        {
                            item_id: id
                        }
                    ],
                    function(err){
                        if(err) throw err;
                        if(orderQuantity == 1){
                            console.log(`\nYou purchased ${orderQuantity} ${results[0].product_name} for a total of $${total}.  Thank you for your order!\n`);
                        }
                        else {
                            console.log(`\nYou purchased ${orderQuantity} ${results[0].product_name}s for a total of $${total}.  Thank you for your order!\n`)

                        }

                        nextAction();
                      }

                )};
        })
    })
};

function nextAction(){
    inquirer.prompt({
        name: "nextAction",
        type: "list",
        message: "What would you like to do next?",
        choices: ["Order more items", "Exit"]
    }).then(function(answer){
        switch(answer.nextAction) {
            case "Order more items":
                showProducts();
                break;
            
            case "Exit":
                console.log("\nThank you for shopping with us!!\n");
                connection.end();
        }

    })
    
};

