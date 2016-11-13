
// angular.module( 'TreasuredRecipesApp.animations', [ 'ngAnimate' ] )
//     .animation( '.button-list', [ '$animateCss', function( $animateCss ) {
//         console.log( '.button-list loaded!' );
//         return {
//             enter : function( element, doneFn ) {
//                 var height = element[ 0 ].offsetHeight;
//                 console.log( 'enter height', height );
//                 return $animateCss( element, {
//                     // applyClassesEarly : true,
//                     event : 'enter',
//                     structural : true,
//                     addClass : 'border-red'//,
//                     // easing : 'ease-out',
//                     // from : { 'margin-top' : '-' + height + 'px'  },
//                     // to : { 'margin-top' : '0px' },
//                     // from : { transform : 'translateY( -' + height + 'px )' },
//                     // to : { transform : 'translateY( 0px )'  },
                    
//                     // event: 'enter',
//                     // stagger : 800,
//                     // duration : 3
//                     // duration : 1 // one second
//                 });
//             },

//             leave : function( element, doneFn ) {
//                 var height = element[ 0 ].offsetHeight;
//                 console.log( 'leave height', height );
//                 var anim = $animateCss( element, {
//                     applyClassesEarly : true,
//                     event : 'leave',
//                     structural : true//,
//                     // addClass : 'pulse-twice border-red',
//                     // addClass : 'enter pulse-twice',
//                     // event: 'enter',
//                     // easing : 'ease-out',
//                     // from : { 'margin-top' : '0px'  },
//                     // to : { 'margin-top' : height + 'px' },
//                     // from : { transform : 'translateY( 0px )'  },
//                     // to : { transform : 'translateY( '+ height + 'px )' },
//                     // duration : 3
//                     // duration : 1 // one second
//                 }).start();

//                 anim.then( function() {
//                     element.remove();
//                     doneFn();
//                 });
//             }
//         }
//     } ] );