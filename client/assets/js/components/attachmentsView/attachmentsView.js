'use strict';


function attachmentsViewCtrl( AttachmentService ) {
    var view = this,
        count = [];

    view.$onInit = function() {
        view.attachs = [];
        AttachmentService.getAttachmentsByRecipe( view.aid ).then( function( res ) {
            if ( res && res.length ) {
                view.attachs = res;
                count = res.slice( 0 );
            }
        });
    };

    // all asset will call the same callback
    function callbackOnLast( src ){
        // remove it on complete
        count.splice( 0, 1 );
        // console.log( 'src', src );
        // none left
        if ( count.length === 0 ) {
            // console.log( 'last!', src );
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
    
    css : [ {
        href : 'assets/css/attachmentsView/attachmentsView.css',
        preload : true,
        persist : true
    }, {
        href : 'assets/css/attachmentsView/imageAttactments.css',
        preload : true,
        persist : true
    } ],

    // css : [ 
    //     'assets/css/attachmentsView/attachmentsView.css', 
    //     'assets/css/attachmentsView/imageAttactments.css' 
    // ],
    bindings : {
        featured : '<',
        source : '@',
        aid : '<'
    }
});