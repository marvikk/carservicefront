'use strict';

angular.module('myApp.officeClient', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/officeClient', {
            templateUrl: 'view/officeClient/officeClient.html',
            controller: 'OfficeClientCtrl'
        });
    }])

    .controller('OfficeClientCtrl', function($scope, $http, $location, $rootScope) {

        $scope.user = [];
        $scope.authorization = [];
        $scope.arrayCarsM = [];
        $scope.cars = [];
        $scope.marks = {};

        $scope.client = {};
        $scope.auth = {};

        var urlC = $rootScope.url + "api/clients?id=" + $rootScope.Id;
        $http.get(urlC).success(function(response){
            $scope.user = response;
            // console.log(response)
            //put all cars from users in arrCars
            for(var y in response){
                if(response[y].cars != undefined) {
                    $scope.arrayCarsM = response[y].cars;
                    console.log($scope.arrayCarsM)
                }
            }
        });
        var urlA = $rootScope.url + "getclientbyid";
        var idUser =$rootScope.Id;
        $http.post(urlA,
            {id: idUser,
                role: 'client'
            }).success(function(response){
                $scope.authorization = response;
            });

        
        var url = $rootScope.url + "api/carmanufacturerapi";
        var url1 = "";

        $http.get(url)
            .success(function(data){
                $scope.cars = data;
            });
        $scope.myFunc = function(carObj) {
            url1 = $rootScope.url + "api/carmodelsapi/" +carObj.id;
       
            $http.get(url1)
                .success(function(result){
                    $scope.marks = result.model.models;
                });
        };



        $scope.addItem = function(item, item1, item2, item3){
            $scope.arrayCarsM.push(item.title + ", " + item1 + ", " + item2 + ", " + item3);
            $scope.client.cars = $scope.arrayCarsM;
        }
        $scope.removeItem = function(x){
            $scope.arrayCarsM.splice(x, 1);
        }

        console.log($scope.client);
        console.log($scope.auth);
//TODO

        $scope.updateClient = function (idAuth) {
            $scope.client.cars = $scope.arrayCarsM;
            $scope.auth.idUser = $rootScope.Id;

            $http.put($rootScope.url + "api/clients/" + $rootScope.Id, $scope.client).success(function (response) {
                    console.log($scope.client);
                $http.put($rootScope.url + "api/authentic/" + idAuth, $scope.auth).success(function (response) {
                    console.log(response);
                });
            });
            $location.path("/firstPage");
        };


    });
// console.log(JSON.stringify(data));