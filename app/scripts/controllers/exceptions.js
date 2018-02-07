'use strict';

/**
 * @ngdoc function
 * @name launchPointApiclientApp.controller:ExceptionsCtrl
 * @description
 * # ExceptionsCtrl
 * Controller of the launchPointApiclientApp
 */
angular.module('launchPointApiclientApp')
  .controller('ExceptionsCtrl', function ($http) {
    var ctrl = this;
    this.data = [];
    this.getData = function(fn){

      $http.get('/api/executionerrors/' + fn)
        .then(function(response){
          ctrl.data = response.data.results;
          console.log(ctrl.data);
        });
    }
    this.resolve = function(item){
      $http.get('/api/executionerrors/recover/' + item.id)
        .then(function(response){
          console.log(response);
          var itemIndex = ctrl.data.indexOf(item);
          $http.get('/api/executionerrors/' + item.id)
            .then(function(resp){
              var newItem = resp.data;
              if(newItem.resolved){
                ctrl.data.splice(itemIndex,1);
              }
              else{
                ctrl.data[itemIndex] = newItem;
              }
            })
        })
    }
  });
