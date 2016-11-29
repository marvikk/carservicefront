/**
 * Created by Liza on 9/12/2016.
 */
'use strict';

angular.module('myApp.pageMaster', ['ngRoute'])
    //, 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/pageMaster', {
            templateUrl: 'view/pageMaster/pageMaster.html',
            controller: 'PageMasterCtrl'
        });
    }])

    .controller('PageMasterCtrl', function ($scope, $http, $rootScope, $window) {

        $scope.pageMaster = [];

// poluchau avtoservice po id
        var id = localStorage.getItem('idMaster')
        var url = $rootScope.url+'api/masters?id=' + id;
        //localStorage.clear();

        $http.get(url).
            success(function (response) {
            $scope.pageMaster = response;
            console.log($scope.pageMaster);
        });


//sohraniau comment
        $scope.comment = {};

        var url3 = $rootScope.url+'api/comments';
        $scope.saveComment = function(){
            $scope.comment.userName = $rootScope.Name;
            $scope.comment.userId = $rootScope.Id;
            $scope.comment.date = Date.now();
            $scope.comment.masterId = id;
            $scope.comment.masterName = localStorage.getItem('nameMaster')
            $scope.comment.rate = $scope.rate;
            $http.post(url3, $scope.comment).success(function (response) {
               console.log(response);
                $window.location.reload();
            })

        }

//sohraniau reyting
        $scope.max = 5;
        $scope.isReadonly = false;

        $scope.hoveringOver = function (value) {
                $scope.rate = value;
                $scope.isReadonly = true;
        };



        // poluchau kommenty
        // TODO ...
        $scope.comments = [];
        $scope.rates = [];
        var url2 = $rootScope.url+"getcomments";
        console.log(id)
        $http.post(url2, {id: id}).
            success(function(data){
                $scope.comments = data;
                if(data != null) {
                    for (let x in data) {
                        $scope.rates.push(Number(data[x].rate));
                    }
                    console.log($scope.rates)
                    $scope.resultOne = $scope.rates.reduce(function (sum, current) {
                        console.log(sum)
                        return (sum + current);
                    });
                    console.log($scope.resultOne)
                    $scope.result = ($scope.resultOne / $scope.rates.length).toFixed(1);

                    $http.post($rootScope.url+'getrate', {
                        id: id,
                        rate: $scope.result
                    }).success(function (response) {
                        console.log(response);
                    })
                }
            });



        $scope.getTelephone = function(x){
            document.getElementById("telephone").outerHTML = x;
        }


    });