'use strict';

angular.module('mdtable', []).controller('mdtableController', [
  '$scope', function($scope) {

    $scope.table = {};

    $scope.table.columns = [
      {
        columnName: 'bidSize',
        displayName: 'Bid Size'
      }, {
        columnName: 'bid',
        displayName: 'Bid'
      }, {
        columnName: 'ask',
        displayName: 'Ask'
      }, {
        columnName: 'askSize',
        displayName: 'Ask Size'
      }
    ];
    
    $scope.table.data = {
      stockA: {
        bidSize: 100,
        bid: 50,
        ask: 51,
        askSize: 90,
      },
      stockB: {
        bidSize: 1200,
        bid: 93.5,
        ask: 94,
        askSize: 1300,
      },
      stockC: {
        bidSize: 1000,
        bid: 1000,
        ask: 1000.5,
        askSize: 1000,
      },
      stockD: {
        bidSize: 3650,
        bid: 200,
        ask: 204,
        askSize: 2200,
      }
    };
  }
]);
;
