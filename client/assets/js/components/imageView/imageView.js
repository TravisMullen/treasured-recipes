'use strict';


function imageViewCtrl( AttachmentService ) {
    var view = this;
    console.log( 'view.aid', view.aid );
    console.log( 'view.source', view.source );
    AttachmentService.getAttachmentsByRecipe( view.aid ).then( function( res ) {
    	console.log( 'res.length', res.length );
        view.attachs = res;
    });
}

imageViewCtrl.$inject = [ 'AttachmentService' ];

angular.module( 'TreasuredRecipesApp.imageView', [
	
    // 'TreasuredRecipesApp.AttachmentService',

    'TreasuredRecipesApp.templates'
] )
.config( [ '$stateProvider', function( $stateProvider ) {
    $stateProvider
        .state( 'image', {

            parent : 'recipe',
            url : '/image/:iid',

            data : {
                classList : [ 'image-view' ]
            },

            views : {
            //     // 'header' : {
            //     //     templateUrl : 'partials/interior/header.html'
            //     // },
            //     'main' : {
            //         template : '<recipe-view class="grid-block align-center" set-slug-main="$mainCtrl.setSlug" recipe="$resolve.recipe" attachments="$resolve.attachments"></recipe-view>'
            //     },
                'alt' : {
                    // pass in action nav component to parent level of template
                    template : '<image-view></image-view>'
                }
            }
        });
} ] )
.component( 'imageView', {
    templateUrl : 'imageView/imageView.html',
    controller : imageViewCtrl,
    bindings : {
        featured : '<',
        source : '@',
        aid : '<'
    }
});