'use strict';
// http://angular-tips.com/blog/2014/06/introduction-to-unit-test-directives/
describe('Image Preloader `preloader` Directive', function() {

    var compile,
        scope,
        $win,
        styleElm,
        backgroundImageURL,
        directiveElem;

        function getBgUrl(el, win) {
            var prop,
                style = win.getComputedStyle(el);

            prop = style.backgroundImage || style['background-image']; // try and get inline style

            return prop.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
        }
        function parseBgUrl(styleRule) {
            return styleRule.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
        }
    beforeEach(module('TreasuredRecipesApp'));
    beforeEach(inject(function($compile, $rootScope) {
        // var $window = $window.getComputedStyle,
        //     style = document.createElement('style'),
        //     textnode; // Create a <li> node
        backgroundImageURL = '\.\/build\/assets\/images\/treasured-recipes-background-hi-res.jpg';
        // textnode = document.createTextNode('.has-image { color: red; background: transparent url(\'' + backgroundImageURL + '\') no-repeat 0 0; } '); // Create a text node

        // style.appendChild(textnode);
        // console.log("style",style);
        // document.querySelector('body').appendChild(style);
        // console.log("document.querySelector('body').innerHTML", document.querySelector('body').innerHTML);
        compile = $compile;
        scope = $rootScope.$new();

    }));

    describe('when has image as a background', function() {
        var element,
            url;
        beforeEach(function() {
            console.log("backgroundImageURL", backgroundImageURL);
        });
        it('should be an img or have an image insade of it.', function() {
            // var temp = document.querySelector('.has-image').innerHTML;
            // var temp = document.querySelector('[preloader]').innerHTML;

            // console.log("temp",temp);

            // directiveElem = compile(angular.element('<div class="has-image" style="color: red; background: transparent url(\'' + backgroundImageURL + '\') no-repeat 0 0;" preloader><h1>Hello World</h1></div>'))(scope);
            directiveElem = compile(angular.element('<style>.has-image { color: red; background: transparent url(\'' + backgroundImageURL + '\') no-repeat 0 0; } </style><div class="has-image" height="420" preloader><h1>Hello World</h1></div>'))(scope);
            scope.$digest();
            var elm = directiveElem.isolateScope();
            console.log("elm",elm.getImageURL());            
            console.log("directiveElem.find('img')",directiveElem);
            expect(parseBgUrl( directiveElem.css('backgroundImage') )).not.toBe(backgroundImageURL);
            expect(directiveElem.css('color')).toBe('red');
        });
    //     it('should be an ', function() {
    //         expect(parseBgUrl( directiveElem.css('backgroundImage') )).toBe(backgroundImageURL);
    //         console.log("scope",scope);
    //         console.log("scope.getImageURL",scope.getImageURL());
    //         expect(directiveElem.css('color')).toBe('red');
    //     });
    //     it('should get image and expose it as getImageURL.', function() {
    //         expect(parseBgUrl( directiveElem.css('backgroundImage') )).toBe(backgroundImageURL);
    //         console.log("scope",scope);
    //         console.log("scope.getImageURL",scope.getImageURL());
    //         expect(directiveElem.css('color')).toBe('red');
    //     });
    });

    describe('when has image is an element', function() {

    });
});
