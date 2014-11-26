var radioApp = angular.module('radioApp', [
  'ngRoute',
  'radioControllers'
]);

radioApp.config(['$routeProvider',function ($routeProvider) {
  $routeProvider.
  when('/list', {
    templateUrl:'partials/listradio.jade',
    controller:'ListRadioCtrl'
  }).
  when('/view/:radioId',{
    templateUrl:'partials/viewradio.jade',
    controller:'ViewRadioCtrl'
  }).
  when('/add',{
    templateUrl:'partials/addradio.jade',
    controller:'AddRadioCtrl'
  }).
  when('/edit/:radioId',{
    templateUrl:'partials/editradio.jade',
    controller:'EditRadioCtrl'
  }).
  when('/delete/:radioId',{
    templateUrl:'partials/deleteradio.jade',
    controller:'DeleteRadioCtrl'
  }).
  otherwise({
    redirectTo:'/list'
  });
}]);