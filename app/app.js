'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngCookies',
    'myApp.firstPage',
    'myApp.registrationClient',
    'myApp.registrationMaster',
    'myApp.registrationAdvertising',
    'myApp.viewLogin',
    'myApp.officeClient',
    'myApp.officeMaster',
    'myApp.commentsView',
    'myApp.masterView',
    'myApp.carWashView',
    'myApp.mountingView',
    'myApp.towTruckView',
    'myApp.tenderView',
    'myApp.pageTender',
    'myApp.pageMaster',

    'angular.filter'
]).
    config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/firstPage'});
    }])
    .run(function ($rootScope, $cookieStore) {
        $rootScope.Name = $cookieStore.get('Name');
        $rootScope.Id = $cookieStore.get('Id');
        $rootScope.isAuthorization = $cookieStore.get('isAuthorization');
        $rootScope.Person = $cookieStore.get('Person');
    })
    .controller("MainCtrl", function ($scope, $rootScope, $cookieStore, $location) {
        $scope.logOut = function () {
            $cookieStore.put('isAuthorization', false);
            $cookieStore.remove('Name');
            $cookieStore.remove('Id');
            $cookieStore.remove('Person');


            $rootScope.isAuthorization = $cookieStore.get('isAuthorization');
            $rootScope.Name = "";
            $rootScope.Id = "";
            $rootScope.Person = "";

        }
        $scope.getOffice = function () {

            if($rootScope.Person == "client"){
                $location.path("/officeClient");

            }else if($rootScope.Person == "master")
            $location.path("/officeMaster");
        }
    });