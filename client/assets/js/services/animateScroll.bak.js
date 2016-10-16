// 'use strict';
// angular.module( 'TreasuredRecipesApp.AnimateScroll', [] )
//     .factory( 'AnimateScrollService', [ '$q', '$timeout', '$interval',
//         function( $q, $timeout, $interval ) {

//             var service = {},

//                 runTime = 0,

//                 // promises
//                 animationDeffered,
//                 queueAnim,

//                 stagger = 0, // ms / to be from background styles -
//                 // $window.getComputedStyle( staggerTarget );
//                 pixelDistance = 14,
//                 animationSpeed = 33.367, // 29.997 framer per second

//                 topMargin = 20,
//                 bufferArea = 2,

//                 lastTop,

//                 // hold instaances in memeory
//                 animateScroll,
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
//                         moveScroller()
//                     } else {
//                         lastTop = anchor.top;
//                         // console.log( 'runTime', runTime );
//                         $timeout( function( argument ) {
//                             console.log( 'autoscroll complete!' );
//                             animationDeffered.resolve( 'complete' );
//                         }, animationSpeed );
//                         runTime = 0;
//                     }
//                 }, animationSpeed );

//                 return animationDeffered.promise;
//             }

//             // anchorElm - element that measured
//             // 
//             // scrollElm - element to have the scroll applied if its not the body

//             function animateScrollPosition( init ) {
//                 var anchorElm,
//                     isInit = !!init;

//                     console.log( 'isInit', isInit ); 

//                 if ( isInit && animateScroll === undefined ) {
//                     queueAnim = $q.defer();
//                     anchorElm = targetToView.getBoundingClientRect();

//                     // ANIMATE SCROLL TO TITLE
//                     // if if target if off screen by more than buffer, then scroll to it
//                     if ( anchorElm.top < -( anchorElm.height + topMargin ) ) {
//                         $timeout( function() {
//                             // deferred.resolve(t);
//                             var t = moveScroller().then( function( data ) {
//                                 queueAnim.resolve( data );
//                                 animateScroll = undefined;
//                             });
//                         }, stagger ); // use: wait for ng-enter/ng-leave to complete
//                     }
//                 }

//                 return queueAnim.promise;
//             }

//             function getElements( scrollTarget, stageTarget ) {
//                 var target = scrollTarget;
//                 stageView = typeof( stageTarget ) === 'string' ? document.querySelector( stageTarget ) : document.querySelector( 'body' );
//                 targetToView = document.querySelector( scrollTarget );
//                 console.log( 'targetToView', targetToView );
//                 console.log( 'targetToView.id', targetToView.id );
//                 console.log( 'targetToView.$id', targetToView.$id );
//                 return animateScrollPosition( target );
//             }

//             function cancelScroll() {
//                 return $interval.cancel( animateScroll );
//             }

//             // service
//             // 
//             service.run = getElements;
//             service.scroll = animateScrollPosition;
//             service.cancel = cancelScroll;

//             service.listen = function() {
//                 var def = $q.defer();


//                 if ( queueAnim && animateScroll ) {
//                     queueAnim.then( function( res ) {
//                         def.resolve( res );
//                     });
//                 } else {
//                     def.resolve( null );
//                 }
//                 return def.promise;
//             };

//             return service;

//         }
//     ] );
