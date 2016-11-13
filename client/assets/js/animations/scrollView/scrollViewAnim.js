// http://embed.plnkr.co/0r7GdM91jU2NWsqPtruh/
/* jshint: global translateY */
'use strict';

angular.module( 'TreasuredRecipesApp.animations', [ 'ngAnimate' ] )
    .animation( '.recipe-button', [ '$animateCss', function( $animateCss ) {
        console.log( '.scroll-animation loaded!' );
        return {
            enter : function( element, doneFn ) {
                var height = element[ 0 ].offsetHeight;
                console.log( 'enter height', height );
                return $animateCss( element, {
                    applyClassesEarly : true,
                    event : 'enter',
                    structural : true,
                    addClass : 'border-red',
                    // easing : 'ease-out',
                    from : { 'height' : '0px'  },
                    to : { 'height' : height + 'px' },
                    // from : { transform : 'translateY( -' + height + 'px )' },
                    // to : { transform : 'translateY( 0px )'  },
                    stagger : true
                    // event: 'enter',
                    // stagger : 800,
                    // duration : 3
                    // duration : 1 // one second
                });
            }//,

            // move : function( element, doneFn ) {
            //     var height = element[ 0 ].offsetHeight;
            //     console.log( 'enter height', height );
            //     return $animateCss( element, {
            //         applyClassesEarly : true,
            //         event : 'enter',
            //         structural : true,
            //         addClass : 'border-blue'//,
            //         // easing : 'ease-out',
            //         // from : { 'margin-top' : '-' + height + 'px'  },
            //         // to : { 'margin-top' : '0px' },
            //         // from : { transform : 'translateY( -' + height + 'px )' },
            //         // to : { transform : 'translateY( 0px )'  },
                    
            //         // event: 'enter',
            //         // stagger : 800,
            //         // duration : 3
            //         // duration : 1 // one second
            //     });
            // },

            // leave : function( element, doneFn ) {
            //     var width = element[ 0 ].offsetWidth;
            //     console.log( 'leave width', width );
            //     var anim = $animateCss( element, {
            //         applyClassesEarly : true,
            //         event : 'enter',
            //         structural : true,
            //         addClass : 'border-red',
            //         // addClass : 'pulse-twice border-red',
            //         // addClass : 'enter pulse-twice',
            //         // event: 'enter',
            //         // easing : 'ease-out',
            //         // from : { 'margin-top' : '0px'  },
            //         // to : { 'margin-top' : height + 'px' },
            //         // to : { transform : 'translateY( '+ width + 'px )' },
            //         // duration : 3
            //         // duration : 1 // one second
            //     }).start();

            //     anim.then( function() {
            //         // element.remove();
            //         console.log("complete!");
            //         // doneFn();
            //     });

            //     return anim;
            // }
        }
    } ] );

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

