
var mysql = require('mysql');
var inquirer = require('inquirer');

var sql = 'SELECT * FROM products';

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

 function displayProducts(){
   
	connection.query(sql, function(err, data) {
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

		purchase();

	});

};
 
 // prompts the customer

function purchase(){
	    
	    inquirer.prompt([
	    {
	        name: 'id',
	        type: 'input',
	        message: 'What is the ID of the product you would like to buy?'
	    },
	    {
	        name: 'quantity',
	        type: 'input',
	        message: 'How many would you like to buy?'
	    }
	    ]).then(function(answer){

		        var id = parseInt(answer.id);
				var quantity = parseInt(answer.quantity);

				console.log(answer);

				var query = 'SELECT * FROM products WHERE item_id = ?';

			    connection.query(query, id, function(err, data) {

			    	if (err) throw err;

					console.log(data);

					var purchase = data[0];

					if (quantity <= purchase.stock_quantity) {

						console.log("Processing Order. Your total is: " + purchase.price * quantity);

						connection.query('UPDATE products SET stock_quantity = ' + (purchase.stock_quantity - quantity) + ' WHERE item_id = ' + id, function(err, data) {
						});

					}else{
						console.log("We do not have enough stock to fill your request.");
						console.log("Please place a new order.");
						displayProducts();
					}

					connection.end();

				});
		});


};		

displayProducts();

// id and quantity console logs correctly but cannot get data to return as defined

