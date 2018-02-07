'use strict';

/**
 * @ngdoc overview
 * @name launchPointApiclientApp
 * @description
 * # launchPointApiclientApp
 *
 * Main module of the application.
 */
angular
  .module('launchPointApiclientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/exceptions', {
        templateUrl: 'views/exceptions.html',
        controller: 'ExceptionsCtrl',
        controllerAs: 'exceptions'
      })
      .when('/rule', {
        templateUrl: 'views/rule.html',
        controller: 'RuleCtrl',
        controllerAs: 'rule'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
