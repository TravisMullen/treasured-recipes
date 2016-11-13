'use strict';

function searchViewCtrl( $filter, $state ) {
    var view = this;
    view.showList = $state.current.data ?
        $state.current.data.showList :
        false;

    console.log( 'searchViewCtrl', searchViewCtrl );
    console.log( 'view.last', view.last );
    view.gotoRecipes = function go() {
        if ( view.last ) {
            $state.go( 'recipe', { slug : view.last.slug });
        }
        // view.resolving = true;
    };

    view.gotoRecipe = function gotoId( params ) {
        // if ( view.last ) {
        console.log( 'gotoRecipe', params.slug );
        $state.go( 'recipe', { slug : params.slug });

        // view.resolving = true;
        // }
    };

    // destory self on state change request
    view.$onInit = function() {
        // console.log( 'searchViewCtrl $onInit', view.loaded );
        view.placeholder = 'Search Recipes!';
        view.searchValue = '';
        if ( !view.loaded ) {
            $state.go( 'main.loading' );
        }
        // Set a default fieldType
        if ( !view.fieldType ) {
            view.fieldType = 'search';
        }
    };

    view.searchRecipes = function search( recipes ) {
        console.log( 'searchRecipes', recipes );
        if ( view.searchValue && view.searchValue !== '' ) {
            console.log( 'view.searchValue', view.searchValue );
            return $filter( 'search' )( recipes, view.searchValue );
        }
    };

    console.log( 'view.testFn', view.testFn );
}

searchViewCtrl.$inject = [ '$filter', '$state' ];

function searchViewConfig( $stateProvider ) {
    $stateProvider
        .state( 'search', {

            parent : 'main',
            url : '/search',
            // abstract :q true,

            // controller: 'searchViewCtrl',
            // controllerAs : '$searchCtrl',

            resolve : {
                recipes : function( RecipeService, $stateParams ) {
                    return RecipeService.recipes( $stateParams.slug );
                },
                last : function( RecipeService, $stateParams ) {
                    return RecipeService.last();
                }//,
                //     // recipes : function( RecipeService, $stateParams ) {
                //     //     return RecipeService.recipes( $stateParams.slug );
                //     // },
                // last : function( RecipeService, $stateParams ) {
                //     return RecipeService.last();
                // }

                //     delay : function( $q, $timeout ) {
                //         var deferred = $q.defer();
                //         $timeout( function() {
                //             deferred.resolve({ hello : 'loaded!'});
                //         }, 1000 );
                //         return deferred.promise;
                //     }
            },

            views : {
                'main' : {
                    template : '<search-view class="grid-block middle" loaded="$mainCtrl.loadedAssets" state-change="$mainCtrl.stateChange" recipes="$resolve.recipes" last="$resolve.last"></search-view>'
                }
            },

            data : {
                showList : false,
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


searchViewConfig.$inject = [ '$stateProvider' ];

angular.module( 'TreasuredRecipesApp.searchView', [
    'ui.router',

    'ngAnimate',
    'TreasuredRecipesApp.animations',
    
    'TreasuredRecipesApp.RecipeService',
    'TreasuredRecipesApp.templates'
] )

.config( [ '$stateProvider', searchViewConfig ] )


.component( 'searchView', {
    templateUrl : 'searchView/searchView.html',
    controller : searchViewCtrl,
    // replace: true,
    bindings : {
        recipes : '=',
        last : '=',
        stateChange : '=?',
        loaded : '='

        // searchValue : '=',
        // searchRecipes : '=',

        // gotoRecipes : '&'

    }
});
// .controller( 'searchViewCtrl', [
//     '$state',
//     '$filter',
//     // from $resolve
//     // 'last',
//     // function( $state, $filter, last ) {
//     function( $state, $filter ) {
//         var view = this;
//         view.showList = $state.current.data ?
//             $state.current.data.showList :
//             false;

//         view.searchValue = '';

//         view.gotoRecipes = function() {
//             $state.go( 'recipe', { slug : last.slug });
//         };
//         console.log( 'searchViewCtrl' );
//         // destory self on state change request

//         // view.$on('$viewContentLoaded',
//         //     function(event) {
//         //         console.log("EVERYTHING IS LOADED~!!");
//         //         console.log("$state.current.data.classList",$state.current.data.classList);
//         //     });

//         view.searchRecipes = function( recipes ) {
//             if ( view.searchValue && view.searchValue !== '' ) {
//                 console.log( 'view.searchValue', view.searchValue );
//                 return $filter( 'search' )( recipes, view.searchValue );
//             }
//         };
//     }
// ] );

// searchViewConfig.$inject = [ '$stateProvider' ];
