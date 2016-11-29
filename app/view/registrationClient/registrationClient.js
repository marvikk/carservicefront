'use strict';

angular.module('myApp.registrationClient', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/registrationClient', {
        templateUrl: 'view/registrationClient/registrationClient.html',
        controller: 'RegistrationClientCtrl'
      });
    }])

    .controller('RegistrationClientCtrl', function($scope, $http, $location, $rootScope) {
        $scope.cars = [];
        $scope.marks = {};
        $scope.client = {};
        $scope.auth = {};

        $scope.arrayCarsM =[];

        var url ="http://casco.cmios.ru/api/cars?callback=JSON_CALLBACK";
        var url1 = "";

        $http.jsonp(url)
          .success(function(data){
              $scope.cars = data;
                console.log($scope.client);

          });
        $scope.myFunc = function(carObj) {
            url1 ="http://casco.cmios.ru/api" +carObj.url+ "?callback=JSON_CALLBACK";
            $http.jsonp(url1)
                .success(function(result){
                    $scope.marks = result.models;
                });
        };
        $scope.addItem = function(item, item1, item2, item3){
            $scope.arrayCarsM.push(item.title + ", " + item1 + ", " + item2 + ", " + item3);
             $scope.client.cars = $scope.arrayCarsM;
        }
        $scope.removeItem = function(x){
            $scope.arrayCarsM.splice(x, 1);
        }

        $scope.addClient = function () {
            var url1 = $rootScope.url+"api/authentic";
            var url = $rootScope.url+"api/clients";
            $scope.auth.password = "12345";
            $scope.auth.role = "client";

            $http.post(url, $scope.client).success(function (response) {
                $scope.auth.idUser = response.id;
                console.log(response.id);
                $http.post(url1, $scope.auth).success(function (response) {
                    // console.log(response);

                });
            });

            $location.path("/viewLogin");
        };


    });
// console.log(JSON.stringify(data));