'use strict';
angular.module( 'loader.image', [ 'loader.section' ] )
    // module set in sectionDir
    .directive( 'imageLoader', [ '$q', '$interval',
        function( $q, $interval ) {

            var __NOW__ = +( new Date() ),
                uuid = 0;

            function tryLoading( src, count ) {
                var img,
                    defer = $q.defer();

                if ( !count ) {
                    count = 1;
                }

                img = new Image();
                img.onload = function() {
                    defer.resolve( img );
                };
                img.onerror = function() {
                    if ( count < 5 ) {
                        setTimeout( function() {
                            defer.resolve( tryLoading( src, count + 1 ) );
                        }, 100 );
                    } else {
                        defer.reject();
                    }
                };
                img.src = src;

                return defer.promise;
            }

            return {
                restrict : 'EA',
                require : [ '^imageSection' ],
                scope : {
                    'onLoad' : '=onLoad'
                },
                link : function( $scope, $element, $attrs, parent ) {
                    var clear,
                        interval = 0,
                        uid = uuid++;

                    $scope.$watch(
                        function() {
                            var src,
                                req = $attrs.src;

                            try {
                                src = $scope.$parent.$eval( req );
                            } catch ( ex ) {}

                            if ( !src ) {
                                src = req;
                            }

                            return src;
                        },
                        function( src ) {
                            var toCall;

                            src += '?v=' + __NOW__ + '_' + uid;

                            $element.attr( 'hidden', 'true' );
                            parent[ 0 ].register( $element[ 0 ], function() {
                                $element.removeAttr( 'hidden' );
                            });

                            if ( $attrs.backgroundReplace ) {
                                toCall = function( src ) {
                                    return tryLoading( src ).then( function( res ) {
                                        $element.css( 'backgroundImage', 'url(' + src + ')' );

                                        return res;
                                    });
                                };
                            } else {
                                toCall = tryLoading;
                            }

                            toCall( src ).then( function( img ) {
                                parent[ 0 ].ready( $element[ 0 ] );

                                if ( !$attrs.noAppend ) {
                                    $element.append( img );
                                }

                                if ( $scope.onLoad ) {
                                    $scope.onLoad();
                                }
                            });

                            if ( $attrs.reload ) {
                                $interval.cancel( clear );
                                clear = $interval( function() {
                                    interval++;
                                    toCall( src + '_' + interval ).then(
                                        function( img ) {
                                            if ( !$attrs.noAppend ) {
                                                $element.html( '' );
                                                $element.append( img );
                                            }
                                        },
                                        function() {
                                            $interval.cancel( clear );
                                        }
                                    );
                                }, parseInt( $attrs.reload, 10 ) );
                            }
                        }
                    );

                    $scope.$on( '$destroy', function() {
                        $interval.cancel( clear );
                    });
                }
            };
        }
    ] );
