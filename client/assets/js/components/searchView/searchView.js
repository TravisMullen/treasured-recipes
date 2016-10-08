'use strict';

function searchViewConfig( $stateProvider ) {
    $stateProvider
        .state( 'search', {

            parent : 'main',
            url : '/search',

            controller : 'SearchViewCtrl',
            controllerAs : '$ctrl',

            resolve : {
                recipes : function( recipeService, $stateParams ) {
                    return recipeService.recipes( $stateParams.slug );
                },
                last : function( recipeService, $stateParams ) {
                    return recipeService.last();
                },
                delay : function( $q, $timeout ) {
                    var deferred = $q.defer();
                    $timeout( function() {
                        deferred.resolve({ hello : 'loaded!'});
                    }, 1000 );
                    return deferred.promise;
                }
            },
            
            views : {
                'main' : {
                    templateUrl : 'searchView/searchView.html'
                }
            },

            data : {
                classList : [ 'search-view' ]
            }
        })
        .state( 'search.list', {
            url : '/list',
            data : {
                showList : true
            }
        });
}

angular.module( 'TreasuredRecipesApp.searchView', [
    'ui.router',
    'TreasuredRecipesApp.recipeService',
    'TreasuredRecipesApp.templates'
] )

.config( [ '$stateProvider', searchViewConfig ] )



.controller( 'SearchViewCtrl', [
    '$state',
    '$filter',
    // from $resolve
    'last',
    function( $state, $filter, last ) {
        var view = this;
        view.showList = $state.current.data ?
            $state.current.data.showList :
            false;

        view.searchValue = '';

        view.gotoRecipes = function() {
            $state.go( 'recipe', { slug : last.slug });
        };

        // view.$on('$viewContentLoaded',
        //     function(event) {
        //         console.log("EVERYTHING IS LOADED~!!");
        //         console.log("$state.current.data.classList",$state.current.data.classList);
        //     });

        view.searchRecipes = function( recipes ) {
            if ( view.searchValue && view.searchValue !== '' ) {
                console.log( 'view.searchValue', view.searchValue );
                return $filter( 'search' )( recipes, view.searchValue );
            }
        };
    }
] );

// searchViewConfig.$inject = [ '$stateProvider' ];
