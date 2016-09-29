angular.module( 'vpower.directives' )
.controller( 'imageSectionCtrl',
    [ '$scope', '$element', '$attrs', '$timeout',
    function( $scope, $element, $attrs, $timeout ){
        'use strict';

        var count,
            cbs = [];

        $scope.state = 'waiting';

        this.register = function( el, cb ){
            $scope.state = 'loading';
            cbs.push( cb );
            count++;
        };

        this.ready = function(){
            $timeout(function(){
                // I give time for more images to come in delayed
                count--;
                if ( !count ){
                    $scope.state = 'ready';
                    $timeout(function(){
                        angular.forEach( cbs, function(cb){
                            cb();
                        });
                    }, 250);
                }
            }, 10);
        };
    }]
).directive( 'imageSection',
    [
    function(){
        'use strict';

        return {
            restrict: 'EA',
            controller: 'imageSectionCtrl'
        };
    }]
);