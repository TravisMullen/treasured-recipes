// http://embed.plnkr.co/0r7GdM91jU2NWsqPtruh/
/* jshint: global translateY */
'use strict';

// angular.module( 'TreasuredRecipesApp.animations' )
//     .animation( '.scroll-view', [ '$animateCss', function( $animateCss ) {
// //         console.log( '.scroll-animation loaded!' );
//         return {
//             enter : function( element, doneFn ) {
//                 var height = element[ 0 ].offsetHeight;
//                 console.log( 'element.parent()', element.parent() );
//                 // document.querySelector(selectors);
//                 // 


//                 return $animateCss( element, {
//                     // applyClassesEarly : true,
//                     // event : 'enter',
//                     // structural : true,
//                     // addClass : 'border-red'
//                     // easing : 'ease-out',
//                     // from : { 'top' : '-'+height + 'px' },
//                     // to : { 'top' : '0px'  }
//                     from : { transform : 'translateY( - ' + height + 'px )' },
//                     to : { transform : 'translateY( 0px )'  }
//                     // stagger : true
//                     // event: 'enter',
//                     // stagger : 800,
//                     // duration : 3
//                     // duration : 1 // one second
//                 });
//                 // return doneFn;
//             },

// //         //     move : function( element, doneFn ) {
// //         //         return doneFn;
// //         //     },

//             leave : function( element, doneFn ) {
//                 var height = element[ 0 ].offsetHeight;
//                 return $animateCss( element, {
//                     // applyClassesEarly : true,
//                     // event : 'enter',
//                     // structural : true,
//                     // addClass : 'border-red'
//                     // easing : 'ease-out',
//                     // from : {  'top' : '0px'  },
//                     // to : { 'top' : height + 'px' }
//                     from : { transform : 'translateY( 0px )'  },
//                     to : { transform : 'translateY( ' + height + 'px )' }
//                     // stagger : true
//                     // event: 'enter',
//                     // stagger : 800,
//                     // duration : 3
//                     // duration : 1 // one second
//                 });
//             }
//         }
//     } ] );

// // Since we're adding/removing CSS classes then the CSS transition will also pick those up:

// // /* since a hardcoded duration value of 1 was provided in the JavaScript animation code,
// // the CSS classes below will be transitioned despite them being defined as regular CSS classes */
// // .red { background:red; }
// // .large-text { font-size:20px; }

// //  we can also use a keyframe animation and $animateCss will make it work alongside the transition 
// // .pulse-twice {
// //   animation: 0.5s pulse linear 2;
// //   -webkit-animation: 0.5s pulse linear 2;
// // }

// // @keyframes pulse {
// //   from { transform: scale(0.5); }
// //   to { transform: scale(1.5); }
// // }

// // @-webkit-keyframes pulse {
// //   from { -webkit-transform: scale(0.5); }
// //   to { -webkit-transform: scale(1.5); }
// // }

