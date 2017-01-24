'use strict';


function headerCtrl( $q, $element, $animateCss ) {
    var view = this,
        last = {},
        scrollView = angular.element( document.querySelector( '.stage' ) ),
        targetView = angular.element( document.querySelector( 'header-component' ) );

    view.height = targetView[ 0 ].offsetHeight;
    view.showHeader = true;


    // function headerEnter( element, done ) {
    //     var offsetHeight = element[ 0 ].offsetHeight,
    //         animation = $animateCss( element, {
    //             event : 'header-enter',
    //             cleanupStyles : true,
    //             structural : 'true',
    //             delay : true,
    //             addClass : 'crop',
    //             from : { height : 0 },
    //             to : { height :  offsetHeight + 'px' }
    //         });

    //     animation.start().done( function( res ) {
    //         if ( angular.isFunction( done ) ) {
    //             done();
    //         }
    //     });
    // }

    // function headerExit( element, done ) {
    //     var offsetHeight = element[ 0 ].offsetHeight,
    //         animation = $animateCss( element, {
    //             event : 'header-leave',
    //             cleanupStyles : true,
    //             structural : 'true',
    //             delay : true,
    //             removeClass : 'crop',
    //             to : { height : 0 },
    //             from : { height :  offsetHeight + 'px' }
    //         });

    //     animation.start().done( function( res ) {
    //         if ( angular.isFunction( done ) ) {
    //             done();
    //         }
    //     });
    // }

    scrollView.bind( 'scroll', function( res ) {
        var height,
            top,
            diff,
            header,
            scroller;
        if ( res && res.target ) {
            // if (targetView) {
                height = ( targetView[ 0 ].offsetHeight/2 );
                top = res.target.scrollTop;
                console.log( 'res.', res );
                // last.top = top;
                // last.height = height;
            // }
            // 
            // 
                diff = top - height;


            // retracting
            if ( !view.isMiddle && top > height ) {
                view.isMiddle = true;
            }
            if ( view.isMiddle ) {
                if ( diff <= height ) {
                    view.showHeader = true;
                    // targetView[ 0 ].style.transform = 'translateY(-'+diff+'px)';
                    // targetView[ 0 ].style.transform = 'translateY(-'+diff+'px)';
                } else {
                    view.showHeader = false;
                    // targetView[ 0 ].style.transform = 'translateY('+0+')';
                }
            }
            console.log("view.showHeader",view.showHeader);
            // 
            // 
            // 
            // pull away
            // console.log("top <= height",top <= height);
            // if ( view.showHeader && top > height ) {
            //     view.showHeader = false;
            //     headerEnter( targetView, function() {
            //         console.log( 'retracted!' );
            //     });
            // //     targetView[ 0 ].style.top = (height-top)+'px';
            // //     // targetView[ 0 ].style.transform = 'translateY('+( height-top )+'px)';
            // // // } else if ( top > height ) {
            // // //     targetView[ 0 ].style.height = '-'+height+'px';
            // // } else {
            // //     targetView[ 0 ].style.top = 0;
            // //     // targetView[ 0 ].style.transform = 'translateY(-'+height+'px)';
            // }
            // if ( !view.showHeader && top < height ) {
            //     view.showHeader = true;
            //     headerEnter( targetView, function() {
            //         console.log( 'displayed!' );
            //     });
            // //     targetView[ 0 ].style.top = (height-top)+'px';
            // //     // targetView[ 0 ].style.transform = 'translateY('+( height-top )+'px)';
            // // // } else if ( top > height ) {
            // // //     targetView[ 0 ].style.height = '-'+height+'px';
            // // } else {
            // //     targetView[ 0 ].style.top = 0;
            // //     // targetView[ 0 ].style.transform = 'translateY(-'+height+'px)';
            // }
        }
    });
    // var offsetHeight = element[ 0 ].offsetHeight,
            
            // transform: translateY(rem-calc($scroll-view-height*2));

    // view.$onChanges = function(  ) {
    //     console.log( '$onChanges',  view);
    // }

    view.$doCheck = function() {
        console.log( '$doCheck');
    }
}

headerCtrl.$inject = [ '$q', '$element', '$animateCss' ];

angular.module( 'TreasuredRecipesApp.header', [
    'TreasuredRecipesApp.templates'
] )

.animation( '.header-scroll-down', [ '$animateCss', function( $animateCss ) {
    return {
        enter : function( element, done ) {
            var offsetHeight = element[ 0 ].offsetHeight,
                animation = $animateCss( element, {
                    event : 'enter',
                    cleanupStyles : true,
                    structural : true,
                    delay : true,
                    addClass : 'crop',
                    from : { height : 0 },
                    to : { height :  offsetHeight + 'px' }
                });

            animation.start().done( function( res ) {
                done();
            });
        },
        leave : function( element, done ) {
            var offsetHeight = element[ 0 ].offsetHeight,
                animation = $animateCss( element, {
                    event : 'enter',
                    cleanupStyles : true,
                    structural : true,
                    delay : true,
                    addClass : 'crop',
                    to : { height : 0 },
                    from : { height :  offsetHeight + 'px' }
                });

            animation.start().done( function( res ) {
                done();
            });
        }
    }
} ] )


// .config( [ '$stateProvider', function( $stateProvider ) {
//     $stateProvider
//         .state( 'header', {

//             parent : 'main',
//             abstract: true,
//             // url : '/recipe/:slug',

//             // controller : 'recipeViewCtrl',
//             // controllerAs : '$recipeCtrl',

//             resolve : {
//                 recipe : function( $stateParams ) {
//                     return RecipeService.get( $stateParams.slug );
//                 }
//             }
//         });
// } ] )

.component( 'headerComponent', {
    templateUrl : 'header/header.html',
    css : [ { 
        href : 'assets/css/header/header.css',
        preload : true,
        persist : true 
    } ],
    controller : headerCtrl,
    bindings : {
        info : '=',
        state : '=?'
    }
});