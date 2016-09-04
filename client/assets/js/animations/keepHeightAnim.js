'use strict';
angular.module('application.components')
    .animation('.keepheight', ['$animateCss', function($animateCss) {
        console.log("keepheight loaded");
        return {
            enter: function(element, done) {
                console.log("keep-height", element);
                element.css('display', 'none');
                // $(element).fadeIn(1000, function() {
                //     done();
                // });
                var height = element[0].offsetHeight;
                return $animateCss(element, {
                    addClass: 'hl hell0-world',
                    easing: 'ease-out',
                    from: { height: '0px' }, // remove px?
                    to: { height: height + 'px' },
                    duration: 1 // one second
                });
            },
            leave: function(element, done) {
                console.log("keep-height", element);
                // var h = element.css('height');
                // console.log("h", h);
                element.css('display', 'none');
                // $(element).fadeOut(1000, function() {
                //     done();
                // });
            },
            move: function(element, done) {
                console.log("keep-height", element);
                element.css('display', 'none');
                // $(element).slideDown(500, function() {
                //     done();
                // });
            }
        }
    }]);
