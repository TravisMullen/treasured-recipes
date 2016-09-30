angular.module( 'TreasuredRecipesApp.components' )
    .directive( 'actionNav', function() {
        'use strict';
        return {
            restrict : 'E',
            templateUrl : 'views/partials/nav.html'
        };
    });
