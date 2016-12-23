/**
 * Created by Liza on 9/12/2016.
 */
'use strict';

angular.module('myApp.carWashView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/carWashView', {
            templateUrl: 'view/carWashView/carWashView.html',
            controller: 'CarWashViewCtrl'
        });
    }])

    .controller('CarWashViewCtrl', function($scope, $http, $rootScope, $location) {
        $scope.carWash = [];
        $scope.services = listOfServices;
        $scope.cars = [];
        $scope.checkedCars = [];
        $scope.checkedService = "Кузовной ремонт";
        $scope.checkedCategories = "passCar";

        //var url = "http://casco.cmios.ru/api/cars?callback=JSON_CALLBACK";
        //$http.jsonp(url)
        //    .success(function(data){
        //        $scope.cars = data;
        //    })

        //add cars
        var url = $rootScope.url + "api/carmanufacturerapi";
        $http.get(url)
            .success(function(data){
                $scope.cars = data;
            });


        $http.get($rootScope.url + 'api/masters').success(function (response) {
            for(var x in response){
                if(response[x].carWash === true){
                    $scope.carWash.push(response[x]);
                }
            }
            //$scope.mechanics = response;
            console.log($scope.carWash);

        });

        //dobavliau categories v array checedCategories
        $scope.categories = ["bicycle", "passCar", "lorry", "bus", "moped"];

        $scope.toggleCategories = function (category) {
            if ($scope.checkedCategories.indexOf(category) === -1) {
                $scope.checkedCategories=(category);
            } else {
                $scope.checkedCategories.splice($scope.checkedCategories.indexOf(category), 1);
            }
        };
        $scope.clearCategories = function(){
            $scope.checkedCategories = "passCar";
        }

        //dobolviay mashiny v array checkedCars
        $scope.toggleCheck = function (car) {
            if ($scope.checkedCars.indexOf(car) === -1) {
                $scope.checkedCars.push(car);
            } else {
                $scope.checkedCars.splice($scope.checkedCars.indexOf(car), 1);
            }
        };
        $scope.clearCars = function(){
            $scope.checkedCars = [];
        }

        //dobaliau service v array
        $scope.toggleService = function(service, serviceVid){
            $scope.vid = serviceVid;
            if($scope.checkedService.indexOf(service) === -1){
                $scope.checkedService=(service);
            }else{
                $scope.checkedService.splice($scope.checkedService.indexOf(service), 1);
            }
            console.log($scope.checkedService)
        };

        $scope.clearService = function(){
            $scope.checkedService = "Кузовной ремонт";
        };


        $scope.clearPlace = function(){
            $scope.chosen = "";
        }

        $scope.getFilter = function() {
            $http.post($rootScope.url + 'getcarwashbyall', {
                services: $scope.checkedService,
                vid: $scope.vid,
                cars: $scope.checkedCars,
                chosenPlace: $scope.chosen || {
                    FormattedAddress: "Israel",
                    Latitude: 31.046051,
                    Longitude: 34.85161199999993,
                    PlaceId: "ChIJi8mnMiRJABURuiw1EyBCa2o"},
                categories: $scope.checkedCategories,
                carWash: true
            }).success(function (result) {
                $scope.carWash = result;
                console.log(result)
            })
        };

        // dla reytinga
        $scope.max = 5;
        $scope.isReadonly = true;


//poluchau individualnuy stranicu
        $scope.getPageMaster = function (id, name) {
            localStorage.setItem('idMaster', id);
            localStorage.setItem('nameMaster', name);

            if($rootScope.isAuthorization){
                $location.path("/pageMaster");
            }else {
                $location.path("/viewLogin");
            }
        }

    });