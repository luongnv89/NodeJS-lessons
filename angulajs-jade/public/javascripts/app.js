var radioApp = angular.module('radioApp', [
  'ngRoute',
  'radioControllers',
  'radioFilter'
  ]);

radioApp.config(['$routeProvider',function ($routeProvider) {
  $routeProvider.
  when('/list/:usertype', {
    templateUrl:'partials/listradio.jade',
    controller:'ListRadioCtrl'
  }).
  when('/admin/edit/:radioId',{
    templateUrl:'partials/editradio.jade',
    controller:'EditRadioCtrl'
  }).
  when('/admin/delete/:radioId',{
    templateUrl:'partials/deleteradio.jade',
    controller:'DeleteRadioCtrl'
  }).
  when('/add',{
    templateUrl:'partials/addradio.jade',
    controller:'AddRadioCtrl'
  }).
  otherwise({
    redirectTo:'/list/anymoususer'
  });
}]);
