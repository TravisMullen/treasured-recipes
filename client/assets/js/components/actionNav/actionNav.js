'use strict';

angular.module( 'TreasuredRecipesApp.actionNav', [
    'TreasuredRecipesApp.recipeService',
    'TreasuredRecipesApp.templates'
] )

.component( 'actionNav', {
    templateUrl : 'actionNav/actionNav.html',
    // controller : 'actionNavCtrl',
    bindings : {
        next : '<',
        prev : '<'
    }
}) 

// .controller( 'actionNavCtrl', [
//     '$timeout',
//     function( $timeout ) {
//         var view = this;
        
//         view.showNav = false;
//         $timeout( function() {
//             view.showNav = true;
//         }, 1000 );
//     }
// ] );