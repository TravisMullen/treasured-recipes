'use strict';

describe('TreasuredRecipesApp.searchView module', function() {

    beforeEach(module('TreasuredRecipesApp.searchView'));

    describe('SearchView controller', function() {

        it('should be valid', inject(function($controller) {
            //spec body
            var SearchViewCtrl = $controller('SearchViewCtrl');
            expect(SearchViewCtrl).toBeDefined();
        }));

        // it('should have list of recipes', inject(function($controller) {
        //     //spec body
        //     var SearchViewCtrl = $controller('SearchViewCtrl');
        //     expect(SearchViewCtrl).toBeDefined();
        // }));

        // it('should have recipe link', inject(function($controller) {
        //     //spec body
        //     var SearchViewCtrl = $controller('SearchViewCtrl');
        //     expect(SearchViewCtrl).toBeDefined();
        // }));
    });
});
