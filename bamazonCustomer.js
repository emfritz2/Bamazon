
var mysql = require('mysql');
var inquirer = require('inquirer');

// var sql = 'SELECT * FROM products';

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "bamazon",
});


connection.connect((function(err) {
  if (err) {
    console.error('error');
    return;
  }
 
}));
 
 // displays all of the products
   
	connection.query('SELECT * FROM products', function(err, data) {
	    if (err) {
	        console.log(err);
	    }

	    var items = '';
			for (var i = 0; i < data.length; i++) {
				items = '';
				items += 'ID: ' + data[i].item_id + ' | ';
				items += 'Product: ' + data[i].product_name + ' | ';
				items += 'Dept: ' + data[i].department_name + ' | ';
				items += '$' + data[i].price + ' | ';
				items += 'Quantity: ' + data[i].stock_quantity;
		 console.log("------------------------------------------------------------------------");
	     console.log(items);
			};

		connection.end();

		purchase();

	});
 
 // prompts the customer

 // var purchased = [];

function purchase(){
	    
	    inquirer.prompt([
	    {
	        name: 'id',
	        message: 'What is the ID of the product you would like to buy?'
	    },
	    {
	        name: 'quantity',
	        message: 'How many would you like to buy?'
	    }
	    ]).then(function(answer){

	        var item = answer.id;
			var quantity = answer.quantity;

		    connection.query('SELECT * FROM products WHERE ?', {item_id: item}, function(err, data) {

				console.log(data);

			});
		});
};		

// item console logs correctly but cannot get data to return as defined

