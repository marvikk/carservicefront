/**
 * Created by Liza on 9/12/2016.
 */
'use strict';

angular.module('myApp.commentsView', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/commentsView', {
            templateUrl: 'view/commentsView/commentsView.html',
            controller: 'CommentsViewCtrl'
        });
    }])

    .controller('CommentsViewCtrl', function ($scope, $http, $rootScope) {

        $scope.mechanics = [];
        $scope.carWash = [];
        $scope.mounting = [];
        $scope.towTruck = [];


        $http.get('http://localhost:3001/api/masters').success(function (response) {
            for(var x in response){
                if(response[x].mechanics === true){
                    $scope.mechanics.push(response[x]);
                }
            }
            console.log($scope.mechanics);
        });
        $http.get('http://localhost:3001/api/masters').success(function (response) {
            for(var x in response){
                if(response[x].mounting === true){
                    $scope.mounting.push(response[x]);
                }
            }
            console.log($scope.mounting);
        });
        $http.get('http://localhost:3001/api/masters').success(function (response) {
            for(var x in response){
                if(response[x].towTruck === true){
                    $scope.towTruck.push(response[x]);
                }
            }
            console.log($scope.towTruck);
        });
        $http.get('http://localhost:3001/api/masters').success(function (response) {
            for(var x in response){
                if(response[x].carWash === true){
                    $scope.carWash.push(response[x]);
                }
            }
            console.log($scope.carWash);
        });

        $scope.commentsAll = [];
        $http.get('http://localhost:3001/api/comments').success(function (response) {
            $scope.commentsAll = response;
        });
        $scope.max = 5;

        $scope.choiceCompany = function(data){
            $scope.id = data;

            $scope.rates = [];
            $scope.comments = [];
            var url2 = "http://localhost:3001/getcomments";
            $http.post(url2, {id: data.toString()}).
                success(function(data) {
                    $scope.comments = data;

                })

        }

    });


