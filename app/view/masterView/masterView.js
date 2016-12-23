/**
 * Created by Liza on 9/12/2016.
 */
'use strict';

angular.module('myApp.masterView', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/masterView', {
            templateUrl: 'view/masterView/masterView.html',
            controller: 'MasterViewCtrl'
        });
    }])

    .controller('MasterViewCtrl', function ($scope, $http, $location, $rootScope) {
        $scope.mechanics = [];
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

        var url = $rootScope.url + "api/carmanufacturerapi";
        $http.get(url)
            .success(function(data){
                $scope.cars = data;
            });

        $http.get($rootScope.url +'api/masters').success(function (response) {
            for(var x in response){
                if(response[x].mechanics === true){
                    $scope.mechanics.push(response[x]);
                }
            }
            console.log($scope.mechanics);

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
            $scope.checkedCategories =  "passCar";
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
            $http.post($rootScope.url+ "getmechanicsbyall", {
                services: $scope.checkedService,
                vid: $scope.vid,
                cars: $scope.checkedCars,
                chosenPlace: $scope.chosen || {
                    FormattedAddress: "Israel",
                    Latitude: 31.046051,
                    Longitude: 34.85161199999993,
                    PlaceId: "ChIJi8mnMiRJABURuiw1EyBCa2o"},
                categories: $scope.checkedCategories,
                mechanics: true
            }).success(function (result) {
                $scope.mechanics = result;
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

