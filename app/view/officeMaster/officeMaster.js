'use strict';

angular.module('myApp.officeMaster', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/officeMaster', {
    templateUrl: 'view/officeMaster/officeMaster.html',
    controller: 'OfficeMasterCtrl'
  });
}])


.controller('OfficeMasterCtrl', function($scope, $http, $location, $rootScope, $filter) {
        $scope.masters = [];
        $scope.authorization = [];
        $scope.arrayCarsM = [];
        $scope.cars = [];
        $scope.marks = {};
        $scope.services = [];
        $scope.arrayService = [];

        $scope.master = {};
        $scope.auth = {};


        var urlC = "http://localhost:3001/api/masters?id=" + $rootScope.Id;
        $http.get(urlC).success(function(response){
            $scope.masters = response;
            //put all cars from masters in arrCars
            for(var y in response){
                if(response[y].cars != undefined) {
                    $scope.arrayCarsM = response[y].cars
                }
                //put all services from masters in arrService
                if (response[y].services != undefined) {
                    $scope.arrayService = response[y].services
                }
            }
            $scope.master.cars = $scope.arrayCarsM;
            $scope.master.services = $scope.arrayService;

        });
        var urlA = "http://localhost:3001/getclientbyid";
        var idUser =$rootScope.Id;
        $http.post(urlA,
            {id: idUser,
                role: 'master'
            }).success(function(response){
            $scope.authorization = response;
        });

        $scope.addImg = function(item1){
            $scope.master.img = item1;
        }
//add cars
        var url = "http://casco.cmios.ru/api/cars?callback=JSON_CALLBACK";
        $http.jsonp(url)
            .success(function(data){
                $scope.cars = data;
                console.log($scope.master)
            })

        $scope.addItem = function(item){
            $scope.arrayCarsM.push(item.title);
            $scope.master.cars = $scope.arrayCarsM;
            console.log($scope.arrayCarsM);

        }
        $scope.removeItem = function(x){
            $scope.arrayCarsM.splice(x, 1);
        }
//add Services
        var url1 = "http://localhost:3000/services";
        $http.get(url1)
            .success(function(data){
                $scope.services = data;
            })
        $scope.addService = function(item){
            $scope.arrayService.push(item);
            $scope.master.services = $scope.arrayService;
            console.log($scope.arrayService);

        }
        $scope.removeService = function(x){
            $scope.arrayService.splice(x, 1);
        }


        console.log($scope.master);
        console.log($scope.auth);
        $scope.auth.idMaster = $rootScope.Id;

        $scope.updateMaster = function (idAuth) {

            $http.put("http://localhost:3001/api/masters/" + $rootScope.Id, $scope.master).success(function (response) {
                console.log($scope.master);
                $http.put("http://localhost:3001/api/authentic/" + idAuth, $scope.auth).success(function (response) {
                    console.log(response);
                });
            });
            $location.path("/firstPage");
        };

    })