var radioControllers = angular.module('radioControllers',[]);

radioControllers.controller('ListRadioCtrl',['$scope','$http',
  function ($scope,$http) {
    $http.get('/allStreams.json').success(function (data) {
      $scope.radios=data;
    });
  }]);

radioControllers.controller('ViewRadioCtrl',['$scope','$routeParams','$http',function ($scope,$routeParams,$http) {
  $scope.radioId=$routeParams.radioId;
  $http.get('/radio/'+$routeParams.radioId).success(function (data) {
    $scope.channel = data;
  })
}]);

radioControllers.controller('EditRadioCtrl',['$scope','$routeParams',function ($scope,$routeParams) {
  console.log($routeParams.radioId);
  $scope.radioId=$routeParams.radioId;
}]);

radioControllers.controller('DeleteRadioCtrl',['$scope','$routeParams',function ($scope,$routeParams) {
  console.log($routeParams.radioId);
  $scope.radioId=$routeParams.radioId;
}]);

radioControllers.controller('AddRadioCtrl',['$scope','$location','$http',function ($scope,$location,$http) {
  $scope.form={};
  $scope.addNewSubmit=function () {
    console.log($scope.form);
    $http.post('/addRadio',$scope.form).success(function (data) {
      $location.path('/');
      $.amaran({
            content:{
                title:data.name,
                message:'was added successfully!',
                info:new Date(),
                icon:'fa fa-add'
            },
            theme:'awesome ok',
            closeButton:true
        });
    });
  }
}]);


