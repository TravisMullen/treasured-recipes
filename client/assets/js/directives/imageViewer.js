// http://stackoverflow.com/questions/17884399/image-loaded-event-in-for-ng-src-in-angularjs
// 
'use strict';
angular.module('application.components')
    .directive('preloader', function($window) {
        var style; // save it for later

        function getBgUrl(el) {
            var prop;
            style = $window.getComputedStyle(el);

            prop = style['background-image']; // try and get inline style
            console.log("prop", prop);
            return prop.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
        }

        return {
            restrict: 'A',
            scope: {
                preloader: '=',
                src: '@'
            },
            // replace: true,
            controller: ['$scope', '$element', '$state', '$timeout', function preloaderController($scope, $element, $state, $timeout) {
                var pldr = this, // namespace
                    settings = $scope.preloader || {},
                    imageURL,
                    classes = [],
                    cb,
                    loaded = [];

                $scope.ngClasses = classes;
                // $scope.$on('$viewContentLoaded',
                //     function(event) {
                //         console.log("EVERYTHING IS LOADED~!!");
                //         console.log("$state.current.data.classList",$state.current.data.classList);
   //              //     });
   // $scope.$on('$viewContentLoaded', function(event) {
   //    $timeout(function() {
   //                      console.log("EVERYTHING IS LOADED~!!");
   //      // $scope.formData.value = document.getElementById("loginForm").id;
   //    },0);
   //  });

                $scope.$watch(function() {
                    return $state.current.data;
                }, function(res) {
                    if (!res) { 
                        return;
                    }
                    if (res.classList && res.classList.length) {
                        for (var i = classes.length - 1; i >= 0; i--) {
                        //     classessplice(i, 1);
                            var name = classes[i];
                            $element.removeClass(name);
                        }
                        // classes.forEach(function(className) {
                        //     var name = className;
                        //     console.log("className",name);
                        //     classes.push(name);
                        //     $element.addClass(name);
                        // });
                        for (var i = $state.current.data.classList.length - 1; i >= 0; i--) {
                        //     classessplice(i, 1);
                            var name = $state.current.data.classList[i];
                            classes.push(name);
                            $element.addClass(name);
                        }
                        // $state.current.data.classList.forEach(function(className) {
                        //     var name = className;
                        //     // console.log("className",name);
                        //     $element.addClass(name);
                        //     classes.push(name);
                        // });
                    }
                });

               // if ($state.current.data && $state.current.data.classList) {
                //     $state.current.data.classList.forEach(function() {

                //     });
                // }

                if (typeof settings === 'object') {
                    if (settings.activestate) {
                        // do something
                        // 
                    }
                    if (settings.nextstate) {
                        console.log("settings.state", settings.nextstate);
                        cb = function() {
                            return $state.go(settings.nextstate);
                        };
                    }
                    console.log("$state.current", $state.current);
                    console.log("$state.current.name", $state.current.name);
                    console.log("settings.activestate", settings.activestate);
                    console.log("!settings.activestate || $state.current.name !== settings.activestate", !settings.activestate || $state.current.name !== settings.activestate);
                    if (!settings.activestate || $state.current.name !== settings.activestate) {
                        $element.addClass('bg-load-success');
                        // $scope.
                        console.log("break - not active state");

                        pldr.getImageURL = function() {
                            return false;
                        };
                        return;
                    }
                }

                // $state
                // $state.addClass()

                $scope.loaded = false;
                $element.toggleClass('bg-load-active');

                $scope.$watch('loaded', function(res) {
                    console.log("loaded", res);
                    $element.removeClass('bg-load-active');
                    $element.removeClass('bg-load-fail');
                    $element.removeClass('bg-load-success');
                    if (res === true) {
                        $element.addClass('bg-load-success');
                    } else {
                        $element.addClass('bg-load-fail');
                    }
                });

                pldr.loaded = function() {
                    // if ( typeof($scope.preloader) === 'function') {
                    $scope.loaded = true;
                    console.log("loaded!");
                    if (typeof cb === 'function') {
                        cb();
                    }
                };

                pldr.getImageURL = function() {
                    return imageURL;
                };

                if ($scope.src) {
                    element.attr('src', $scope.src);
                    element.bind('load', function() {
                        preloaderCtrl.loaded();
                        // this.successfulload = true;
                    });
                    // } else if (settings.target) {
                    //     imageURL = getBgUrl( angular.element(document).find(settings.target) );
                } else {
                    // $scope.loaded = false;
                    console.log("$element[0]", $element[0]);
                    imageURL = getBgUrl($element[0]);
                }
            }]
        };
    })
    .directive("imageLoader", function($timeout) {
        return {
            require: '^^preloader',
            restrict: 'A',
            replace: true,
            scope: {
                delayStart: '=',
            },
            // transclude: true,
            template: '<img alt="checking image." class="off-screen-preloader" />',
            link: function(scope, element, attrs, preloaderCtrl) {
                var loaded = false,
                    url,
                    delay = 0;
                console.log("preloaderCtrl", preloaderCtrl);
                console.log("preloaderCtrl.getImageURL", preloaderCtrl.getImageURL);
                // console.log("attrs",attrs);
                // console.log("scope",scope);
                // if no parent controller, remove 
                if (typeof(preloaderCtrl) === 'undefined') {
                    element.remove();
                    return;
                }
                url = preloaderCtrl.getImageURL();
                if (url === false) {
                    element.remove();
                    return;
                }
                // if if delay
                // if (typeof (scope.delayStart) === 'number') {
                //     delay = scope.delayStart;
                //     $timeout(function() {
                //         if (loaded) {
                //             preloaderCtrl.loaded();
                //         }
                //         console.log("fired! scope.delayStart",scope.delayStart);
                //     },delay);
                // }

                // bind load even and set source
                element.bind('load', function() {
                    loaded = true;
                    if (delay === 0) {
                        preloaderCtrl.loaded();
                        element.remove();
                    }
                });
                element.attr('src', url);
            }
        };

    })
    // .directive("imageViewer", function() {
    //     return {
    //         // require: '^^preloader',
    //         restrict: 'A',
    //         replace: true,
    //         template: '<img ng-hide="successfulload" alt="checking image." class="off-screen-preloader" />',
    //         link: function(scope, element, attrs, preloaderCtrl) {
    //             element.attr('src', preloaderCtrl.getImageURL());
    //             element.bind('load', function() {
    //                 preloaderCtrl.loaded();
    //                 scope.successfulload = true;
    //             });
    //         }
    //     };

// })
;
