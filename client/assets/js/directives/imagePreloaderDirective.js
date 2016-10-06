// // http://stackoverflow.com/questions/17884399/image-loaded-event-in-for-ng-src-in-angularjs
// // 
// angular.module( 'TreasuredRecipesApp.components' )
//     .directive( 'preloader', function() {
//         'use strict';
//         // var style; // save it for later
//         return {
//             restrict : 'A',
//             scope : {
//                 preloader : '=',
//                 src : '@'
//             },
//             // replace: true,
//             controller : [ '$scope', '$element', '$state', '$compile', '$window',
//                 function preloaderController( $scope, $element, $state, $compile, $window ) {
//                     var pldr = this, // namespace
//                         settings = $scope.preloader || {},
//                         style,
//                         imageURL = false,
//                         elm = '<img image-loader delay-start="4000" />',
//                         cb;

//                     console.log( 'loading preloader!' );
//                     pldr.loaded = function() {
//                         // if ( typeof($scope.preloader) === 'function') {
//                         $scope.loaded = true;
//                         console.log( 'prelaoder COMPLETE!' );
//                         if ( typeof cb === 'function' ) {
//                             console.log( 'cb', cb );
//                             cb();
//                         }
//                     };

//                     pldr.getImageURL = function() {
//                         console.log( 'from directive URL', imageURL );
//                         return imageURL;
//                     };

//                     if ( $scope.src ) {
//                         $element.bind( 'load', function() {
//                             pldr.loaded();
//                             // this.successfulload = true;
//                         });
//                         $element.attr( 'src', $scope.src );
//                         // } else if (settings.target) {
//                         //     imageURL = getBgUrl( angular.element(document).find(settings.target) );
//                     }

//                     function getBgUrl( el ) {
//                         var prop,
//                             style = $window.getComputedStyle( el );
//                         // for (var i = deep.length - 1; i >= 0; i--) {
//                         prop = style.backgroundImage || style[ 'background-image' ]; // try and get inline style
//                         // if (prop) {
//                         // cl
//                         return prop.replace( /url\(['"]?(.*?)['"]?\)/i, '$1' );
//                         // } else {
//                         // validate this!
//                         // style = $window.getComputedStyle(el.parent()[0]);
//                         // }
//                         // }å
//                     }

//                     function buildLoader() {
//                         console.log( 'building a loeader!' );
//                         // to do make this work
//                         $element.append( elm );
//                         $compile( $element.contents() )( $scope );
//                     }

//                     function checkforBuild( currentName ) {
//                         var elm = $element[ 0 ],
//                             imageClass;
//                         console.log( 'checkforBuild', currentName );
//                         if ( typeof settings === 'object' ) {
//                             console.log( 'settings.nextstate', settings.nextstate );

//                             if ( settings.nextstate ) {
//                                 console.log( 'settings.state', settings.nextstate );
//                                 cb = function() {
//                                     $state.go( settings.nextstate );
//                                 };
//                             }

//                             console.log( 'settings.imageClass', settings.imageClass );
//                             if ( settings.imageClass ) {
//                                 elm = $window.document.querySelector( settings.imageClass ) || elm;
//                             }
//                             imageURL = getBgUrl( elm );

//                             if ( settings.activestate && currentName === settings.activestate ) {
//                                 buildLoader();
//                             }
//                         } else if ( typeof settings === 'function' ) {
//                             cb = settings;
//                         }
//                     }


//                     $scope.$watch( function() {
//                         return $state.current.name;
//                     }, function( name ) {
//                         if ( name ) {
//                             console.log( '$watch name', name );
//                             checkforBuild( name );
//                         }
//                     });


//                 }
//             ]
//         };
//     })
//     .directive( 'imageLoader', function( $timeout ) {
//         'use strict';
//         return {
//             require : '^^preloader',
//             restrict : 'A',
//             replace : true,
//             // scope: {
//             //     delayStart: '=',
//             // },
//             // transclude: true,
//             template : '<img alt="{{alt}}" class="off-screen-preloader" />',
//             link : function( scope, element, attrs, preloaderCtrl ) {
//                 var loaded = false;

//                 console.log( 'loaded imageLoader' );
//                 console.log( 'preloaderCtrl', preloaderCtrl );
//                 if ( typeof( preloaderCtrl ) === 'undefined' ||
//                     typeof( preloaderCtrl.getImageURL ) !== 'function' ||
//                     typeof( preloaderCtrl.loaded ) !== 'function' ) {
//                     // element.remove();
//                     return;
//                 }


//                 // bind load even and set source
//                 element.bind( 'load', function() {
//                     loaded = true;
//                     preloaderCtrl.loaded();
//                     // element.remove();
//                 });
//                 scope.alt = 'loading... ' + preloaderCtrl.getImageURL();
//                 console.log( 'scope.alt', scope.alt );
//                 element.attr( 'src', scope.alt );
//             }
//         };

//     })
//     // .directive("imageViewer", function() {
//     //     return {
//     //         // require: '^^preloader',
//     //         restrict: 'A',
//     //         replace: true,
//     //         template: '<img ng-hide="successfulload" alt="checking image." class="off-screen-preloader" />',
//     //         link: function(scope, element, attrs, preloaderCtrl) {
//     //             element.attr('src', preloaderCtrl.getImageURL());
//     //             element.bind('load', function() {
//     //                 preloaderCtrl.loaded();
//     //                 scope.successfulload = true;
//     //             });
//     //         }
//     //     };

// // })
// ;
