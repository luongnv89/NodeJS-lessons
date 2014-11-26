var radioControllers = angular.module('radioControllers',[]);
radioControllers.controller('ListRadioCtrl',['$scope','$routeParams','$http','$sce',function ($scope,$routeParams,$http,$sce) {
  $scope.isAdmin=($routeParams.usertype=='admin');
  console.log($scope.isAdmin);
  console.log($routeParams.usertype);
  $http.get('/allStreams.json').success(function (data) {
    $scope.radios=data;
    console.log($scope.radios);
    currentPlay(data[0]);
  });
  
  $scope.trustSrc=function (src) {
    return $sce.trustAsResourceUrl(src);
  }

  $scope.btnPlay=function (radiostream) {
    console.log(radiostream);
    currentPlay(radiostream);
  }

  function currentPlay (radiostream) {
    var rsPlayer = document.querySelector('#radioPlayer');
    document.querySelector('#radioName').innerHTML=radiostream.name;
    rsPlayer.innerHTML="";
    for(var i=0;i<radiostream.urls.length;i++){
      var s = document.createElement('source');
      s.src=radiostream.urls[i];
      rsPlayer.appendChild(s);
    }
    rsPlayer.load();
    $.amaran({
      content:{
        title:radiostream.name,
        message:'is playing!',
        info:new Date(),
        icon:'fa fa-add'
      },
      theme:'awesome ok',
      closeButton:true
    });

  }

  $scope.btnPlayClick=function () {
    var rsPlayer = document.querySelector('#radioPlayer');
    if(rsPlayer.paused){
      rsPlayer.play();
      $scope.isPlay=true;
    }else{
      rsPlayer.pause();
      $scope.isPlay=false;
    }
  }
}]);


radioControllers.controller('ViewRadioCtrl',['$scope','$routeParams','$http',function ($scope,$routeParams,$http) {
  $scope.radioId=$routeParams.radioId;
  $http.get('/radio/'+$routeParams.radioId).success(function (data) {
    $scope.channel = data;
  })
}]);

radioControllers.controller('EditRadioCtrl',['$scope','$routeParams','$http','$window',function ($scope,$routeParams,$http,$window)  {
  $scope.radioId=$routeParams.radioId;
  $http.get('/radio/'+$routeParams.radioId).success(function (data) {
    $scope.channel = data;
    $scope.form={};
    $scope.form.rsName = $scope.channel.name;
    $scope.form.rsTags = $scope.channel.tags;
    $scope.form.urls = $scope.channel.urls;
  });
  
  $scope.updateSubmit=function () {
    $http.post('/editRadio/'+$routeParams.radioId,$scope.form).success(function (data) {
      $window.history.back();
      $.amaran({
        content:{
          title:data.name,
          message:'was edited successfully!',
          info:new Date(),
          icon:'fa fa-add'
        },
        theme:'awesome ok',
        closeButton:true
      });
    });
  }

  $scope.cancelUpdate=function () {
    $window.history.back();
  }
}]);

radioControllers.controller('DeleteRadioCtrl',['$scope','$routeParams','$http','$window',function ($scope,$routeParams,$http,$window) {
  $scope.radioId=$routeParams.radioId;
  $scope.deleteRadio=function () {
    $http.post('/deleteRadio/'+$routeParams.radioId).success(function (data) {
      console.log(data);
      $window.history.back();
      $.amaran({
        content:{
          title:$routeParams.radioId,
          message:'was deleted successfully!',
          info:new Date(),
          icon:'fa fa-add'
        },
        theme:'awesome ok',
        closeButton:true
      });
    });
  }

  $scope.cancelDelete=function () {
    $window.history.back();
  }
}]);

radioControllers.controller('AddRadioCtrl',['$scope','$window','$http',function ($scope,$window,$http) {
  $scope.form={};
  $scope.addNewSubmit=function () {
    $http.post('/addRadio',$scope.form).success(function (data) {
      $window.history.back();
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

  $scope.cancelAddSubmit = function () {
    $window.history.back();
  }
}]);

function isValidUrl(url)
{
 return url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
}

