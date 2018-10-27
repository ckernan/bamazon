# Bamazon

Bamazon is an Amazon-like storefront CLI app using MySQL and Node.js. It provides three different user options:
<ul>
    <li>Customer View</li>
    <li>Manager View</li>
    <li>Supervisor View</li>
</ul>

## Customer View

This option displays all of the items available for sale.
It then prompts the user to enter the ID and number of units of the product they would like to buy.

![Bamazon Customer View 1](https://github.com/ckernan/bamazon/blob/master/images/CustomerView1.png?raw=true)
![Bamazon Customer View 2](https://github.com/ckernan/bamazon/blob/master/images/CustomerView2.png?raw=true)

A video demo of the Customer View option can be found [here](https://drive.google.com/file/d/1WaM4OvcIoj2b2ntXV85YkJnvEmUXkgyF/view?usp=sharing).

## Manager View 

This option prompts the user with four different options:
* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product

Selecting "View Products For Sale" will display a table of all the items available for purchase.

Selecting "View Low Inventory" will list all the items with an inventory count lower than five.

Selecting "Add to Inventory" will prompt the user to enter the ID and number of units of the item they would like to add to inventory.

Selecting "Add New Product" will prompt the user to enter the name, department, price and number of units of the new product they would like to add.


![Bamazon Manager View 1](https://github.com/ckernan/bamazon/blob/master/images/ManagerView1.png?raw=true)
![Bamazon Manager View 2](https://github.com/ckernan/bamazon/blob/master/images/ManagerView2.png?raw=true)

A video demo of the Manager View option can be found [here](https://drive.google.com/file/d/1APVNI5hg-dPxF_qzkrreOWi3rRjpS5kd/view?usp=sharing).

## Supervisor View

This option prompts the user with two different options:
* View Product Sales by Department
* Create New Department

Selecting "View Product Sales by Department" will display a summarized table of the overhead costs, product sales and total profit for each department.

Selecting "Create New Department" will prompt the user to enter the name and overhead cost for the new department they would like to create. 

![Bamazon Supervisor View](https://github.com/ckernan/bamazon/blob/master/images/SupervisorView.png?raw=true)

A video demo of the Supervisor View option can be found [here](https://drive.google.com/file/d/1aPuz_EKtq8BvnBg9Iyva45rWBTRtWSdd/view?usp=sharing).

## Built With

* [Node.js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/) 

### NPM Packages Used

* MySQL
* Inquirer
* Cli-Table
* Chalk
* Console.Table
