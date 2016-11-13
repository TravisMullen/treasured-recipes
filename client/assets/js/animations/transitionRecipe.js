// // // myModule.animation('.slide', ['$animateCss', function($animateCss) {
// // //   return {
// // //     enter: function(element) {
// // //       return $animateCss(element, {
// // //         event: 'enter',
// // //         structural: true,
// // //         addClass: 'maroon-setting',
// // //         from: { height:0 },
// // //         to: { height: 200 } // get rendered hieght
// // //       });
// // //     }
// // //   }
// // // }]);
// angular.module( 'TreasuredRecipesApp.animations', [ 'ngAnimate' ] )
//     .animation( '.fold-animation', [ '$animateCss', function( $animateCss ) {
//         return {
//             enter : function( element, doneFn ) {
//                 var height = element[ 0 ].offsetHeight;
//                 return $animateCss( element, {
//                     addClass : 'red large-text pulse-twice',
//                     easing : 'ease-out',
//                     from : { height : '0px' },
//                     to : { height : height + 'px' },
//                     duration : 1 // one second
//                 });
//             }
//         }
//     } ] );

// // // Since we're adding/removing CSS classes then the CSS transition will also pick those up:

// // // /* since a hardcoded duration value of 1 was provided in the JavaScript animation code,
// // // the CSS classes below will be transitioned despite them being defined as regular CSS classes */
// // // .red { background:red; }
// // // .large-text { font-size:20px; }

// // //  we can also use a keyframe animation and $animateCss will make it work alongside the transition 
// // // .pulse-twice {
// // //   animation: 0.5s pulse linear 2;
// // //   -webkit-animation: 0.5s pulse linear 2;
// // // }

// // // @keyframes pulse {
// // //   from { transform: scale(0.5); }
// // //   to { transform: scale(1.5); }
// // // }

// // // @-webkit-keyframes pulse {
// // //   from { -webkit-transform: scale(0.5); }
// // //   to { -webkit-transform: scale(1.5); }
// // // }


// // angular.module( 'TreasuredRecipesApp.animations', [ 'ngAnimate' ] )
// //     .animation( '.keep-heigt', [ '$animateCss', '$window', function( $animateCss, $window ) {
// //         'use strict';

// //         console.log( 'keepheight loaded' );
// //         var lastElm;
// //         return {
// //             enter : function( element, done ) {
// //                 var anim,
// //                     lastHeight = '100vh';
// //                 if ( lastElm ) {
// //                     lastHeight = lastElm;
// //                 }
// //                 console.log( 'lastHeight', lastHeight );
// //                 anim = $animateCss( element, {
// //                     event : 'recipe-enter',
// //                     structural : true,
// //                     stagger : 800,
// //                     // stagger: 1,
// //                     // removeClass: 'scroll-leave',
// //                     // addClass: 'scroll-enter',
// //                     easing : 'ease-out',
// //                     // from: { height: lastHeight }, // remove px?
// //                     // to: { height: 'auto' },
// //                     duration : 2 // one second
// //                 });
// //                 console.log( 'enter: keep-height', $window.getComputedStyle( element[ 0 ] ).height );
// //                 // lastElm = $window.getComputedStyle(element[0]).height;
// //                 // lastElm = element;
// //                 // element.css('display', 'none');
// //                 // $(element).fadeIn(1000, function() {
// //                 //     done();
// //                 // });
// //                 // console.log("element.style.height",element.style.height);
// //                 // console.log("height",height);
// //                 // 
// //                 return anim;
// //             },
// //             leave : function( element, done ) {
// //                 console.log( 'leave: keep-height', $window.getComputedStyle( element[ 0 ] ).height );
// //                 lastElm = $window.getComputedStyle( element[ 0 ] ).height;
// //                 // return $animateCss(element, {
// //                 //     event: 'recipe-leave',
// //                 //     structural: true,
// //                 //     // height: lastElm,
// //                 //     // from: { height: lastHeight }, // remove px?
// //                 //     // to: { height: 'auto' }//,
// //                 //     // duration: 1 // one second
// //                 // });
// //                 done();
// //             }
// //             // move: function(element, done) {
// //             //     console.log("keep-height", element);
// //             //     element.css('display', 'none');
// //             //     // $(element).slideDown(500, function() {
// //             //     //     done();
// //             //     // });
// //             // }
// //         }
// //     } ] )