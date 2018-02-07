'use strict';

/**
 * @ngdoc function
 * @name launchPointApiclientApp.controller:ModalCtrl
 * @description
 * # ModalCtrl
 * Controller of the launchPointApiclientApp
 */
angular.module('launchPointApiclientApp')
  .controller('ModalCtrl', function ($uibModalInstance,item) {
    console.log(item);
    var ctrl = this;
    this.data = item;
    ctrl.ok = function () {
      $uibModalInstance.close();
    };
  });
