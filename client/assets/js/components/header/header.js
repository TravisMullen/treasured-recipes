'use strict';

function headerCtrl( $scope, $timeout, RecipeService ) {
    var view = this;
    // $timeout( function() {
    //     view.showHeader = true;
    // }, 30 );

    // view.$onInit = function() {
    //     RecipeService.getSelected().then( function( res ) {
    //         // console.log( 'res', res );
    //         view.recipe = res;
    //     });
    // };
    // 
    // 
    view.$onChanges = function( res ) {
        // $state.current.data
        console.log( '$onChanges', res );
    }
}

headerCtrl.$inject = [ '$scope', '$timeout', 'RecipeService' ];

angular.module( 'TreasuredRecipesApp.header', [
    'TreasuredRecipesApp.templates'
] )

// .config( [ '$stateProvider', function( $stateProvider ) {
//     $stateProvider
//         .state( 'header', {

//             parent : 'main',
//             abstract: true,
//             // url : '/recipe/:slug',

//             // controller : 'recipeViewCtrl',
//             // controllerAs : '$recipeCtrl',

//             resolve : {
//                 recipe : function( RecipeService, $stateParams ) {
//                     return RecipeService.get( $stateParams.slug );
//                 }
//             }
//         });
// } ] )

.component( 'headerComponent', {
    templateUrl : 'header/header.html',
    css : [ { 
        href : 'assets/css/header/header.css',
        preload : true,
        persist : true 
    } ],
    controller : headerCtrl,
    bindings : {
        info : '='
    }
});