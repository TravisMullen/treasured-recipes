'use strict';

describe('TreasuredRecipesApp.notFoundView module', function() {

    beforeEach(module('TreasuredRecipesApp.notFoundView'));

    describe('notFoundView controller', function() {

        it('should be valid', inject(function($controller) {
            //spec body
            var notFoundViewCtrl = $controller('notFoundViewCtrl');
            expect(notFoundViewCtrl).toBeDefined();
        }));

        // it('should have list of recipes', inject(function($controller) {
        //     //spec body
        //     var notFoundViewCtrl = $controller('notFoundViewCtrl');
        //     expect(notFoundViewCtrl).toBeDefined();
        // }));

        // it('should have recipe link', inject(function($controller) {
        //     //spec body
        //     var notFoundViewCtrl = $controller('notFoundViewCtrl');
        //     expect(notFoundViewCtrl).toBeDefined();
        // }));
    });
});
