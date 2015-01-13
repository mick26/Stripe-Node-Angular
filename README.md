## Stripe with Node, Express & Angular

### Why?

Learning how to use the Stripe Payment Gateway with Node, Express and Angular. 
To be built on to create a functional E-commerce site.


### App Functionality

To use this App a Stripe account needs to be created. Stripe provides test API keys which enable the App to be tested without activating the 'live' account. There is no need to provide real credit card details if using the test API keys. The Stripe dashboard provides Admin functionality. The dashboard also allows visibility of all interactions with your Stripe account.
<br/>

On the Node server you need to enter your Stripe API keys in:
<pre>/server/config/stripe-keys.js</pre>

On the client you need to enter the Stripe Key in:
<pre>controllers.js</pre>
<br/>

This App does the following:

+ Client provides a Web form to take credit card details
+ Client creates a card object and sends it to Stripe
+ Stripe saves the credit card details and responds to client with a token
+ Client creates a customer object which includes the token (note: not credit card details)
+ Client sends customer object to Node server
+ Node requests new customer to be created on Stripe


<br/>

This App uses SSL encryption. You need a private key (server.key) file and a SSL certificate (server.crt) file. I have a [GIT Repository](https://github.com/mick26/HTTPS-todo-node-ng-mongo) that details the process of creating a self signed certificate with [OpenSSL](https://www.openssl.org/). Add the files to: 
<pre>\server\config\ssl</pre>
Ensure the path to the files is correct in server.js.


### Running the App

Ensure that:
+ the SSL files are set up
+ the Stripe API keys are entered 

Then:

- clone the repository
- npm install
- bower install
- node server.js
- browse to https://localhost:3300

