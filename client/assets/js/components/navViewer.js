'use strict';
angular.module( 'TreasuredRecipesApp.components' )
    .directive( 'actionNav', function() {
        return {
            restrict : 'E',
            templateUrl : 'views/partials/nav.html'
        };
    });
