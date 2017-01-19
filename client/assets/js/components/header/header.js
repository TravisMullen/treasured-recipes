'use strict';

// function headerCtrl() {
//     var view = this;
//     console.log("view.state",view.state);
//      // = true;
// }

// headerCtrl.$inject = [ '$scope' ];

angular.module( 'TreasuredRecipesApp.header', [
    'TreasuredRecipesApp.templates'
] )

.animation( '.header-scroll-down', [ '$animateCss', function( $animateCss ) {
    return {
        enter : function( element, done ) {
            var offsetHeight = element[ 0 ].offsetHeight,
                runner,
                animation = $animateCss( element, {
                    event : 'enter',
                    cleanupStyles : true,
                    structural : true,
                    delay : true,
                    addClass : 'crop',
                    from : { height : 0 },
                    to : { height :  offsetHeight + 'px' }
                });

            animation.start().done( function( res ) {
                done();
            });
        },
        leave : function( element, done ) {
            var offsetHeight = element[ 0 ].offsetHeight,
                runner,
                animation = $animateCss( element, {
                    event : 'leave',
                    structural : true,
                    delay : true
                });
            animation.start().done( function( res ) {
                done();
            });
        }
    }
} ] )


// .config( [ '$stateProvider', function( $stateProvider ) {
//     $stateProvider
//         .state( 'header', {

//             parent : 'main',
//             abstract: true,
//             // url : '/recipe/:slug',

//             // controller : 'recipeViewCtrl',
//             // controllerAs : '$recipeCtrl',

//             resolve : {
//                 recipe : function( $stateParams ) {
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
    // controller : headerCtrl,
    bindings : {
        info : '=',
        state: '='
    }
});