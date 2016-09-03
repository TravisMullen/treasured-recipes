'use strict';
angular.module( 'application.components' )
    .directive( 'actionNav', function() {
        return {
            restrict : 'E',
            templateUrl : 'views/partials/nav.html'
        };
    });
