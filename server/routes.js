/*================================================================
Server side Routing using Express
ROUTE Declarations
=================================================================*/


/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var stripeRoutes = require('./routes/stripe-routes.js'); //route definitions

module.exports = function(app) {

	/* ========================================================== 
	Routes
	============================================================ */
	app.post('/customers', stripeRoutes.addCustomer); //new customer
	app.get('/customers', stripeRoutes.getCustomers); //get customers
};
