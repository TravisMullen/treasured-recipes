'use strict';
describe('Image Preloader', function() {

    var compile, 
    	scope, 
    	directiveElem;


    function getCompiledElement() {
        var element = angular.element('<div first-directive></div>');
        var compiledElement = compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }

    beforeEach(module('TreasuredRecipesApp'));
    beforeEach(inject(function($compile, $rootScope) {
        compile = $compile;
        scope = $rootScope.$new();
    });

	describe('Image Preloader', function() {

	});

});
