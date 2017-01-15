'use strict';

angular.module( 'TreasuredRecipesApp.animations', [ 'ngAnimate' ] );
// Declare app level module which depends on views, and components
angular.module( 'TreasuredRecipesApp', [
    
    'app.settings',

    'ui.router',

    'TreasuredRecipesApp.icons',

    'TreasuredRecipesApp.animations',

    'TreasuredRecipesApp.mainView',

    'TreasuredRecipesApp.searchView',
    'TreasuredRecipesApp.recipeView',

    'TreasuredRecipesApp.actionNav',
    'TreasuredRecipesApp.attachmentsView',
    'TreasuredRecipesApp.imageView',
    // 
    'TreasuredRecipesApp.stateClass',

    'TreasuredRecipesApp.version'

] ).
config( [ '$locationProvider', '$urlRouterProvider', '$cssProvider', function( $locationProvider, $urlProvider, $cssProvider ) {
    $locationProvider.hashPrefix( '!' );

    $locationProvider.html5Mode({
        enabled : false,
        requireBase : false
    });

    $urlProvider.otherwise( '/catalog/loading' );

    angular.extend( $cssProvider.defaults, {
        container : 'head',
        method : 'append',
        persist : true,
        preload : false,
        bustCache : false
    });
} ] );
