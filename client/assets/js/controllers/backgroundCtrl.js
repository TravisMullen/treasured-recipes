function backgroundCtrl( $scope, $state ) {
    'use strict';

    $scope.img = {
        src : '/assets/images/treasured-recipes-background-hi-res.jpg'
    };

    $scope.complete = function() {
        console.log( 'complete!' );
        $state.go( 'main.search.list' );
    };
}

angular.module( 'TreasuredRecipesApp.controllers' )
    .controller( 'backgroundCtrl', backgroundCtrl );

backgroundCtrl.$inject = [ '$scope', '$state' ];
