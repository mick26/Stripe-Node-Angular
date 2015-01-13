/*================================================================
Server side Routing - routes dealing with the user authentication
ROUTE Definitions

Ref.
https://stripe.com/docs/api/node#create_customer
=================================================================*/

var stripeKeys = require('../config/stripe-keys.js');
var stripe = require("stripe")(stripeKeys.secretTestKey);

stripe.setApiVersion(stripeKeys.apiVersion);


module.exports = {

	/*================================================================
	$http post - Sign Up
	Send customer Object
	Create customer on Stripe server  
	=================================================================*/

	addCustomer : function(req, res) {
		console.log("In post /charge");

		/*
	 	 * Create a new Customer on Stripe DB
		 */
		stripe.customers.create({

		    card : req.body.stripeToken,
		    email: req.body.email,
		    currency: req.body.currency,
		    description: req.body.description
		    }, 

		    function (err, customer) {

		    	if (err) {
		    		console.log(err);
		        	res.send("Error while processing your payment: " + err);
		      	}
		      	else {
			        var id = customer.id;
			        console.log('Success! Customer with Stripe ID ' + id + ' just signed up!');
			        // save this customer to your database here!
			        //console.log("Customer= "+JSON.stringify(customer));//TEST
			        res.send('ok');
		      	}
		    }
		);
	},


	/*================================================================
	$HTTP get /customer
	=================================================================*/
	getCustomers : function(req, res) {
		
		/*
		 * Get the last customer added
		 */
		stripe.customers.list({ limit: 1 }, function(err, customers) {
	  		//asynchronously called
			if(err)
				res.send(err);

			//send customers to client
			else {
				res.send(customers);
			}
		});
	}

};
