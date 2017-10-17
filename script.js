// Code goes here

var app = angular.module("musicApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when('/items', {
      templateUrl: "view-list.html",
      controller: "listController"
    })
    .when('/items/add', {
      templateUrl: "view-detail.html",
      controller: "addController"
    })
    .when('/items/:index', {
      templateUrl: "view-detail.html",
      controller: "editController"
    })
    .otherwise({
      redirectTo: "/items"
    })
});

app.factory("musicService",["$rootScope",function($rootScope){
  var srv = {};
  var data = [
    {
      name: 'GroupLove',
      genre: 'Alternative',
      rating: 4
    },
    {
      name: 'The Beatles',
      genre: 'Rock',
      rating: 5
    },
    {
      name: 'The Cure',
      genre: 'New Wave',
      rating: 4
    },
    {
      name: 'AT - J',
      genre: 'Alternative',
      rating: 4
    }];
  srv.getArtists = function() {
    return data;
  };
  srv.addArtists= function(artist) {
    data.push(artist);
  };
  srv.editArtists = function(index,artist) {
    data[index] = artist;
  };
  return srv;
}]);

app.controller("listController", ['$scope','$routeParams','$location','musicService', 
    function($scope, $routeParams, $location, musicService) {
    
  $scope.data = musicService.getArtists();
  
  $scope.addArtist = function() {
    $location.path("/items/add");
  };
  $scope.editRecord = function(index) {
    $location.path("/items/"+index);
  };
}]);

app.controller("addController", ['$scope','$routeParams','$location','musicService',
    function($scope, $routeParams, $location, musicService){
      
      $scope.save = function() {
        //save the new record
        musicService.addArtists({name: $scope.record.name,genre:$scope.record.genre,rating: $scope.record.rating});
        
        $location.path("/items");
      };
      $scope.cancel = function() {
        $location.path("/items");
      };
      
}]);

app.controller("editController", ['$scope','$routeParams','$location','musicService',
    function($scope, $routeParams, $location, musicService){
      $scope.record = musicService.getArtists()[parseInt($routeParams.index)];
      $scope.save = function() {
        //save the existing record
        musicService.editArtists(parseInt($routeParams.index),{name: $scope.record.name,genre:$scope.record.genre,rating:$scope.record.rating});
        
        $location.path("/items");
      };
      $scope.cancel = function() {
        $location.path("/items");
      };
}]);


























