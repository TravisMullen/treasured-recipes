// http://stackoverflow.com/questions/17884399/image-loaded-event-in-for-ng-src-in-angularjs
// 
'use strict';
angular.module('application.components')
    // is this bad perf??
    .directive('stateClass', function($window) {
        return {
            restrict: 'A',
            scope: {
                stateClass: '@'
            },
            controller: ['$scope', '$element', '$state', function stateClassController($scope, $element, $state) {
                var classTarget = $scope.stateClass || 'classList',
                    activeClasses = [];

                $scope.$watch(function() {
                    return $state.current.data;
                }, function(res) {
                    if (res) {
                        if (res[classTarget] && res[classTarget].length) {
                            for (var i = activeClasses.length - 1; i >= 0; i--) {
                                var old = activeClasses[i];
                                $element.removeClass(old);
                            }
                            for (var j = $state.current.data[classTarget].length - 1; j >= 0; j--) {
                                var name = $state.current.data[classTarget][j];
                                activeClasses.push(name);
                                $element.addClass(name);
                            }

                            console.log("activeClasses", activeClasses.length);
                        }
                    }
                });

            }]
        };
    })
    .directive('preloader', function() {
        // var style; // save it for later
        return {
            restrict: 'A',
            scope: {
                preloader: '=',
                src: '@'
            },
            // replace: true,
            controller: ['$scope', '$element', '$state', '$compile', '$window', function preloaderController($scope, $element, $state, $compile, $window) {
                var pldr = this, // namespace
                    settings = $scope.preloader || {},
                    style,
                    imageURL = false,
                    elm = '<img image-loader delay-start="4000" />',
                    cb;


                pldr.loaded = function() {
                    // if ( typeof($scope.preloader) === 'function') {
                    $scope.loaded = true;
                    console.log("prelaoder COMPLETE!");
                    if (typeof cb === 'function') {
                        console.log("cb", cb);
                        cb();
                    }
                };

                pldr.getImageURL = function() {
                    return imageURL;
                };

                if ($scope.src) {
                    $element.bind('load', function() {
                        pldr.loaded();
                        // this.successfulload = true;
                    });
                    $element.attr('src', $scope.src);
                    // } else if (settings.target) {
                    //     imageURL = getBgUrl( angular.element(document).find(settings.target) );
                } 

                function getBgUrl(el) {
                    var prop, 
                        style = $window.getComputedStyle(el),
                        deep = 3;
                    // for (var i = deep.length - 1; i >= 0; i--) {
                        prop = style['background-image']; // try and get inline style
                        // if (prop) {
                        // cl
                            return prop.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
                        // } else {
                            // validate this!
                            // style = $window.getComputedStyle(el.parent()[0]);
                        // }
                    // }å
                }

                function checkforBuild(currentName) {
                    var elm = $element[0],
                        imageClass;
                    console.log("checkforBuild",currentName);
                    if (typeof settings === 'object') {
                        console.log("settings.nextstate", settings.nextstate);
               
                        if (settings.nextstate) {
                            console.log("settings.state", settings.nextstate);
                            cb = function() {
                                $state.go(settings.nextstate);
                            };
                        }

                        console.log("settings.imageClass",settings.imageClass);
                        if (settings.imageClass) {
                            elm = $window.document.querySelector(settings.imageClass) || elm;
                        }
                        imageURL = getBgUrl( elm );
                        console.log("imageURL",imageURL);

                        console.log("settings.activestate && currentName === settings.activestate",settings.activestate && currentName === settings.activestate);
                        if (settings.activestate && currentName === settings.activestate) {
                            buildLoader();
                        }
                    } else if (typeof settings === 'function') {
                        cb = settings;
                    }
                }

                function buildLoader() {
                    console.log("building a loeader!");
                    // to do make this work
                    $element.append(elm);
                    $compile($element.contents())($scope);
                }

                $scope.$watch(function() {
                    return $state.current.name;
                }, function( name ) {
                    if (name) {
                        console.log("$watch name",name);
                        checkforBuild( name );
                    }
                });


            }]
        };
    })
    .directive("imageLoader", function($timeout) {
        return {
            require: '^^preloader',
            restrict: 'A',
            replace: true,
            // scope: {
            //     delayStart: '=',
            // },
            // transclude: true,
            template: '<img alt="{{alt}}" class="off-screen-preloader" />',
            link: function(scope, element, attrs, preloaderCtrl) {
                var loaded = false;

                scope.alt = 'loaded from controller';
                console.log("loaded imageLoader");
                console.log("preloaderCtrl", preloaderCtrl);
                if (typeof(preloaderCtrl) === 'undefined' ||
                    typeof(preloaderCtrl.getImageURL) !== 'function' ||
                    typeof(preloaderCtrl.loaded) !== 'function') {
                    // element.remove();
                    return;
                }


                // bind load even and set source
                element.bind('load', function() {
                    loaded = true;
                    preloaderCtrl.loaded();
                    // element.remove();
                });
                element.attr('src', preloaderCtrl.getImageURL());
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
