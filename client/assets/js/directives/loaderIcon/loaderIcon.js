'use strict';

angular.module( 'TreasuredRecipesApp.icons', [] )

    .directive( 'loaderIcon', function() {
        return {
            templateUrl : 'loaderIcon/loaderIcon.html'
        };
    });
