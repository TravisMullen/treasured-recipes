'use strict';
// set view

angular.module( 'TreasuredRecipesApp.recipeView', [
    'ui.router',
    'TreasuredRecipesApp.recipeService',
    'TreasuredRecipesApp.attachmentService',
    'TreasuredRecipesApp.animateScroll',
    'TreasuredRecipesApp.templates'
] )

.config( [ '$stateProvider', function( $stateProvider ) {
    $stateProvider
        .state( 'recipe', {

            parent : 'main',
            url : '/recipe/:slug',

            controller : 'recipeViewCtrl',
            controllerAs : '$ctrl',

            resolve : {
                recipe : function( recipeService, $stateParams ) {
                    return recipeService.get( $stateParams.slug );
                },
                attachments : function( recipeService, attachmentService, $stateParams ) {
                    return recipeService.get( $stateParams.slug ).then( function( current ) {
                        return attachmentService.getAttachmentsByRecipe( current.id );
                    })
                },
                next : function( recipeService, attachmentService, $stateParams ) {
                    return recipeService.get( $stateParams.slug ).then( function( res ) {
                        var nextQ = recipeService.next( res.slug );
                        // todo: mmove this to service
                        nextQ.then( function( next ) {
                            // preload attachments
                            attachmentService.getAttachmentsByRecipe( next.id );
                        });
                        // then return it
                        return nextQ;
                    });
                },
                prev : function( recipeService, attachmentService, $stateParams ) {
                    return recipeService.get( $stateParams.slug ).then( function( res ) {
                        var prevQ = recipeService.prev( res.slug );
                        prevQ.then( function( prev ) {
                            // preload attachments
                            attachmentService.getAttachmentsByRecipe( prev.id );
                        });
                        // then return it
                        return prevQ;
                    });
                },
                last : function( recipeService, $stateParams ) {
                    return recipeService.last();
                }
            },

            data : {
                classList : [ 'recipe-view' ]
            },

            views : {
                // 'header' : {
                //     templateUrl : 'partials/interior/header.html'
                // },
                'main' : {
                    templateUrl : 'recipeView/recipeView.html'
                },
                'alt' : {
                    // pass in action nav component to parent level of template
                    template : '<action-nav next="$resolve.next" prev="$resolve.prev"></action-nav>'
                }
            }
        });
} ] )

.controller( 'recipeViewCtrl', [
    '$state',
    '$stateParams',
    // from $resolve
    'recipe',
    'last',
    // from service
    'AnimateScrollService',
    function( $state, $stateParams, recipe, last, animateScroll ) {

        // set controllerAs
        var view = this;
        // 
        // if no slug goto, last recipe
        if ( !recipe.id ) {
            if ( last.slug ) {
                $state.go( 'recipe', { slug : last.slug });
            } else {
                $state.go( '404' );
            }
        }


        animateScroll.run( '.stage', '[ng-click="print(document)"]' ).then( function( res ) {
            if ( res ) {
                console.log( 'animation complete!' );
                $scope.animateScrollComplete = true;
            }
        });

        view.$on( '$destroy', function() {
            animateScroll.cancel();
        });

        // add some stuff to the view
        // 
        view.print = window.print;

        view.labels = {
            ingredients : 'Ingredients',
            instructions : 'Cooking Instructions'
        }

    }
] );
