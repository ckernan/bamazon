require("dotenv").config();

const mysql = require ("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");
const cTable = require("console.table");


let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.mysqlPassword,
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("\n-----WELCOME, SUPERVISOR!-----\n");
    supervisorPrompt();
});

function supervisorPrompt() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View product sales by department", "Create new department"]
    }).then(function(answer){
        switch(answer.action){
            case "View product sales by department":
            console.log("working")
            viewSales();
            break;

            case "Create new department":
            newDept();
            break;
        }
    });
};

function viewSales(){
     var query = `SELECT departments.department_id AS "Department ID", departments.department_name AS "Department Name",
    departments.over_head_costs AS "Overhead Costs", SUM(products.product_sales) AS "Product Sales", SUM(products.product_sales) - departments.over_head_costs AS "Total Profit"
    FROM departments 
    LEFT JOIN products ON products.department_name = departments.department_name
    GROUP BY departments.department_id, departments.department_name, departments.over_head_costs;`;
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        nextAction();
    });
};

function newDept(){
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "What is the name of the new department you'd like to create?"
    },
    {
        name: "cost",
        type: "input",
        message: "What is the overhead cost for this department?",
        validate: function(value){
            if(isNaN(value) === false){
                return true;
            } else {
                console.log(" Please enter a number!");
                return false;
            }
        }
    }]).then(function(answer){
        connection.query("INSERT INTO departments SET ?", 
        {
            department_name: answer.name,
            over_head_costs: answer.over_head_costs
        },
        function(err){
            console.log(`\nYou have successfully added ${answer.name} with an overhead cost of $${answer.cost} to your departments!\n`);
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
            supervisorPrompt();
        }
        else {
            console.log("\nThanks for all your hard work!  See you next time!\n");
            connection.end();
        }
    });
};