'use strict';
angular.module( 'loader.onload', [] )
    .directive( 'imageOnload', [
        function() {
            return {
                restrict : 'A',
                scope : {
                    'onLoad' : '=imageOnload',
                    'onError' : '=?imageOnerror'
                },
                link : function( $scope, $element, $attrs ) {
                    var img = new Image();
                    img.onload = function() {
                        console.log( 'onLoad', onLoad );
                        $scope.onLoad();
                    };
                    img.onerror = function() {
                        if ( $scope.onError ) {
                            $scope.onError();
                        }
                    };

                    img.src = $attrs.src;
                }
            };
        }
    ] );
