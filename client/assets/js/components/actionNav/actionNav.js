'use strict';

function actionNavCtrl( $timeout ) {
    var view = this;

    view.$onInit = function() {
        // view.showNav = true;
        $timeout( function() {
            view.showNav = true;
            console.log( 'show action nav!', view.showNav );
        }, 2000 );
    };
    view.$onDestroy = function() {
        view.showNav = false;
        console.log( 'hide action nav!', view.showNav );
    };
}

actionNavCtrl.$inject = [ '$timeout' ];

angular.module( 'TreasuredRecipesApp.actionNav', [
    'TreasuredRecipesApp.templates'
] )
// .animation( '.menu-scroll', [ '$animateCss', function( $animateCss ) {
//     return {
//         enter : function( element, done ) {
//             var offsetHeight = element[ 0 ].offsetHeight,
//                 animation = $animateCss( element, {
//                     event : 'enter',
//                     cleanupStyles : true,
//                     structural : true,
//                     delay : true,

//                     from : { height : 0 },
//                     to : { height :  offsetHeight + 'px' }
//                 });

//             animation.start().done( function( res ) {
//                 done();
//             });
//         },
//         leave : function( element, done ) {
//             var offsetHeight = element[ 0 ].offsetHeight,
//                 animation = $animateCss( element, {
//                     event : 'enter',
//                     cleanupStyles : true,
//                     structural : true,
//                     delay : true,
                    
//                     to : { height : 0 },
//                     from : { height :  offsetHeight + 'px' }
//                 });

//             animation.start().done( function( res ) {
//                 done();
//             });
//         }
//     }
// } ] )
.component( 'actionNav', {
    templateUrl : 'actionNav/actionNav.html',
    css : [ { 
        href : 'assets/css/actionNav/actionNav.css',
        preload : true,
        persist : true 
    } ],
    controller : actionNavCtrl,
    bindings : {
        next : '<',
        prev : '<',
        stateChange : '=?'
    }
});