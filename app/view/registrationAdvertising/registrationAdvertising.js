/**
 * Created by Liza on 9/12/2016.
 */
'use strict';

angular.module('myApp.registrationAdvertising', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/registrationAdvertising', {
            templateUrl: 'view/registrationAdvertising/registrationAdvertising.html',
            controller: 'RegistrationAdvertisingCtrl'
        });
    }])

    .controller('RegistrationAdvertisingCtrl', function($scope, $http) {
        $scope.advertising = {};
        $scope.cars = [];
        $scope.arrayCarsA = [];

        var url = "http://casco.cmios.ru/api/cars?callback=JSON_CALLBACK";
        $http.jsonp(url)
        .success(function(data){
                $scope.cars = data;
                console.log($scope.advertising)
            })

        $scope.addItem = function (item) {
            $scope.arrayCarsA.push(item);
            $scope.advertising.cars =  $scope.arrayCarsA;
            console.log($scope.arrayCarsA)
        }
        $scope.removeItem = function (x) {
            $scope.arrayCarsA.splice(x, 1);
        }

    });