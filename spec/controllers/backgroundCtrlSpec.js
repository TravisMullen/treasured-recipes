'use strict';
describe( 'backgroundCtrl', function() {

    beforeEach( module( 'TreasuredRecipesApp' ) );

    var $controller, $scope;

    beforeEach( inject( function( _$controller_, _$rootScope_ ) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $scope = _$rootScope_;
        $controller = _$controller_;
    }) );

    describe( 'on init', function() {
        var controller,
            scope;

        beforeEach( function() {
            scope = $scope;
            controller = $controller( 'backgroundCtrl', { $scope : scope });
        });

        it( 'should be defined', function() {
            expect( controller ).toBeDefined();
        });

        it( 'should set a source URL on the image namespace', function() {
            scope.$digest();
            expect( scope.img.src ).toBeDefined();
        });

    });
  describe( 'should set a callback for next state once loaded', function() {
        var controller,
            scope,
            $state;

        beforeEach( function() {
            scope = $scope;
            $state = {
                go : function() {
                    return 'called!';
                }
            };
            controller = $controller( 'backgroundCtrl', { 
                $scope : scope,
                $state : $state
            });
            spyOn( $state, 'go' );
        });

        it( 'as `complete`', function() {
            expect( scope.complete ).toBeDefined();
        });

        it( 'compelte should call `$state` change of `go`', function() {
            expect( $state.go ).not.toHaveBeenCalled();
            scope.$digest();
            scope.complete();
            expect( $state.go ).toHaveBeenCalled();
        });

    });
});
