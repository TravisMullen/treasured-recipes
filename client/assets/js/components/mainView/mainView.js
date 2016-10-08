'use strict';

function mainViewConfig( $stateProvider ) {
    $stateProvider
        .state( 'main', {

            url : '/catalog',
            abstract : true,

            controller : 'mainViewCtrl',
            controllerAs : '$ctrl',

            templateUrl : 'mainView/mainView.html',
            resolve : {
                img : function( $q, $timeout ) {
                    var deferred = $q.defer();
                    // $timeout( function() {
                    deferred.resolve({
                        src : '/assets/images/treasured-recipes-background-hi-res.jpg'
                    });
                    // }, 1000 );
                    return deferred.promise;
                },

                preload : function( $q, $timeout ) {
                    var deferred = $q.defer();
                    // $timeout( function() {
                    deferred.resolve({
                        src : [
                            '/assets/images/recipe-pad-background-top.png',
                            '/assets/images/recipe-pad-background-top-cap.png',
                            '/assets/images/recipe-pad-background-bottom.png',
                            '/assets/images/recipe-pad-background-middle.png',
                            '/assets/images/recipe-pad-background-bottom-tip.png',
                            '/assets/images/recipe-pad-background-bottom-cap.png'
                        ]
                    });
                    // }, 1000 );
                    return deferred.promise;
                }
            }


        }).state( 'main.loading', {
            url : '',


            // resolve : {
            //     preload : function( $q, $timeout ) {
            //         var deferred = $q.defer();
            //         // $timeout( function() {
            //         deferred.resolve({
            //             src : [
            //                 '/assets/images/recipe-pad-background-top.png',
            //                 '/assets/images/recipe-pad-background-top-cap.png',
            //                 '/assets/images/recipe-pad-background-bottom.png',
            //                 '/assets/images/recipe-pad-background-middle.png',
            //                 '/assets/images/recipe-pad-background-bottom-tip.png',
            //                 '/assets/images/recipe-pad-background-bottom-cap.png'
            //             ]
            //         });
            //         // }, 1000 );
            //         return deferred.promise;
            //     }
            // },

            views : {
                'main' : {
                    template : 'hello:{{$ctrl.hello}}<div class="grid-content text-center pull-down-4" ng-include="\'partials/loader-icon.html\'"></div>'
                },
                'alt' : {
                    template : '<ul class="pre-loading"><li ng-repeat="imgsrc in $resolve.preload.src"><image-loader src="{{imgsrc}}" on-load="$ctrl.complete"></image-loader></li></ul>'
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
    // )
    // .state( 'bg.ready', {
    //     url : '/ready-to-serve',
    //     data : {
    //         classList : [ 'background-ready' ]
    //     }
    // })
    // ;
}

angular.module( 'TreasuredRecipesApp.mainView', [
    'ui.router',
    'TreasuredRecipesApp.templates',
    // image perloader directive
    'loader.image'
] )

.config( [ '$stateProvider', mainViewConfig ] )



.controller( 'mainViewCtrl', [
    '$q',
    '$state',
    '$timeout',

    'img',
    'preload',
    function( $q, $state, $timeout, img, preload ) {
        var view = this,
            count = [ img.src ];

        if ( preload.src ) {
            angular.forEach( preload.src, function( value ) {
                this.push( value );
            }, count );
        }

        function checkRemaining( value ) {
            count.splice( count.indexOf( value ), 1 );
            if ( count.length === 0 ) {
                $state.go( 'search' );
            }
        }

        view.preloading = true;
        view.complete = checkRemaining;
    }
] );
