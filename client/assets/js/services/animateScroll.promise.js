// 'use strict';
// angular.module( 'TreasuredRecipesApp.animateScroll', [] )
//     .factory( 'AnimateScrollService', [ '$q', '$timeout',
//         function( $q, $timeout ) {

//             var service = {},

//                 runTime = 0,

//                 animationDeffered = {},

//                 stagger = 0, // ms / to be from background styles -
//                 // $window.getComputedStyle( staggerTarget );
//                 pixelDistance = 14,
//                 animationSpeed = 33.367, // 29.997 framer per second

//                 topMargin = 20,
//                 bufferArea = 2,

//                 lastTop,

//                 // hold instaances in memeory
//                 animateScroll,
//                 animateStagger,
//                 stageView,
//                 targetToView;

//             function moveScroller() {
//                 var anchor = targetToView.getBoundingClientRect();

//                 // maintain anticipated runtime for sanity
//                 // runTime
//                 runTime += animationSpeed;

//                 animationDeffered = $q.defer();

//                 animateScroll = $timeout( function() {
//                     stageView.scrollTop = ( stageView.scrollTop - Math.round( stageView.scrollTop * 0.01 ) );
//                     if ( anchor.top <= bufferArea ) {
//                         moveScroller();
//                     } else {
//                         lastTop = anchor.top;
//                         console.log( 'runTime', runTime );
//                         animateScroll = $timeout( function( argument ) {
//                             console.log( 'animateScroll complete!!', lastTop );
//                             animationDeffered.resolve();
//                         }, animationSpeed );
//                         runTime = 0;
//                     }
//                 }, animationSpeed );

//                 return animationDeffered.promise;
//             }

//             // anchorElm - element that measured
//             // 
//             // scrollElm - element to have the scroll applied if its not the body

//             function animateScrollPosition() {
//                 var queueAnim,
//                     anchorElm = targetToView.getBoundingClientRect();
//                     // console.log( 'queueAnim instanceof Deferred', queueAnim instanceof Deferred );

//                 // if (queueAnim === undefined) {
//                     queueAnim = $q.defer();
//                     // console.log( 'instanceof queueAnim', typeof( queueAnim ) );
//                     // ANIMATE SCROLL TO TITLE
//                     // if if target if off screen by more than buffer, then scroll to it
//                     if ( anchorElm.top < -( anchorElm.height + topMargin ) ) {
//                         animateStagger = $timeout( function() {
//                             // deferred.resolve(t);
//                             moveScroller().then( function( data ) {
//                                 queueAnim.resolve( data );
//                                 animateScroll = undefined; // reset
//                                 // animationDeffered = undefined;
//                                 // queueAnim = undefined;
//                             });
//                         }, stagger ); // use: wait for ng-enter/ng-leave to complete
//                     }

//                 // }
//                 return queueAnim.promise;
//             }

//             function getElements( scrollTarget, stageTarget ) {
//                 stageView = typeof( stageTarget ) === 'string' ? document.querySelector( stageTarget ) : document.querySelector( 'body' );
//                 targetToView = document.querySelector( scrollTarget );
//                 console.log( 'targetToView', targetToView );
//                 console.log( 'targetToView.id', targetToView.id );
//                 console.log( 'targetToView.$id', targetToView.$id );
//                 return animateScrollPosition();
//             }

//             function cancelScroll() {
//                 var stagger;
//                 // let listeners know we've finished so they stop waiting
//                 if ( typeof( animationDeffered.resolve ) === 'function' ) {
//                     animationDeffered.resolve(); 
//                 }

//                 $timeout.cancel( animateStagger ).then( function( success ) {
//                     console.log( 'success', success );
//                     if ( success ) {
//                         console.log( 'animateScroll', animateScroll );
//                         return success;
//                     } else {
//                         // return its own promise here???
//                         return $timeout.cancel( animateScroll );
//                     }
//                 });
//             }

//             // service
//             // 
//             service.run = getElements;
//             service.scroll = animateScrollPosition;
//             // service.listen = animateScrollPosition;
//             service.cancel = cancelScroll;

//             service.listen = function() {
//                 var def = $q.defer(),
//                     promise; // parent animation
//                 if ( animationDeffered && animateScroll ) {
//                     // console.log( 'animationDeffered instanceof Deferred', animationDeffered instanceof Deferred );
//                     promise = animationDeffered.promise;
//                     promise.then( function( res ) {
//                         def.resolve( res );
//                     });
//                 } else {
//                     def.resolve( 'complete' );
//                 }
//                 return def.promise;
//             };

//             return service;

//         }
//     ] );
