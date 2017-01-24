'use strict';

describe( 'TreasuredRecipesApp.mainView module', function() {

    beforeEach( module( 'TreasuredRecipesApp.mainView' ) );

    describe( 'mainView controller', function() {

        it( 'should be valid', inject( function( $controller ) {
            //spec body
            var mainViewCtrl = $controller( 'mainViewCtrl' );
            expect( mainViewCtrl ).toBeDefined();
        }) );

        // it('should have list of recipes', inject(function($controller) {
        //     //spec body
        //     var mainViewCtrl = $controller('mainViewCtrl');
        //     expect(mainViewCtrl).toBeDefined();
        // }));

        // it('should have recipe link', inject(function($controller) {
        //     //spec body
        //     var mainViewCtrl = $controller('mainViewCtrl');
        //     expect(mainViewCtrl).toBeDefined();
        // }));
    });
});
