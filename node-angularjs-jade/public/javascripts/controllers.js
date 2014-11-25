'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('AppCtrl', function ($scope, $http) {
	$http({
		method: 'GET',
		url: '/api/posts'
	}).
	success(function (data, status, headers, config) {
		$scope.name = data.name;
	}).
	error(function (data, status, headers, config) {
		$scope.name = 'Error!';
	});
}).
controller('IndexCtrl', function IndexCtrl ($scope,$http) {
	$http.get('/api/posts').success(function (data,status,headers,config) {
		$scope.posts=data.posts;
	});
}).
controller('AddPostCtrl',function AddPostCtrl ($scope,$http,$location) {
	$scope.form={};
	$scope.submitPost=function () {
		$http.post('/api/post',$scope.form).success(function (data) {
			$location.path('/');
		});
	};
}).
controller('ReadPostCtrl',function ReadPostCtrl ($scope,$http,$routeParams) {
	$http.get('/api/post'+$routeParams.id).success(function (data) {
		$scope.post=data.post;
	});
}).
controller('EditPostCtrl',function EditPostCtrl ($scope,$http,$location,$routeParams) {
	$scope.form={};
	$http.get('/api/post/'+$routeParams.id).success(function (data) {
		$scope.form=data.post;
	});

	$scope.editPost = function () {
		$http.put('/api/post/'+$routeParams.id,$scope.form).success(function (data) {
			$location.url('/readPost/'+$routeParams.id);
		});
	};
}).
controller('DeletePostCtrl',function DeletePostCtrl ($scope,$http,$location,$routeParams) {
	$http.get('/api/post/'+$routeParams.id).success(function (data) {
		$scope.post = data.post;
	});

	$scope.deletePost = function () {
		$http.delete('/api/post/'+$routeParams.id).success(function (data) {
			$location.url('/');
		});
	};

	$scope.home=function () {
		$location.url('/');
	}
});
