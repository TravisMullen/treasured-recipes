'use strict';

function notFoundConfig( $stateProvider ) {
    $stateProvider
        .state( '404', {

            parent : 'main',
            url : '/not-found',

            controller : 'notFoundCtrl',
            controllerAs : '$ctrl',

            resolve : {
                last : function( recipeService, $stateParams ) {
                    return recipeService.last();
                }
            },

            views : {
                'main' : {
                    templateUrl : 'notFound/notFound.html'
                }
            },

            data : {
                classList : [ 'notfound-view' ]
            }
        });
}

angular.module( 'TreasuredRecipesApp.notFound', [
    'ui.router',
    'TreasuredRecipesApp.recipeService',
    'TreasuredRecipesApp.templates'
] )

.config( [ '$stateProvider', notFoundConfig ] )



.controller( 'notFoundCtrl', [
    '$state',
    '$filter',
    // from $resolve
    'last',
    function( $state, $filter, last ) {
        var view = this;
        view.gotoRecipes = function() {
            $state.go( 'recipe', { slug : last.slug });
        };
    }
] );

// notFoundConfig.$inject = [ '$stateProvider' ];
