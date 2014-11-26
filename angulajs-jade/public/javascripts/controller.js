var radioControllers = angular.module('radioControllers',[]);

radioControllers.controller('RadioListCtrl',['$scope','$http',
  function ($scope,$http) {
    $http.get('/allStreams.json').success(function (data) {
      console.log(data);
      $scope.radios=data;
    });
  }]);

radioControllers.controller('RadioDetailCtrl',['$scope','$routeParams',function ($scope,$routeParams) {
  console.log($routeParams.radioId);
  $scope.radioId=$routeParams.radioId;
}]);


