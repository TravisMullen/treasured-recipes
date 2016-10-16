'use strict';


function actionNavCtrl( AnimateScroll ) {
    var view = this;
    // console.log("view",view);
    // console.log("view.stateChange",view.stateChange);
    // view.stateChange = true;
    // AnimateScroll.listen().then( function( res ) {
        // console.log("res",res);
        view.showNav = true;
    // });
}

actionNavCtrl.$inject = [ 'AnimateScrollService' ];

angular.module( 'TreasuredRecipesApp.actionNav', [
    
    'TreasuredRecipesApp.AnimateScroll',

    'TreasuredRecipesApp.templates'
] )

.component( 'actionNav', {
    templateUrl : 'actionNav/actionNav.html',
    controller : actionNavCtrl,
    bindings : {
        next : '<',
        prev : '<',
        stateChange: '=?'
    }
});