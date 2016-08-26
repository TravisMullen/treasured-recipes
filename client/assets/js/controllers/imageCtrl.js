// info: http://foundation.zurb.com/apps/docs/#!/angular
'use strict';
angular.module('application.controllers')
    .controller('imageCtrl', imageCtrl);


function imageCtrl($scope, $state, $stateParams, attachmentService) {
    $scope.close = function() {
        $state.go('^');
    };
    attachmentService.getById($stateParams.imgid).then(function(results) {
        $scope.image = results;
    });
}

imageCtrl.$inject = ['$scope', '$state', '$stateParams', 'attachmentService'];
