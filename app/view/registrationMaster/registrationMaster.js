'use strict';

angular.module('myApp.registrationMaster', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/registrationMaster', {
            templateUrl: 'view/registrationMaster/registrationMaster.html',
            controller: 'RegistrationMasterCtrl'
        });
    }])


    .controller('RegistrationMasterCtrl', function ($scope, $http, $location, $rootScope) {
        $scope.gPlace;
        $scope.master = {};
        $scope.cars = [];
        $scope.arrayCarsM = [];
        $scope.services = listOfServices;
        console.log(listOfServices);
        $scope.masterAuth = {};


        //add cars
        var url = $rootScope.url + "api/carmanufacturerapi";
        $http.get(url)
            .success(function (data) {
                $scope.cars = data;
                console.log($scope.master);

            });

        $scope.addItem = function (item) {
            $scope.arrayCarsM.push(item);
            $scope.master.cars = $scope.arrayCarsM;
        }
        $scope.removeItem = function (x) {
            $scope.arrayCarsM.splice(x, 1);
        }

//addImg
        $scope.addImg = function (item1) {
            $scope.master.logo = item1;
        }

        function str_rand() {
            var result = '';
            var words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
            var max_position = words.length - 1;
            for (var i = 0; i < 8; ++i) {
                var position = Math.floor(Math.random() * max_position);
                result = result + words.substring(position, position + 1);
            }
            return result;
        }

        $scope.addMaster = function () {
            var url4 = $rootScope.url + "api/authentic";
            var url3 = $rootScope.url + "api/masters";
            $scope.masterAuth.password = str_rand();
            $scope.masterAuth.role = "master";

            $http.post(url3, $scope.master).success(function (response) {
                $scope.masterAuth.idUser = response.id;
                console.log(response.id);
                $http.post(url4, $scope.masterAuth).success(function (response) {
                    $http.post($rootScope.url + "sendmessages",
                        {
                            email: response.email,
                            pass: response.password
                        }).success(function (answer) {

                        })
                });
            });

            $location.path("/viewLogin");
        };

    })
    .directive('googleplace', function () {
        var componentForm = {
            premise: 'long_name',
            street_number: 'short_name',
            route: 'long_name',
            sublocality_level_1: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };
        var mapping = {
            premise: 'BuildingName',
            street_number: 'Unit',
            route: 'Street',
            sublocality_level_1: 'Suburb',
            locality: 'City',
            administrative_area_level_1: 'State',
            country: 'Country',
            postal_code: 'PostCode'
            //Region, District, Level
        };
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, model) {
                //  alert('dir');
                var options = {
                    types: [],
                    componentRestrictions: {country: 'il'}
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                    var place = scope.gPlace.getPlace();
                    var location = place.geometry && place.geometry.location ? {
                        Latitude: place.geometry.location.lat(),
                        Longitude: place.geometry.location.lng()
                    } : {};

                    // Get each component of the address from the place location
                    // and fill the corresponding field on the form.
                    for (var i = 0; i < place.address_components.length; i++) {
                        var addressType = place.address_components[i].types[0];
                        if (componentForm[addressType.FormattedAddress]) {
                            var val = place.address_components[i][componentForm[addressType]];
                            location[mapping[addressType.FormattedAddress]] = val;// dobavila dla kratkosti
                        }
                    }
                    location.FormattedAddress = place.formatted_address;
                    location.PlaceId = place.place_id;

                    scope.$apply(function () {
                        scope.address = location; // array containing each location component
                        model.$setViewValue(location);
                        element.val(location[attrs.value]);
                        // console.log(model);
                    });
                });
            }
        };
    })
//{   "Кузовные работы":{"Аэрография":true,"Полировка":true},
//    "Диагностика и ремонт двигателя":{"Ремонт двигателя":true},
//    "КПП":{"Ремонт МКПП":true},
//    "Электрооборудование":{"Ремонт отопительной системы":true},
//    "Выхлопная система":{"Ремонт катализаторов":true,"Замена глушителей":true}
//}