angular.module('mdtable', []).controller('mdtableController', [
  '$scope', '$interval', function($scope, $interval) {
    "use strict";

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

    /*********************************
     * Dummy data-refresh part below
     *********************************/

    var i = 0;

    // Returning either of case 1 (i==0) stockA data, or case 2 (else) stockA data
    var getData = function(){
      i = (i + 1) % 2;
      if (i === 0) {
        return {
          assetName: 'stockA',
          rowData: {
            bidSize: 100,
            bid: 50,
            ask: 51,
            askSize: 90
          }
        };
      }else{
        return {
          assetName: 'stockA',
          rowData: {
            bidSize: 30,
            bid: 51,
            ask: 52,
            askSize: 150
          }
        };
      }
    };

    // Function to update $scope.table.data
    var update = function(){
        var updateData = getData();
        $scope.table.data[updateData.assetName] = updateData.rowData;
    };

    // Continuously call the update function every 500 milli seconds
    $interval(update, 500);

  }
]);

