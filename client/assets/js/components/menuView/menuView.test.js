'use strict';

describe('TreasuredRecipesApp.menuView module', function() {

    beforeEach(module('TreasuredRecipesApp.menuView'));

    describe('MenuView controller', function() {

        it('should be valid', inject(function($controller) {
            //spec body
            var MenuViewCtrl = $controller('MenuViewCtrl');
            expect(MenuViewCtrl).toBeDefined();
        }));

        // it('should have list of recipes', inject(function($controller) {
        //     //spec body
        //     var MenuViewCtrl = $controller('MenuViewCtrl');
        //     expect(MenuViewCtrl).toBeDefined();
        // }));

        // it('should have recipe link', inject(function($controller) {
        //     //spec body
        //     var MenuViewCtrl = $controller('MenuViewCtrl');
        //     expect(MenuViewCtrl).toBeDefined();
        // }));
    });
});
