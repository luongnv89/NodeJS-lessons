var radioService = angular.module('radioService',['ngResource']);

radioService.factory('Radio',['$resource',function($resource){
	return $resource('/:radioId.json',{},{query:{method:'GET',params:{radioId:'allStreams'},isArray:true}});
}]);