// angular.module( 'TreasuredRecipesApp.animations', [ 'ngAnimate' ] )
//     .animation( '.keep-heigt', [ '$animateCss', '$window', function( $animateCss, $window ) {
//         'use strict';

//         console.log( 'keepheight loaded' );
//         var lastElm;
//         return {
//             enter : function( element, done ) {
//                 var anim,
//                     lastHeight = '100vh';
//                 if ( lastElm ) {
//                     lastHeight = lastElm;
//                 }
//                 console.log( 'lastHeight', lastHeight );
//                 anim = $animateCss( element, {
//                     event : 'recipe-enter',
//                     structural : true,
//                     stagger : 800,
//                     // stagger: 1,
//                     // removeClass: 'scroll-leave',
//                     // addClass: 'scroll-enter',
//                     easing : 'ease-out',
//                     // from: { height: lastHeight }, // remove px?
//                     // to: { height: 'auto' },
//                     duration : 2 // one second
//                 });
//                 console.log( 'enter: keep-height', $window.getComputedStyle( element[ 0 ] ).height );
//                 // lastElm = $window.getComputedStyle(element[0]).height;
//                 // lastElm = element;
//                 // element.css('display', 'none');
//                 // $(element).fadeIn(1000, function() {
//                 //     done();
//                 // });
//                 // console.log("element.style.height",element.style.height);
//                 // console.log("height",height);
//                 // 
//                 return anim;
//             },
//             leave : function( element, done ) {
//                 console.log( 'leave: keep-height', $window.getComputedStyle( element[ 0 ] ).height );
//                 lastElm = $window.getComputedStyle( element[ 0 ] ).height;
//                 // return $animateCss(element, {
//                 //     event: 'recipe-leave',
//                 //     structural: true,
//                 //     // height: lastElm,
//                 //     // from: { height: lastHeight }, // remove px?
//                 //     // to: { height: 'auto' }//,
//                 //     // duration: 1 // one second
//                 // });
//                 done();
//             }
//             // move: function(element, done) {
//             //     console.log("keep-height", element);
//             //     element.css('display', 'none');
//             //     // $(element).slideDown(500, function() {
//             //     //     done();
//             //     // });
//             // }
//         }
//     } ] )
// // .animation('.keep-height', function() {
// //   return {
// //     enter: function(element, done) {
// //       element.css('display', 'none');
// //       $(element).fadeIn(1000, function() {
// //         done();
// //       });
// //     },
// //     leave: function(element, done) {
// //       $(element).fadeOut(1000, function() {
// //         done();
// //       });
// //     },
// //     move: function(element, done) {
// //       element.css('display', 'none');
// //       $(element).slideDown(500, function() {
// //         done();
// //       });
// //     }
// //   }
// // })
// ;