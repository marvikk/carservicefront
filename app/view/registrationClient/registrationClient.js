'use strict';

angular.module('myApp.registrationClient', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/registrationClient', {
            templateUrl: 'view/registrationClient/registrationClient.html',
            controller: 'RegistrationClientCtrl'
        });
    }])

    .controller('RegistrationClientCtrl', function($scope, $http, $location) {
        $scope.cars = [];
        $scope.marks = {};
        $scope.client = {};
        $scope.auth = {};

        $scope.arrayCarsM =[];

        var url = $rootScope.url + "api/carmanufacturerapi";
        var url1 = "";

        $http.get(url)

            .success(function(data){
                $scope.cars = data;
             });
  
        $scope.myFunc = function(carObj) {
            url1 =$rootScope.url + "api/carmodelsapi/" +carObj.id;
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

        function str_rand() {
            var result = '';
            var words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
            var max_position = words.length - 1;
            for(var i = 0; i < 8; ++i ) {
                var position = Math.floor ( Math.random() * max_position );
                result = result + words.substring(position, position + 1);
            }
            return result;
        }

        $scope.addClient = function () {
            var url1 = $rootScope.url + "api/authentic";
            var url = $rootScope.url + "api/clients";
            $scope.auth.password = str_rand();
            $scope.auth.role = "client";

            $http.post(url, $scope.client).success(function (response) {
                $scope.auth.idUser = response.id;
                console.log(response.id);
                $http.post(url1, $scope.auth).success(function (response) {
                    // console.log(response);
                    $http.post($rootScope.url + "sendmessages",
                        {
                            email: response.email,
                            pass: response.password
                        }).success(function(answer){

                        })
                });
            });

            $location.path("/viewLogin");
        };


    });
// console.log(JSON.stringify(data));