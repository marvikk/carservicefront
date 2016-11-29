'use strict';

angular.module('myApp.registrationMaster', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/registrationMaster', {
    templateUrl: 'view/registrationMaster/registrationMaster.html',
    controller: 'RegistrationMasterCtrl'
  });
}])


.controller('RegistrationMasterCtrl', function($scope, $http, $location) {
        $scope.gPlace;
        $scope.master = {};
        $scope.cars = [];
        $scope.arrayCarsM = [];
        $scope.services = [];
        $scope.arrayService = [];
        $scope.masterAuth = {};

//add cars
        var url = "http://casco.cmios.ru/api/cars?callback=JSON_CALLBACK";
        $http.jsonp(url)
        .success(function(data){
                $scope.cars = data;
                console.log($scope.master)
            });

       $scope.addItem = function(item){
           $scope.arrayCarsM.push(item);
           $scope.master.cars = $scope.arrayCarsM;
       }
         $scope.removeItem = function(x){
            $scope.arrayCarsM.splice(x, 1);
        }
//add Services
        var url1 = "http://localhost:3000/services";
        $http.get(url1)
            .success(function(data){
                $scope.services = data;
            })

        $scope.addService = function(item){
            $scope.arrayService.push(item);
            $scope.master.services = $scope.arrayService;
        }
        $scope.removeService = function(x){
            $scope.arrayService.splice(x, 1);
        }
//addImg
        $scope.addImg = function(item1){
            $scope.master.logo = item1;
        }
//add Categories

      //TODO




        $scope.masterAuth.password = "54321";
        $scope.masterAuth.role = "master";

         $scope.addMaster = function() {
             var url4 = "http://localhost:3001/api/authentic";
             var url3 = "http://localhost:3001/api/masters";
             $http.post(url3, $scope.master).success(function (response) {
                 $scope.masterAuth.idUser = response.id;
                 $http.post(url4, $scope.masterAuth).success(function (response) {
                 });
             });

             $location.path("/viewLogin");
         };

})
    .directive('googleplace', function() {
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
            link: function(scope, element, attrs, model) {
              //  alert('dir');
                var options = {
                    types: [],
                    componentRestrictions: {country: 'il'}
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
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