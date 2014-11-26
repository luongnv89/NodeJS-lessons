var radioApp = angular.module('radioApp', [
  'ngRoute',
  'radioControllers'
]);

radioApp.config(['$routeProvider',function ($routeProvider) {
  $routeProvider.
  when('/radios', {
    templateUrl:'partials/radio-list.jade',
    controller:'RadioListCtrl'
  }).
  when('/radios/:radioId',{
    templateUrl:'partials/radio-detail.jade',
    controller:'RadioDetailCtrl'
  }).
  otherwise({
    redirectTo:'/radios'
  });
}]);