'use strict';


function imageViewCtrl( $state ) {
    var view = this;

    view.closeModal = function( evt ) {
        evt.stopPropagation(); // for nested ng-clicks
        $state.go( '^' );
    };
}

imageViewCtrl.$inject = [ '$state' ];

angular.module( 'TreasuredRecipesApp.imageView', [
	
    'ui.router',

    'TreasuredRecipesApp.AttachmentService',

    'TreasuredRecipesApp.templates'
] )
.config( [ '$stateProvider', function( $stateProvider ) {
    $stateProvider
        .state( 'image', {

            parent : 'recipe',
            url : '/image/:imgid',

            data : {
                classList : [ 'image-view' ]
            },
            css : {
                href : 'assets/css/imageView/imageView.css',
                preload : true,
                persist : true
            },
            resolve : {
                assetURL : [ '$stateParams', 'AttachmentService', function( $stateParams, AttachmentService ) {
                    return AttachmentService.getById( $stateParams.imgid );
                } ]
            },
            views : {
                'imagestage@main' : {
                    // pass in action nav component to parent level of template
                    template : '<image-view source="$resolve.assetURL"></image-view>'
                }
            }
        });
} ] )
.component( 'imageView', {
    templateUrl : 'imageView/imageView.html',
    controller : imageViewCtrl,
    bindings : {
        image : '=source'
    }
});
