/*================================================

Ref.
https://stripe.com/docs/tutorials/forms
================================================ */

'use strict';

/*================================================
Module - for Controllers
================================================ */
angular.module('stripeApp.controllers', [])


/*================================================
Controller
		
When form containing Credit Card details is submitted
Create a card object to hold card details
send card object to Stripe using "Stripe.card.createToken({})"
Stripe responds with a "Token"
Create "customerObject" which includes the token and other details
Send the customer Object to your Node server
Node server 
================================================ */
.controller('CustomersCtrl', function ($scope, $http) {

	//This identifies your website in the createToken call below
	//Stripe.setPublishableKey('YOUR_PUBLISHABLE_KEY');
	Stripe.setPublishableKey('pk_test_G');

	$scope.card = { 
		"number":"",
		"exp_month": "",
		"exp_year": "",
		"cvc": ""
	};


/*
		  card: {
		    "number": $scope.cardNumber,
		    "exp_month": $scope.expMonth,
		    "exp_year": $scope.expYear,
		    "cvc": $scope.cvc
		  }
*/ 


	$scope.addCustomer=function() {

		console.log("Card Details: "+JSON.stringify($scope.card));


		/**
		 * Create a card object to hold card details
		 * send card object to Stripe using "Stripe.card.createToken({})"
		 */
		Stripe.card.createToken(
			
		   { "number": $scope.card.number,
		    "exp_month": $scope.card.exp_month,
		    "exp_year": $scope.card.exp_year,
		    "cvc": $scope.card.cvc,
		    "currency":"eur",
		    "country":"IE",
		    "name":"John O'Doe",
		    "address_line1":"Ballina Shee",
		    "address_city":"Dublin",
		    "address_country":"Ireland"
		  }, stripeResponseHandler);




		/**
		 * Callback function
		 */
		function stripeResponseHandler(status, response) {

			/**
			 * Error!
			 */
			if (response.error) {
				console.log(response.error)
			}

			/**
		 	 * Successful
		 	 * Stripe creates a Token and sends it back to client
		 	 * can access token from response.id callback parameter 
		 	 */ 
			else {
				// response contains id and card, which contains additional card details
				var stripeToken = response.id;

				console.log("response.id = "+ response.id);
				console.log("response.card = "+ JSON.stringify(response.card));

				/**
				 * Create customer object
				 * containing token and other customer info
				 */
				var customerObj = {
					"stripeToken":stripeToken, 
					"email":"Johnodoe@gmail.com",
					"description": "This is the description!!",
					"discount": 10
				};

				/**
				 * Send customer object to Node server
				 */
				$http.post('/customers', customerObj )

				/**
				 * Success callback - new customer added to stripe
				 */
				.success(function(data, status, headers, config) {
					console.log("Success: "+data+" "+status)
				})

				/**
				 * Error callback - problem adding customer object to stripe DB
				 */
				.error(function(data, status, headers, config) {
					console.log("Error: "+data+" "+status)
				})
			}
		};			
	};


	$scope.getCustomers=function() {

		/**
		 * Get customers
		 */
		$http.get('/customers')

		/**
		 * Success callback - Get customers 
		 */
		.success(function(data, status, headers, config) {
			console.log("Success: "+JSON.stringify(data));
			$scope.customers=data;
		})

		/**
		 * Error callback - problem getting customers
		 */
		.error(function(data, status, headers, config) {
			console.log("Error: "+data+" "+status)
		})
	};
})


/*================================================
Controller
================================================ */
.controller('MainCtrl', function ($scope, $http) {

})


