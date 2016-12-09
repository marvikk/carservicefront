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

        $http.get(url).
            success(function (response) {
                $scope.pageMaster = response;
                $scope.pageMaster = response;
                $scope.rateAllResponse = response[0].rateAll;
                $scope.amountResponse = response[0].amountComments;
            });

        //sohraniau reyting
        $scope.max = 5;
        $scope.isReadonly = false;

        $scope.hoveringOver = function (value) {
            $scope.rate = value;
            $scope.isReadonly = true;
        };

//sohraniau comment
        $scope.comment = {};

        var url3 = $rootScope.url+'api/comments';

        $scope.saveComment = function(){
            $scope.comment.userName = $rootScope.Name;
            $scope.comment.userId = $rootScope.Id;
            $scope.comment.date = Date.now();
            $scope.comment.masterId = id;
            $scope.comment.masterName = localStorage.getItem('nameMaster')
            $scope.comment.rate = $scope.rate;//oczenka
//sohraniau rate in DB
            $http.post(url3, $scope.comment).success(function (response) {
                console.log(response);
                if($scope.rateAllResponse != null && $scope.amountResponse != null){
                    var rateAll = Number($scope.rateAllResponse) + Number($scope.rate);
                    var amount = Number($scope.amountResponse) + 1;
                }else{
                    rateAll = $scope.rate;
                    amount = 1;
                }
                var rate = rateAll/ amount;
                $http.post( $rootScope.url + 'getrate', {
                    id: id,
                    rate: rate,
                    rateAll: rateAll,
                    amount: amount
                }).success(function (response) {
                    console.log(response);
                })
                $window.location.reload();
            })

        }

        // poluchau kommenty
        // TODO ...
        $scope.comments = [];
        $scope.rates = [];
        var url2 = $rootScope.url+"getcomments";
        console.log(id)
        $http.post(url2, {id: id}).
            success(function(data){
                $scope.comments = data;
            });



        $scope.getTelephone = function(x){
            document.getElementById("telephone").outerHTML = x;
        }


    });