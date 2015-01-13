'use strict';


/**
 * Module - Main App module 
 */
angular.module('stripeApp', ['ngRoute', 'stripeApp.controllers'])


.config( function($routeProvider, $locationProvider, $httpProvider) {
  

  /*================================================
  Define all the Routes
  ================================================ */
  $routeProvider

    .when('/', {
      templateUrl: 'views/main.tpl.html',
      controller  : 'MainCtrl'
    })

    .when('/customers', {
      templateUrl: 'views/customers.tpl.html',
      controller  : 'CustomersCtrl'
    })

    .otherwise({
      redirectTo: '/'
    })

});



