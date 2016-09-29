angular.module( 'vpower.directives' ).directive( 'imageOnload',
    [
    function(){
        'use strict';

        return {
            restrict: 'A',
            scope : {
                'onLoad': '=imageOnload',
                'onError':  '=?imageOnerror'
            },
            link : function( $scope, $element, $attrs ){
                var img = new Image();
                img.onload = function(){
                    $scope.onLoad();
                };
                img.onerror = function(){
                    if ( $scope.onError ){
                        $scope.onError();
                    }
                };

                img.src = $attrs.src;
            }
        };
    }]
);