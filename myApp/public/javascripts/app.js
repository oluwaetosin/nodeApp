angular.module('myApp', [
'ngRoute',
'myApp.services'
])
.controller('HomeController', function($scope, HitService) {
HitService.count()
.then(function(data) {
$scope.hits = data;
});
$scope.registerHit = function() {
HitService.registerHit()
.then(function(data) {
$scope.hits = data;
});
}
});

angular.module('myApp.services', [])
.factory('HitService', function($q, $http) {
var service = {
count: function() {
var d = $q.defer();
$http.get('/hits')
.success(function(data, status) {
d.resolve(data.hits);
}).error(function(data, status) {
d.reject(data);
});
return d.promise;
},
registerHit: function() {
var d = $q.defer();
$http.post('/hit', {})
.success(function(data, status) {
d.resolve(data.hits);
}).error(function(data, status) {
d.reject(data);
});
return d.promise;
}
}
return service;
});