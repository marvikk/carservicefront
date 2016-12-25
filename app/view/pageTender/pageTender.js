/**
 * Created by Liza on 9/12/2016.
 */
'use strict';

angular.module('myApp.pageTender', ['ngRoute'])
    //, 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/pageTender', {
            templateUrl: 'view/pageTender/pageTender.html',
            controller: 'PageTenderCtrl'
        });
    }])

    .controller('PageTenderCtrl', function ($scope, $http, $rootScope, $location, $window) {

        $scope.pageTender = [];

// poluchau avtoservice po id
        var id = localStorage.getItem('idTender')
        var url = $rootScope.url + "api/tenders/" + id;

        $http.get(url).
            success(function (response) {
                $scope.pageTender = response;
                console.log($scope.pageTender);
            });


//sohraniau comment
        $scope.comment = {};

        var url3 = $rootScope.url + 'commentstender';
        $scope.saveComment = function(){
            $scope.comment.masterName = $rootScope.Name;
            $scope.comment.masterId = $rootScope.Id;
            $scope.comment.date = Date.now();
            $scope.comment.idTender = id;

            $http.post(url3, $scope.comment).success(function (response) {
                console.log(response);
            })
            $window.location.reload();
        }



        // poluchau kommenty
        // TODO ...
        $scope.comments = [];
        var url2 = $rootScope.url + "commentstenders";
        //?idTender="+id;
        $http.post(url2, {id: id}).
            success(function(data){
                $scope.comments = data;
                console.log(data)

            });
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