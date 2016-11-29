/**
 * Created by Liza on 9/12/2016.
 */
'use strict';

angular.module('myApp.firstPage', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/firstPage', {
            templateUrl: 'view/firstPage/firstPage.html',
            controller: 'FirstPageCtrl'
        });
    }])

    .controller('FirstPageCtrl', function($scope, $http, $rootScope, $location, $window) {

        var mapOptions = {
            zoom: 7,
            center: new google.maps.LatLng(31.3000, 34.4500),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.markers = [];

        var infoWindow = new google.maps.InfoWindow();

        var url = 'http://localhost:3001/api/masters';

        $http.get(url).
            success(function(data){
                for (var i = 0; i < data.length; i++){
                    createMarker(data[i]);
                }
            });


        var createMarker = function (info){
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.chosenPlace.Latitude, info.chosenPlace.Longitude),
                title: info.companyName,
                id: info.id,
                address1: info.chosenPlace.FormattedAddress
            });
            marker.content = '<div class="infoWindowContent">' + marker.address1 + '</div>';

            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h4><a id="str">' + marker.title + '</a></h4>' + marker.content);
                infoWindow.open($scope.map, marker);
                if($rootScope.isAuthorization){
                $('#str').click(function() {
                         localStorage.setItem('idMaster',marker.id);
                         localStorage.setItem('nameMaster', marker.title);
                        $window.location.href = "/#!/pageMaster";
                    })
                }else if("undefined"){
                    $window.location.href = "/#!/viewLogin";
                }


            });

            $scope.markers.push(marker);
        };



        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');

        };

    })


