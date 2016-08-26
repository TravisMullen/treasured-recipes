// info: http://foundation.zurb.com/apps/docs/#!/angular
'use strict';
angular.module('application.controllers')
    .controller('recipeCtrl', recipeCtrl);


function recipeCtrl($scope, $stateParams, $state, recipeService, attachmentService) {

    // angular.extend(this, $controller('DefaultController', { $scope: $scope, $stateParams: $stateParams, $state: $state }));

    $scope.ingredients = [];
    // $scope.attachments = {}

    if ($stateParams.slug) {
        recipeService.get($stateParams.slug).then(function(recipe) {
            $scope.recipe = recipe;

            attachmentService.getAttachmentsByRecipe($scope.recipe.id).then(function(results) {
                $scope.attachments = results;
            });

            recipeService.next($stateParams.slug).then(function(next) {
                $scope.next = next;
                // preload for next 
                attachmentService.getAttachmentsByRecipe($scope.next.id);

            });
            recipeService.prev($stateParams.slug).then(function(prev) {
                $scope.prev = prev;
                // preload for prev 
                attachmentService.getAttachmentsByRecipe($scope.prev.id);
            });
        },function() {
            // $state.go('recipe',{ slug: undefined });
            $state.go('404');
        });
    } else {
        recipeService.last().then(function(res) {
            $state.go('recipe',{ slug: res.slug });
        });
    }

            // $scope.prev = recipeService.prev();

        
    // $http({
    //     method: 'GET', // read only 
    //     url: 'http://www.treasuredrecipes.info/mullen-family/wp-json/wp/v2/recipe' // path or JSON API or file ('/assets/data/json/example1.json')
    // }).then(function successCallback(response) {
    //     // this callback will be called asynchronously
    //     // when the response is available
    //     console.log("recipeCtrl successCallback :: response", response);

    //     // set to global of `data`
    //     $scope.recipes = filterJSONfromRecipe(response.data);
    //     getRecipe();
    //     console.log("$scope.recipes", $scope.recipes);
    //     // if ($scope.recipes && $scope.recipes.content.rendered) {
    //     //     console.log("$scope.recipes.content.rendered",$scope.recipes.content.rendered);
    //     // }

    // }, function errorCallback(response) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //     console.log("recipeCtrl errorCallback :: ", response);
    //     $scope.error = "No recipes found.";
    // });

    // // function getViewData(collection) {
    // //     for (var i = collection.length - 1; i >= 0; i--) {
    // //         // match id
    // //         if (collection[i].id === $stateParams.id) {
    // //             // if URL value, return it
    // //             if (collection[i].url) {
    // //                 return collection[i].url;
    // //             }
    // //         }
    // //     }
    // // }

    // // $scope.data = { };
    // // 
    // function getRecipe() {
    //     console.log("$stateParams", $stateParams);
    //     console.log("$stateParams.slug", $stateParams.slug);
    //     if ($stateParams.slug) {
    //         // $scope.selected = $stateParams.slug;
    //         $scope.slug = $stateParams.slug;

    //         for (var i = $scope.recipes.length - 1; i >= 0; i--) {
    //             console.log("$scope.recipes[i].slug", $scope.recipes[i].slug);
    //             console.log("$scope.recipes[i].slug === $stateParams.slug", $scope.recipes[i].slug === $stateParams.slug);
    //             if ($scope.recipes[i].slug === $stateParams.slug) {
    //                 $scope.selected = $scope.recipes[i];
    //                 return;
    //             }
    //         }
    //     } else {
    //         // $state.go({ slug:'beef-stew'} );
    //         // $stateParams.slug = 'beef-stew';
    //         $scope.selected = $scope.recipes[$stateParams.slug];
    //     }
    // }

// if ( $(window).scrollTop() >= 42 ) {
//             $('html,body').animate( { scrollTop: 42 } , 400 );
//         }
}

recipeCtrl.$inject = ['$scope', '$stateParams', '$state', 'recipeService', 'attachmentService'];
