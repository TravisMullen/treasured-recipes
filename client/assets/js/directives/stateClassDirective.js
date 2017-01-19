// http://stackoverflow.com/questions/17884399/image-loaded-event-in-for-ng-src-in-angularjs
// 
'use strict';
angular.module( 'TreasuredRecipesApp.stateClass', [] )
    // is this bad perf??
    .directive( 'stateClass', function( $window ) {
        return {
            restrict : 'A',
            scope : {
                stateClass : '='
            },
            controllerAs: '$stateCtrl',
            controller : [ '$scope', '$element', '$state',
                function stateClassController( $scope, $element, $state ) {
                    var view = this,

                        settings = $scope.stateClass || {},
                        classTarget = settings.classList || 'classList',
                        // staggerTarget = settings.stagger ?
                        //     document.querySelector( settings.stagger ) :
                        //     $element[ 0 ],
                        styles,
                        delay,
                        duration,

                        // stateChange = 'state-change',

                        // staggerTime = 30,
                        activeClasses = [];

                    // angular.element($window).bind("scroll", function() {
                    //     if (this.pageYOffset >= 20) {
                    //         scope.boolChangeClass = true;
                    //         console.log('Scrolled below header.');
                    //     } else {
                    //         scope.boolChangeClass = false;
                    //         console.log('Header is in view.');
                    //     }
                    //     scope.$apply();
                    // });

                    // $element.addClass( stateChange );
                    // $root.$on( '$stateChangeStart',
                    //     function( event, toState, toParams, fromState, fromParams, options ) {
                    //     $element.removeClass( stateChange );
                    // });
                    // $root.$on( '$stateChangeSuccess',
                    //     function( event, toState, toParams, fromState, fromParams, options ) {
                    //     $element.addClass( stateChange );
                    // });
                    // $root.$on( '$stateChangeError',
                    //     function( event, toState, toParams, fromState, fromParams, options ) {
                    //     $element.addClass( stateChange );
                    // });

                    $scope.$watch( function() {

                        return $state.current.data;

                    }, function( res ) {

                        if ( res ) {

                            view.active = res[ classTarget ];
                            // $element.removeClass( 'state-class-active' )
                            //     .addClass( 'state-class-pre' );


                            if ( res[ classTarget ] && res[ classTarget ].length ) {

                                for ( var i = activeClasses.length - 1; i >= 0; i-- ) {

                                    var old = activeClasses[ i ];
                                    $element.removeClass( old );

                                }

                                // $element.addClass( 'state-class-stagger' );

                                for ( var j = $state.current.data[ classTarget ].length - 1; j >= 0; j-- ) {

                                    var name = $state.current.data[ classTarget ][ j ];
                                    activeClasses.push( name );
                                    $element.addClass( name );

                                }


                                // console.log("staggerTarget",staggerTarget);
                                // styles = $window.getComputedStyle( staggerTarget );

                                // duration = styles.transitionDuration || styles.animationDuration;
                                // delay = styles.transitionDelay || styles.animationDelay;

                                // staggerTime = parseInt( duration.replace( 'ms', '' ).replace( 's', '000' ) );
                                // staggerTime += parseInt( delay.replace( 'ms', '' ).replace( 's', '000' ) );

                                // // console.log( 'delay', delay );
                                // // console.log( 'staggerTime', staggerTime );

                                // $timeout( function() {
                                //     console.log( 'added! state-class-active', staggerTime );
                                //     $element.addClass( 'state-class-active' );
                                //     $element.removeClass( 'state-class-pre state-class-stagger' );
                                // }, staggerTime );
                            }
                        }
                    });

                }
            ]
        };
    });
        // view.stateChange = false;
        // $root.$on( '$stateChangeStart',
        //     function( event, toState, toParams, fromState, fromParams, options ) {
        //     view.stateChange = true;
        //     // console.log( '$stateChangeStart // From: ', fromState );
        // });
        // $root.$on( '$stateChangeSuccess',
        //     function( event, toState, toParams, fromState, fromParams, options ) {
        //     view.stateChange = false;
        //     // console.log( '$stateChangeSuccess // From: ', toParams );
        //     // console.log( 'toState', toState );
        // });
        // $root.$on( '$stateChangeError',
        //     function( event, toState, toParams, fromState, fromParams, options ) {
        //     view.stateChange = false;
        //     // console.log( '$stateChangeError // From: ', toParams );
        //     // console.log( 'toState', toState );
        // });