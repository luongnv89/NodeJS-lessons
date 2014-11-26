var radioControllers = angular.module('radioControllers',[]);

radioControllers.controller('ListRadioCtrl',['$scope','$http',
  function ($scope,$http) {
    $http.get('/allStreams.json').success(function (data) {
      console.log(data);
      $scope.radios=data;
    });
  }]);

radioControllers.controller('ViewRadioCtrl',['$scope','$routeParams',function ($scope,$routeParams) {
  console.log($routeParams.radioId);
  $scope.radioId=$routeParams.radioId;
}]);

radioControllers.controller('EditRadioCtrl',['$scope','$routeParams',function ($scope,$routeParams) {
  console.log($routeParams.radioId);
  $scope.radioId=$routeParams.radioId;
}]);

radioControllers.controller('DeleteRadioCtrl',['$scope','$routeParams',function ($scope,$routeParams) {
  console.log($routeParams.radioId);
  $scope.radioId=$routeParams.radioId;
}]);

radioControllers.controller('AddRadioCtrl',['$scope',function ($scope,$routeParams) {
  $scope.test='Hehe';
}]);


