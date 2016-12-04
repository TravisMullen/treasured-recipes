'use strict';

function actionNavCtrl( $timeout, AnimateScroll ) {
    var view = this;
    $timeout( function() {
        view.showNav = true;
    }, 30 );

    view.$onDestroy = function() {
        console.log( 'actionNavCtrl $onDestroy' );
    };
}

actionNavCtrl.$inject = [ '$timeout', 'AnimateScrollService' ];

angular.module( 'TreasuredRecipesApp.actionNav', [
    
    'TreasuredRecipesApp.AnimateScroll',

    'TreasuredRecipesApp.templates'
] )

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