'use strict';

function mainViewConfig( $stateProvider ) {
    $stateProvider
        .state( 'main', {

            url : '/catalog',
            abstract : true,
            // 
            // onEnter
            // onExit fN???

            controller : 'mainViewCtrl',
            controllerAs : '$mainCtrl',

            templateUrl : 'mainView/mainView.html',

            resolve : {

                img : [ '$q', '$timeout', function( $q, $timeout ) {
                    var deferred = $q.defer();
                    // $timeout( function() {
                    deferred.resolve({
                        src : '/assets/images/treasured-recipes-background-hi-res.jpg'
                    });
                    // }, 1000 );
                    return deferred.promise;
                } ]

            }


        }).state( 'main.loading', {
            url : '/loading',


            views : {
                'content' : {      
                    css : [ 'assets/css/mainView/mainView.css' ],
                    template : '<div class="grid-content text-center pull-down-4" ng-include="\'partials/loader-icon.html\'"></div>'
                },
                'alt' : {
                    template : '<ul class="pre-loading"><li ng-repeat="imgsrc in $resolve.preload.src"><image-loader src="{{imgsrc}}" on-load="$mainCtrl.complete"></image-loader></li></ul>'
                }
            },

            data : {
                classList : [ 'background-loading' ]
            }
        }).state( 'main.complete', {
            url : '/found',
            data : {
                classList : [ 'background-complete' ]
            }
        });
}

angular.module( 'TreasuredRecipesApp.mainView', [

    'ngAnimate', // trickles down to sub-views
    'ui.router',
    'angularCSS',

    'TreasuredRecipesApp.animations',
    // image perloader directive
    'loader.image',

    'TreasuredRecipesApp.templates'
] )

.config( [ '$stateProvider', mainViewConfig ] )

.controller( 'mainViewCtrl', [
    '$scope',
    '$q',
    '$rootScope',
    '$state',
    '$timeout',
    '$stateParams',
    '$animate',


    'img',
    // 'preload',
    function( $scope, $q, $root, $state, $timeout, $stateParams, $animate, img ) {
        // function( $q, $state, $timeout ) {
        var view = this,
            count = [ img.src ];

        // all asset will call the same callback
        function callbackOnLast( value ){

            // remove it on complete
            count.splice( count.indexOf( value ), 1 );

            // none left
            if ( count.length === 0 ) {

                // assets are all loaded...
                view.loadedAssets = true;

                // goto next route
                if ( view.slug ) {
                    // console.log( 'callbackOnLast view.slug', value );
                    $state.go( 'recipe', { slug : view.slug });
                } else {
                    $state.go( 'search' );
                }    
            }
        }


        view.stateChange = false;
        $root.$on( '$stateChangeStart',
            function( event, toState, toParams, fromState, fromParams, options ) {
            view.stateChange = true;
            // console.log( '$stateChangeStart // From: ', fromState );
        });
        $root.$on( '$stateChangeSuccess',
            function( event, toState, toParams, fromState, fromParams, options ) {
            view.stateChange = false;
            // console.log( '$stateChangeSuccess // From: ', toParams );
            // console.log( 'toState', toState );
        });
        $root.$on( '$stateChangeError',
            function( event, toState, toParams, fromState, fromParams, options ) {
            view.stateChange = false;
            // console.log( '$stateChangeError // From: ', toParams );
            // console.log( 'toState', toState );
        });

        view.setslug = function( value ) {
            view.slug = value.slug || value;
        };

        view.loadedAssets = false;
        view.complete = callbackOnLast;
    }
] );
