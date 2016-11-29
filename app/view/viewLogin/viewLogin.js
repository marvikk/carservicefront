/**
 * Created by Liza on 9/12/2016.
 */
'use strict';

angular.module('myApp.viewLogin', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/viewLogin', {
            templateUrl: 'view/viewLogin/viewLogin.html',
            controller: 'ViewLoginCtrl'
        });
    }])

    .service('LoginService',function($http, $cookieStore, $rootScope, $location, $window){

        var service = {};
        service.Login = Login;
        return service;


        function Login(email, password){
            $http.get('http://localhost:3001/api/authentic?email='+email).success(function(response){
                if(response[0]){
                    if(response[0].password == password){
                        if(response[0].role =="client") {
                            console.log('Great!!!  you client');
                            $http.get('http://localhost:3001/api/clients/'+response[0].idUser).success(function(data) {
                            $cookieStore.put("Name", data.name);
                            $cookieStore.put("Id", response[0].idUser);
                            $cookieStore.put("isAuthorization", true);
                                $cookieStore.put("Person",response[0].role);
                                $window.location.reload();
                                $location.path("/firstPage");
                            });
                        }else if(response[0].role == "master"){
                            console.log('Great!!!  you master');
                            $http.get('http://localhost:3001/api/masters/'+response[0].idUser).success(function(data) {
                            $cookieStore.put("Name", data.companyName);
                            $cookieStore.put("Id", response[0].idUser);
                            $cookieStore.put("isAuthorization", true);
                                $cookieStore.put("Person", response[0].role);
                                $window.location.reload();
                                $location.path("/firstPage");
                            });
                        }
                    }else{
                        document.getElementById('alert').innerHTML = 'Your enter the wrong password';
                        $cookieStore.put("isAuthorization", false);

                    }
                }else{
                    $location.path("/registrationClient");
                    $cookieStore.put("isAuthorization", false);
                }

            }).error(function(error){
                console.log(error)

            })
        }

    })


    .controller('ViewLoginCtrl', function($scope, $http, $location, LoginService, $rootScope) {

        $scope.authLogin = function(userData){
            LoginService.Login(userData.email, userData.password);

            console.log( $rootScope.userName +' '+$rootScope.userId+ ' '+ $rootScope.isAuthorization )
        }

    });