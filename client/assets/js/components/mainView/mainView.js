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

                // recipes : function( recipeService, $stateParams ) {
                //     return recipeService.recipes( $stateParams.slug );
                // },
                // last : function( recipeService, $stateParams ) {
                //     return recipeService.last();
                // },


                // preload : [ '$q', '$timeout', function( $q, $timeout ) {
                //     var deferred = $q.defer();
                //     // $timeout( function() {
                //     deferred.resolve({
                //         src : [
                //             '/assets/images/recipe-pad-background-top.png',
                //             '/assets/images/recipe-pad-background-top-cap.png',
                //             '/assets/images/recipe-pad-background-bottom.png',
                //             '/assets/images/recipe-pad-background-middle.png',
                //             '/assets/images/recipe-pad-background-bottom-tip.png',
                //             '/assets/images/recipe-pad-background-bottom-cap.png'
                //         ]
                //     });
                //     // }, 1000 );
                //     return deferred.promise;
                // } ],

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
            // url : '',


            // resolve: {
            //     slug: ['$stateParams', function($stateParams) {
            //         return $stateParams.slug;
            //     }]
            // },

            views : {
                'main' : {
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
    'ngAnimate', // trickles down to sub-views
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

        console.log( 'mainViewCtrl', $state.current );

        // if ( preload.src ) {
        //     angular.forEach( preload.src, function( value ) {
        //         this.push( value );
        //     }, count );
        // }
        // listen 
        // $animate.on('enter', '.ng-recipe-enter', function(element) {
        // $animate.on('enter', 'ng-view', function(element) {
        //     // the animation for this route has completed
        // });
        // var elm = angular.element(document).find('.main-view');
        // console.log("elm",elm);
        // cl
        console.log( ' $animate', $animate );
        // $animate.on( 'enter', '.ng-main-animate',
        //    function callback( element, phase ) {
        //         console.log( '$animate.on ENTER COMPLETE!', element );
        //         $scope.$apply();
        //         // cool we detected an enter animation within the container
        //    }
        // );
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
                    console.log( 'callbackOnLast view.slug', value );
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
            console.log( '$stateChangeStart // From: ', fromState );
        });
        $root.$on( '$stateChangeSuccess',
            function( event, toState, toParams, fromState, fromParams, options ) {
            view.stateChange = false;
            console.log( '$stateChangeSuccess // From: ', toParams );
            console.log( 'toState', toState );
        });
        $root.$on( '$stateChangeError',
            function( event, toState, toParams, fromState, fromParams, options ) {
            view.stateChange = false;
            console.log( '$stateChangeError // From: ', toParams );
            console.log( 'toState', toState );
        });

        view.setslug = function( value ) {
            view.slug = value.slug || value;
            console.log( 'setslug in $mainCtrl', view.slug );
        };

        // view.hello = 'hello';
        view.loadedAssets = false;
        view.complete = callbackOnLast;
    }
] );
