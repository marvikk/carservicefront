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

    .controller('TenderViewCtrl', function($scope, $http, $rootScope, $location, $window) {

        $scope.tender = {};
        $scope.services = listOfServices;
        $scope.client = [];
        $scope.tenders = [];
        $scope.checkedService = [];
        console.log($rootScope.Id)

        var url2 = $rootScope.url + "api/tenders";

        if($rootScope.Person == "client") {
            var url = $rootScope.url + "api/clients/" + $rootScope.Id;
            $http.get(url).success(function (data) {
                console.log(data)
                $scope.client = data;
            });

            console.log($scope.tender);

            //dobaliau service v array
            $scope.toggleService = function (service) {
                if ($scope.checkedService.indexOf(service) === -1) {
                    $scope.checkedService.push(service);
                } else {
                    $scope.checkedService.splice($scope.checkedService.indexOf(service), 1);
                }
                console.log($scope.checkedService)
                $scope.tender.service = $scope.checkedService;
            };


            $scope.tender.idUser = $rootScope.Id;
            $scope.tender.userName = $rootScope.Name;

            $scope.addTender = function () {
                $http.post(url2, $scope.tender).success(function (data) {
                    console.log($scope.tender)
                })
                $window.location.reload();
            }
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