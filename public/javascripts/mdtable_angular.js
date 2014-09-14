angular.module('mdtable', []).controller('mdtableController', [
  '$scope', function($scope) {
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


    var connection = new WebSocket('ws://localhost:9000/mdtable-websocket')
    connection.onmessage = function (message) {
        $scope.$apply( function() { update(JSON.parse(message.data)); } );
    };

    connection.onerror = function (error) {
        console.log('WebSocket Error ' + error);
    };

    // Function to update $scope.table.data
    var update = function(updateData){
        $scope.table.data[updateData.assetName] = updateData.rowData;
    };
  }
]);

