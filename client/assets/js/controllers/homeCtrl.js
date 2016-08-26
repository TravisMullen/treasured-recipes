// info: http://foundation.zurb.com/apps/docs/#!/angular
'use strict';
angular.module('application.controllers')
    .controller('homeCtrl', homeCtrl);


function homeCtrl($scope, $state, $filter, recipeService) {
	$scope.searchValue = '';
    $scope.gotoRecipes = function() {
        recipeService.last().then(function(res) {
            $state.go('recipe',{ slug: res.slug });
        });
    };
    $scope.searchRecipes = function (recipes) { 
    	console.log("item",recipes);
    	if ($scope.searchValue && $scope.searchValue !== '') {
        	console.log("$scope.searchValue",$scope.searchValue); 
	    	return $filter('search')(recipes, $scope.searchValue);
	    }
	};
    recipeService.recipes().then(function(results) {
        $scope.recipes = results;
    });
}

homeCtrl.$inject = ['$scope', '$state', '$filter','recipeService'];