// info: http://foundation.zurb.com/apps/docs/#!/angular
'use strict';
angular.module('application.controllers')
    .controller('actionNavCtrl', actionNavCtrl);


function actionNavCtrl($scope, $state, recipeService) {
    $scope.$watchCollection(function() {
        return $state.params;
    }, function(p) {
        // if (p.slug === 'beef-stew') {
        if (p.slug) {
            recipeService.get(p.slug).then(function() {
                recipeService.next(p.slug).then(function(res) {
                    $scope.next = res;
                });
                recipeService.prev(p.slug).then(function(res) {
                    $scope.prev = res;
                });
            });
            $scope.showNav = true;
        } else {
            $scope.showNav = false;
        }
    });
}

actionNavCtrl.$inject = ['$scope', '$state', 'recipeService'];
