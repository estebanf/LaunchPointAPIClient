'use strict';

describe('Controller: ExceptionsCtrl', function () {

  // load the controller's module
  beforeEach(module('launchPointApiclientApp'));

  var ExceptionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExceptionsCtrl = $controller('ExceptionsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExceptionsCtrl.awesomeThings.length).toBe(3);
  });
});
