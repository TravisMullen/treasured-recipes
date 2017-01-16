'use strict';
// set view
// 
function recipeViewCtrl( $state, $stateParams, RecipeService ) {
    var view = this;

    // AnimateScrollService.run( '.stage', '[ng-click="print(document)"]' ).then( function( res ) {

    // });

    // view.$onInit = function() {
        // console.log( '$onInit slug!', view.recipe.slug );
        var count = [];

        if ( view.load && view.load.src ) {
            angular.forEach( view.load.src, function( value ) {
                this.push( value );
            }, count );
        }

        // all asset will call the same callback
        function callbackOnLast( value ){

            // remove it on complete
            count.splice( count.indexOf( value ), 1 );
            // console.log( 'callbackOnLast', value );
            // none left
            if ( count.length === 0 ) {

                // assets are all loaded...
                view.recipeAssetsLoaded = true;

                // goto next route
                // if ( view.slug ) {
                //     $state.go( 'recipe', { slug : view.slug });
                // } else {
                //     $state.go( 'search' );
                // }
            }
        }
        view.complete = callbackOnLast;
    // };
   // destory self on state change request
    view.$onInit = function() {
        if ( !view.assets ) {
            // console.log( 'goto preloading view' );
            if ( typeof( view.slug ) ) {
                view.slug(); // init cb to set slug
            }
        //     // } else 
        //     //     console.log("view.loaded",view.loaded);
            $state.go( 'main.loading' );
        }
    };

    // view.$onDestroy = function() {
    //     // console.log( '$onDestroy' );
    //     // AnimateScrollService.cancel();
    //     RecipeService.unset();
    // };

    // add some stuff to the view
    // 
    view.print = function( document ) {
        return window.print( document );
    };

    view.labels = {
        ingredients : 'Ingredients',
        instructions : 'Cooking Instructions'
    };

} // end of // recipeViewCtrl

recipeViewCtrl.$inject = [ '$state', '$stateParams', 'RecipeService' ];

angular.module( 'TreasuredRecipesApp.recipeView', [

    'ui.router',

    'ngAnimate',
    'TreasuredRecipesApp.animations',


    'TreasuredRecipesApp.RecipeService',
    'TreasuredRecipesApp.AttachmentService',
    // 'TreasuredRecipesApp.AnimateScroll',
    'TreasuredRecipesApp.templates'
] )

.config( [ '$stateProvider', function( $stateProvider ) {
    $stateProvider
        .state( 'recipe', {

            parent : 'main',
            url : '/recipe/:slug',

            // controller : 'recipeViewCtrl',
            // controllerAs : '$recipeCtrl',

            resolve : {
                recipe : function( RecipeService, $stateParams ) {
                    return RecipeService.get( $stateParams.slug );
                },
                next : function( RecipeService, AttachmentService, $stateParams ) {
                    return RecipeService.get( $stateParams.slug ).then( function( res ) {
                        var nextQ = RecipeService.next( res.slug );
                        // todo: mmove this to service
                        // nextQ.then( function( next ) {
                        //     // preload attachments
                        //     AttachmentService.getAttachmentsByRecipe( next.id );
                        // });
                        // then return it
                        return nextQ;
                    });
                },
                prev : function( RecipeService, AttachmentService, $stateParams ) {
                    return RecipeService.get( $stateParams.slug ).then( function( res ) {
                        var prevQ = RecipeService.prev( res.slug );
                        // prevQ.then( function( prev ) {
                        //     // preload attachments
                        //     AttachmentService.getAttachmentsByRecipe( prev.id );
                        // });
                        // then return it
                        return prevQ;
                    });
                },
                //,

                preload : [ '$q', '$timeout', function( $q, $timeout ) {
                    var deferred = $q.defer();
                    // $timeout( function() {
                    deferred.resolve({
                        src : [
                            '/assets/images/recipe-pad-background-top.png',
                            '/assets/images/recipe-pad-background-top-cap.png',
                            '/assets/images/recipe-pad-background-bottom.png',
                            '/assets/images/recipe-pad-background-middle.png',
                            '/assets/images/recipe-pad-background-bottom-tip.png',
                            '/assets/images/recipe-pad-background-bottom-cap.png'
                        ]
                    });
                    // }, 1000 );
                    return deferred.promise;
                } ]
            },

            data : {
                classList : [ 'recipe-view' ]
            },

            views : {
                // 'header' : {
                //     templateUrl : 'partials/interior/header.html'
                // },
                'content' : {
                    css : [ { 
                        href : 'assets/css/recipeView/recipeView.css',
                        preload : true,
                        persist : true 
                    } ],
                    template : '<recipe-view class="grid-block align-center" load="$resolve.preload" assets="$appCtrl.loadedAssets" recipe="$resolve.recipe" slug="$appCtrl.setslug( { slug: $resolve.recipe.slug } )"></recipe-view>'
                },
                'alt' : {
                    // pass in action nav component to parent level of template
                    template : '<action-nav state-change="$appCtrl.stateChange" next="$resolve.next" prev="$resolve.prev"></action-nav>'
                }
            }
        });
} ] )

.component( 'recipeView', {
    templateUrl : 'recipeView/recipeView.html',
    controller : recipeViewCtrl,
    // replace : true,
    bindings : {
        recipe : '=',
        slug : '&?',
        load : '=?',
        assets : '='
    }
});