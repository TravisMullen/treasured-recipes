'use strict';

function searchViewCtrl( $filter, $state ) {
    var view = this;


    view.gotoRecipes = function go() {
        if ( view.last ) {
            $state.go( 'recipe', { slug : view.last.slug });
        }
    };

    view.gotoRecipe = function gotoId( params ) {
        $state.go( 'recipe', { slug : params.slug });
    }; 



    // destory self on state change request
    view.$onInit = function() { 
        // for `showList`
        view.settings = $state.current.data;

        view.placeholder = 'search recipes';
        view.searchValue = '';
        // 
        // $appCtrl.loadedAssets
        if ( !view.loaded ) {
            $state.go( 'main.loading' );
        }
        // Set a default fieldType
        if ( !view.fieldType ) {
            view.fieldType = 'search';
        }

        view.export()( { title : 'Treasured Recipes.' } );
    };

    view.searchRecipes = function searchFilter( value, index, array ) {
        if ( typeof( view.searchValue ) === 'string' && view.searchValue.length ) {
            if ( value.title && value.title.rendered ) {
                if ( value.title.rendered.toLowerCase().indexOf( view.searchValue.toLowerCase() ) >= 0 ) {
                    return true;
                }
            }
        // if no valid search, check settings for showList
        } else if ( view.settings && view.settings.showList ) {
            return true;
        }
    };

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

            css : [ { 
                href : 'assets/css/searchView/searchView.css',
                preload : true,
                persist : true 
            } ],
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
                'content' : {
                    templateUrl : 'searchView/views/contentView.html'
                }
            },

            data : {
                showList : false,
                classList : [ 'search-view' ]
            }
        })
        .state( 'search.list', {
            url : '/list',
            css : [ { 
                href : 'assets/css/searchView/searchView.css',
                preload : true,
                persist : true 
            } ],
            data : {
                showList : true
            }
        });
}


searchViewConfig.$inject = [ '$stateProvider' ];

angular.module( 'TreasuredRecipesApp.searchView', [
    'ngAnimate',
    'ui.router',
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

        export : '&', 

        recipes : '=',
        last : '=',
        stateChange : '=?',
        loaded : '='

        // searchValue : '=',
        // searchRecipes : '=',

        // gotoRecipes : '&'

    }
});