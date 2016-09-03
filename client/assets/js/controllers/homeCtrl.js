// info: http://foundation.zurb.com/apps/docs/#!/angular
'use strict';
angular.module( 'application.controllers' )
    .controller( 'homeCtrl', homeCtrl );


function homeCtrl( $scope, $state, $filter, recipeService ) {

    $scope.showList = $state.current.data 
                            ? $state.current.data.showList 
                            : false;
	$scope.searchValue = '';

    recipeService.recipes().then( function( results ) {
        $scope.recipes = results;
    });

    $scope.gotoRecipes = function() {
        recipeService.last().then( function( res ) {
            $state.go( 'recipe', { slug : res.slug });
        });
    };

    // $scope.$on('$viewContentLoaded',
    //     function(event) {
    //         console.log("EVERYTHING IS LOADED~!!");
    //         console.log("$state.current.data.classList",$state.current.data.classList);
    //     });

    $scope.searchRecipes = function ( recipes ) {
    	if ( $scope.searchValue && $scope.searchValue !== '' ) {
        	console.log( '$scope.searchValue', $scope.searchValue ); 
	    	return $filter( 'search' )( recipes, $scope.searchValue );
	    }
	};

}

homeCtrl.$inject = [ '$scope', '$state', '$filter', 'recipeService' ];