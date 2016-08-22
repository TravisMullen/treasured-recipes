'use strict';
angular.module('application.components')
    .directive('familyRecipe', function() {
        return {
        	scope: {
			  // test: 'hello',
			  ingredients: '=',
			  recipe: '=item'
			},
            restrict: 'E',
            templateUrl: 'views/partials/single-recipe.html'
        };
    });
