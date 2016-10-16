'use strict';


function attachmentsViewCtrl( AttachmentService ) {
    var view = this,
        count = [],
        attachs = [];
    // console.log( 'view.aid', view.aid );
    // console.log( 'view.source', view.source );
    // view.$onDestroy = function() {
    //     console.log( '$onDestroy' );
    //     attachs = [];
    //     count = [];
    // };
    view.$onInit = function() {
        AttachmentService.getAttachmentsByRecipe( view.aid ).then( function( res ) {
            if ( res && res.length ) {
                view.attachs = res;
                count = res.slice( 0 );
            }
        });
    };
    view.attachs = attachs;

        // all asset will call the same callback
        function callbackOnLast( src ){
            // remove it on complete
            count.splice( 0, 1 );
            console.log( 'src', src );
            // none left
            if ( count.length === 0 ) {
                console.log( 'last!', src );
                // // assets are all loaded...
                view.showImages = true;

                // // goto next route
                // if ( view.slug ) {
                //     $state.go( 'recipe', { slug : view.slug });
                // } else {
                //     $state.go( 'search' );
                // }
            }
        }

    view.showImg = callbackOnLast; 
}

attachmentsViewCtrl.$inject = [ 'AttachmentService' ];

angular.module( 'TreasuredRecipesApp.attachmentsView', [
	
    'TreasuredRecipesApp.AttachmentService',

    'TreasuredRecipesApp.templates'
] )

.component( 'attachmentsView', {
    templateUrl : 'attachmentsView/attachmentsView.html',
    controller : attachmentsViewCtrl,
    bindings : {
        featured : '<',
        source : '@',
        aid : '<'
    }
});