'use strict';


function imageViewCtrl( $state ) {
    var view = this;
    // bind this to external fn
    function close() {
        $state.go( '^' );
    }
    view.close = close;
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
            resolve : {
                assetURL : [ '$stateParams', 'AttachmentService', function( $stateParams, AttachmentService ) {
                    console.log( 'resolve Params.imgid', $stateParams.imgid );
                    return AttachmentService.getAttachmentsByRecipe( $stateParams.imgid );
                } ]
            },
            views : {
                'image-stage' : {
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
        source : '@'
    }
});
