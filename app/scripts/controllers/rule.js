'use strict';

/**
 * @ngdoc function
 * @name launchPointApiclientApp.controller:RuleCtrl
 * @description
 * # RuleCtrl
 * Controller of the launchPointApiclientApp
 */
angular.module('launchPointApiclientApp')
  .controller('RuleCtrl', function ($http) {
    var ctrl = this;
    ctrl.data = {};
    ctrl.haveResults = false;
    ctrl.results = {}
    ctrl.testRule = function(){
      var body = {
        'proc:Test_runRequest': { '@xmlns': { proc: 'http://bpms.everteam.com/Processes/BusinessRules/ExecutionRules/process',laun: 'http://www.example.org/Launchpoint' },
          'laun:CaseId': { $: '0' },
          'laun:BatchId': { $: '0'},
          'laun:ClientId': { $: ctrl.data.ClientId + ''},
          'laun:EnvironmentId': { $: '0'},
          'laun:ISOIndicator': { $: ctrl.data.ISOIndicator + ''},
          'laun:Score': { $: ctrl.data.Score + ''},
          'laun:AccidentDate': { $: '2018-01-01'},
          'laun:BenefitAmount': { $: ctrl.data.BenefitAmount + ''},
          'laun:FundingSource': { $: ctrl.data.FundingSource + ''},
          'laun:LOB': { $: ''},
          'laun:WorkComp': { $: ''},
          'laun:CaseStatus': { $: ctrl.data.CaseStatus + ''},
          'laun:CaseSource': { $: ctrl.data.CaseSource + ''},
          'laun:LifeCycle': { $: ''},
          'laun:CloseReason': { $: ''},
          'laun:State': { $: ''},
          'laun:IQResponseReceived': { $: ctrl.data.IQResponseReceived + ''},
          'laun:IQResponseReceivedReason': { $: ''},
          'laun:CanClose': { $: ''},
          'laun:BelowCostEffectivePursuit': { $: ctrl.data.BelowCostEffectivePursuit + ''},
          'laun:IQReturnMail': { $: ctrl.data.IQReturnMail + ''},
          'laun:InvalidAddress': { $: ctrl.data.InvalidAddress + ''},
          'laun:IQHold': { $: ctrl.data.IQHold + ''},
          'laun:ISOSent': { $: ctrl.data.ISOSent + ''},
          'laun:ISOResponse': { $: ''},
          'laun:vip': { $: ctrl.data.vip + ''},
          'laun:IQLetters': { $: ctrl.data.IQLetters + ''},
          'laun:daysSinceAccident': { $: ctrl.data.daysSinceAccident + ''},
          'laun:BelowCostEffectivePursuitDueDatePassed': { $: ctrl.data.BelowCostEffectivePursuitDueDatePassed + ''},
          'laun:daysSinceLastIQLetter': { $: ctrl.data.daysSinceLastIQLetter +  ''}
        }
      };
      $http.post('/everteam/ode/processes/LaunchPointProcess_Processes_BusinessRules_ExecutionRules_process_externalApp', JSON.stringify(body), {headers:{'Content-Type': 'application/json/badgerfish'}})
        .then(function(resp,body){
          var data = resp.data.output;
          ctrl.haveResults = true;
          ctrl.results.closeCase = data['BusinessRule:closeCase'].$
          ctrl.results.discriminationRuleId = data['BusinessRule:discriminationRuleId'].$
          ctrl.results.doNothing = data['BusinessRule:doNothing'].$
          ctrl.results.iq = data['BusinessRule:iq'].$
          ctrl.results.iqHold = data['BusinessRule:iqHold'].$
          ctrl.results.iqRuleId = data['BusinessRule:iqRuleId'].$
          ctrl.results.iso = data['BusinessRule:iso'].$
          ctrl.results.isoRuleId = data['BusinessRule:isoRuleId'].$
          ctrl.results.sendIQ = data['BusinessRule:sendIQ'].$
          ctrl.results.sendIso = data['BusinessRule:sendIso'].$
          ctrl.results.stop = data['BusinessRule:stop'].$
        });
    }

  });
