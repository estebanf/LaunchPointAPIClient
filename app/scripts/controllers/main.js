'use strict';

/**
 * @ngdoc function
 * @name launchPointApiclientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the launchPointApiclientApp
 */
angular.module('launchPointApiclientApp')
  .controller('MainCtrl', function ($http,$uibModal) {
    var ctrl = this;
    var shownKeys= {
      casetrackings: ['id','haschanges','ruleexecuted','discriminationruleid','isoruleid','iqruleid','senttoiso','senttoiq','senttoiqhold','senttoclosecase','senttodropcase','finishedprocessing'],
      isotrackings: ['id','requestid','isoreceived','isoquerydcm','isorequestrecieved','isosent','isocompleted'],
      iqtrackings:['id','letter','iqreceived','iqenqueued','iqdequeued','iqsent'],
      executionerrors:['id','failcount','technicalerror','step','resolved','integration','validation','message']
    }
    this.viewObject = function(obj){
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'myModalContent.html',
        controller: 'ModalCtrl',
        controllerAs: '$ctrl',
        size: 'lg',
        // appendTo: parentElem,
        resolve: {
          item: function () {
            return obj;
          }
        }
      } );
    }
    this.clear = function(){
      this.search={};
      this.cases = [];
      this.pageSize = 10;
      this.page=0;
      this.count=0;
      this.totalPages = 0;
      this.pages = [];
      this.processes = {};
    };
    this.clear();
    this.back = function(){
      this.page = this.page -1;
      this.find();
    };
    this.forward = function(){
      this.page = this.page  + 1;
      this.find();
    };
    this.nav = function(page){
      this.page = page;
      this.find();
    };
    this.find = function(){
      var qs = {};
      var values = [{active:this.search.active}];
      if(this.search.CaseId && this.search.CaseId !== ''){
        values.push({caseid:this.search.CaseId});
      }
      if(this.search.ClientId && this.search.ClientId !== ''){
        values.push({clientid:this.search.ClientId});
      }
      if(this.search.EnvironmentId && this.search.EnvironmentId !== ''){
        values.push({environmentid:this.search.EnvironmentId});
      }
      if(values.length !==0){
        if(values.length === 1){
            qs.where = values[0];
        }
        else{
          qs.where = {and:values};
        }
      }
      var filterCount = '?where=' + JSON.stringify(qs.where);
      qs.limit=this.pageSize;
      qs.skip=this.pageSize*this.page;
      var filter = '?filter=' + JSON.stringify(qs);
      $http.get('/api/launchpointcases' + filter)
        .then(function(response){
          ctrl.cases = response.data;
        });
      $http.get('/api/launchpointcases/count' + filterCount)
        .then(function(response){
          ctrl.count = response.data.count;
          ctrl.totalPages = Math.ceil(ctrl.count/ctrl.pageSize);
          ctrl.pages = []
          for (var i = 0; i < ctrl.totalPages; i++) {
              ctrl.pages.push(i);
          }
          // ctrl.pages =  Array.from(Array(ctrl.totalPages),(x,i)=>i);
        });
    };
    this.getProcesses = function(lpcase){
      $http.get('/api/launchpointcases/getprocesses/' + lpcase.environmentid + '/'+ lpcase.clientid + '/' + lpcase.caseid)
        .then(function(response){
          var processes = response.data.results;
          angular.forEach(Object.keys(processes),function(value,key){
            if(processes[value].length > 0){
              ctrl.processes[value] = {
                keys: shownKeys[value],
                data: processes[value]
              };
            }
          });
          ctrl.process_list = Object.keys(ctrl.processes);
          console.log(ctrl.processes);
        })
    };
  });
