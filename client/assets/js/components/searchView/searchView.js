'use strict';

function searchViewConfig( $stateProvider ) {
    $stateProvider.state( 'search', {
        url : '/search',
        templateUrl : 'searchView/searchView.html',
        controller : 'SearchViewCtrl'
    });
}

angular.module( 'TreasuredRecipesApp.searchView', [ 
        // 'ngRoute',
        'ui.router',
        'TreasuredRecipesApp.recipeService', 
        'TreasuredRecipesApp.templates'
    ] )

.config( [ '$stateProvider', searchViewConfig ]  )



.controller( 'SearchViewCtrl', [
    '$scope', 
    '$state', 
    '$filter', 
    'recipeService',
    function( $scope, $state, $filter, recipeService ) {
        console.log( 'search laoded!' );
        $scope.showList = $state.current.data ?
            $state.current.data.showList :
            false;

        $scope.searchValue = '';

        recipeService.recipes().then( function( results ) {
            $scope.recipes = results;
        });

        $scope.gotoRecipes = function() {
            recipeService.last().then( function( res ) {
                console.log( 'res.slug', res.slug );
                $state.go( 'recipe', { slug : res.slug });
            });
        };

        // $scope.$on('$viewContentLoaded',
        //     function(event) {
        //         console.log("EVERYTHING IS LOADED~!!");
        //         console.log("$state.current.data.classList",$state.current.data.classList);
        //     });

        $scope.searchRecipes = function( recipes ) {
            if ( $scope.searchValue && $scope.searchValue !== '' ) {
                console.log( '$scope.searchValue', $scope.searchValue );
                return $filter( 'search' )( recipes, $scope.searchValue );
            }
        };
    }
] );

// searchViewConfig.$inject = [ '$stateProvider' ];