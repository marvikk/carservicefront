/**
 * Created by Liza on 9/12/2016.
 */
'use strict';

angular.module('myApp.tenderView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/tenderView', {
            templateUrl: 'view/tenderView/tenderView.html',
            controller: 'TenderViewCtrl'
        });
    }])

    .controller('TenderViewCtrl', function($scope, $http, $rootScope, $location) {

        $scope.tender = {};
        $scope.services = listOfServices;
        $scope.client = [];
        $scope.tenders = [];

        var url = $rootScope.url+"api/clients/" + $rootScope.Id;
        $http.get(url).success(function(data){
            console.log(data)
            $scope.client = data;
        });

        /*var url1 = "http://localhost:3000/services";
        $http.get(url1)
            .success(function(data){
                $scope.services = data;
            })*/

        $scope.tender.idUser = $rootScope.Id;
        $scope.tender.userName =  $rootScope.Name;
        var url2 = $rootScope.url+"api/tenders";
        $scope.addTender = function(){
            $http.post(url2, $scope.tender).success(function(data){
                console.log($scope.tender)
            })
        }
        $http.get(url2).success(function(data){
            $scope.tenders = data;
        });
        $scope.getPageTender = function (id) {
            localStorage.setItem('idTender', id);
            //localStorage.setItem('nameMaster', name);

            if($rootScope.isAuthorization){
                $location.path("/pageTender");
            }else {
                $location.path("/viewLogin");
            }
        }

    });