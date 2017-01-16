'use strict';
// main view and controller to be use by all others
// therefor becomes the global and will be used
// instead of $rootScope
function appViewConfig( $stateProvider ) {
    $stateProvider
        .state( 'main', {

            url : '/catalog',
            abstract : true,
            // 
            // onEnter
            // onExit fN???

            controller : 'appViewCtrl',
            controllerAs : '$appCtrl',

            templateUrl : 'appView/appView.html',

            resolve : {

                // get the configs for all the views
                figgy : function( ConfigService ) {
                    return ConfigService;
                },

                // expose some data for the globals
                active : function( RecipeService ) {
                    return RecipeService.items;
                },

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
                    css : [ 'assets/css/appView/appView.css' ],
                    template : '<div class="grid-content text-center pull-down-4" ng-include="\'partials/loader-icon.html\'"></div>'
                },
                'alt' : {
                    template : '<ul class="pre-loading"><li ng-repeat="imgsrc in $resolve.preload.src"><image-loader src="{{imgsrc}}" on-load="$appCtrl.complete"></image-loader></li></ul>'
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

angular.module( 'TreasuredRecipesApp.appView', [

    'ngAnimate', // trickles down to sub-views
    'ui.router',
    'angularCSS',

    'TreasuredRecipesApp.animations',
    // image perloader directive
    'loader.image',

    'TreasuredRecipesApp.templates'
] )

.config( [ '$stateProvider', appViewConfig ] )

.controller( 'appViewCtrl', [

    '$rootScope',
    '$state',
    '$timeout',
    '$stateParams',
    '$animate',

    'figgy',
    'img',
    // 'preload',
    function( $root, $state, $timeout, $stateParams, $animate, figgy, img ) {
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

        view.info = {
            title : figgy.title
        };


        // view.fn.globals = {

        // };
        view.setslug = function( value ) {
            view.slug = value.slug || value;
        };

        view.setTitle = function( updates ) {
            view.info.title = updates.title;
            console.log("setTitle // view.header.title",view.info.title);
            // return Object.merge(view.header.title, updates);
        };

        view.loadedAssets = false;
        view.complete = callbackOnLast;
    }
] );
