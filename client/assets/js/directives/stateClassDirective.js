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
            controller : [ '$scope', '$window', '$element', '$state', '$timeout',
                function stateClassController( $scope, $window, $element, $state, $timeout ) {
                    var settings = $scope.stateClass || {},
                        classTarget = settings.classList || 'classList',
                        staggerTarget = settings.stagger ?
                            document.querySelector( settings.stagger ) :
                            $element[ 0 ],
                        styles,
                        delay,
                        duration,



                        // staggerTime = 30,
                        activeClasses = [];
                    console.log( 'stateClass loaded!' );

                    $scope.$watch( function() {

                        return $state.current.data;

                    }, function( res ) {

                        if ( res ) {

                            $element.removeClass( 'state-class-active' )
                                .addClass( 'state-class-pre' );


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
                                styles = $window.getComputedStyle( staggerTarget );

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
