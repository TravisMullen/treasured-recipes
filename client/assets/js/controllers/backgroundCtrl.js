// info: http://foundation.zurb.com/apps/docs/#!/angular
'use strict';
angular.module( 'application.controllers' )
    .controller( 'backgroundCtrl', backgroundCtrl );


function backgroundCtrl( $scope, $state ) {

    console.log("$state.current.name",$state.current.name);

}

backgroundCtrl.$inject = [ '$scope', '$state' ];