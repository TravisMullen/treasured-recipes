/* globals angular, FastClick */
function config( $urlProvider, $locationProvider, $stateProvider ) {
    'use strict';

    $urlProvider.otherwise( '/table/setting-it-for-you' );

    $locationProvider.html5Mode({
        enabled : false,
        requireBase : false
    });

    $stateProvider
        .state( 'main', {
            url : '/table',
            views : {
                'dinnertable' : {
                    templateUrl : 'partials/table.html'
                }
            },
            data : {
                classList : [ 'go-dark' ] // set stage
            }
        })

    .state( 'main.loading', {
            url : '/setting-it-for-you',
            data : {
                classList : [ 'go-light' ] // load actors
            },
            views : {
                'main' : {
                    templateUrl : 'partials/loader-icon.html'
                }
            }
        })
        .state( 'main.loaded', {
            url : '/right-this-way',

            data : {
                classList : [ 'walk-in' ] // start actors
            },
            views : {
                'main' : {
                    templateUrl : 'partials/pot.html'
                }
            }
        })
        .state( 'main.search', {
            url : '/search',

            data : {
                classList : [ 'home' ]
            },
            // controller: function() {
            //     this.isHome = true; 
            //     console.log("search loaded");
            //     // $scope.testing = function() {}
            //     //     console.log("testing from search ap.js");
            //     // ;
            // },
            // controllerAs: 'home',
            views : {
                // "header": {
                //     templateUrl: 'partials/splash/header.html'
                // },
                'main' : {
                    templateUrl : 'home/home.landing.html'
                }
            }
        })

.state('main.search.list', {
    url: '/list',
    data: {
        showList: true
    }
})

.state('main.recipe', {
        url: '/recipe/:slug',
        // controller: 'recipeCtrl as recipe',
        // templateUrl: 'recipe/landing.html',
        // data: {
        //     slug: false // queue large header/nav
        // }

        data: {
            classList: ['recipe']
        },
        views: {
            // 'header' : {
            //     templateUrl : 'partials/interior/header.html'
            // },
            'main': {
                templateUrl: 'recipe/view.html'
            },
            'footer@': {
                templateUrl: 'partials/nav.html'
            }
        }

    })
    .state('main.recipe.image', {
        url: '/image/:imgid',
        // controller: 'recipeCtrl as recipe',
        // templateUrl: 'recipe/landing.html'
        // data: {
        //     slug: false // queue large header/nav
        // }

        views: {
            'modal@recipe': {
                templateUrl: 'recipe/image.html'
            }
        }

    })
    // .state('index', {
    //     url: '/table-of-contents',
    //     // controller: 'recipeCtrl as recipe',
    //     // templateUrl: 'recipe/landing.html',
    //     // data: {
    //     //     slug: false // queue large header/nav
    //     // }

//     views: {
//         "header": {
//             templateUrl: 'partials/interior/header.html'
//         },
//         "main": {
//             templateUrl: 'recipe/list.html'
//         }
//     }

// })
.state('404', {
    url: '/page-not-found',
    // controller: 'recipeCtrl as recipe',
    // templateUrl: 'recipe/landing.html',
    // data: {
    //     slug: false // queue large header/nav
    // }

    views: {
        'header': {
            template: 'Not Found!'
        },
        'main': {
            templateUrl: '404.html'
        }
    }

});

// .state('recipe.list', {
//     url: '/list',
//     views: {
//         "header": {
//             template: "list!"
//         },
//         "main": {
//             templateUrl: 'views/recipe/list.html'
//         }
//     }
//     // controller: 'AutomationLandingCtrl as land'
// })

// .state('recipe.view', {
//     url: '/:slug',
//     views: {
//         "header": {
//             template: "innter!"
//         },
//         "main": {
//             templateUrl: 'views/recipe/view.html'
//         }
//     }
//         // controller: 'AutomationLandingCtrl as land'
// });
// .state('auto', {
//     // url: '/'+settings.hiddenUrl, // hidden url
//     url: '/automation',
//     templateUrl: 'views/automation.html',
//     controller: 'AutomationCtrl as auto'
// })
// .state('auto.landing', {
//     url: '/info',
//     templateUrl: 'views/automation.landing.html'
//     // controller: 'AutomationLandingCtrl as land'
// })
// .state('auto.demo', {
//     url: '/demo',
//     templateUrl: 'views/automation.demo.html',
//     controller: 'AutomationDemoCtrl as demo'
// })
// .state('auto.queue', {
//     url: '/queue/:id',
//     templateUrl: 'views/automation.queue.html',
//     controller: 'AutomationQueueCtrl as queue'
// });

    $locationProvider.hashPrefix( '!' );
}

function run() {
    // FastClick.attach(document.body);
}

angular.module( 'TreasuredRecipesApp.animations', [ 'ngAnimate' ] );

angular.module( 'TreasuredRecipesApp.templates', [] );

angular.module( 'TreasuredRecipesApp.services', [] );
angular.module( 'TreasuredRecipesApp.controllers', [] );
angular.module( 'TreasuredRecipesApp.components', [] );

angular.module( 'TreasuredRecipesApp', [
        'ui.router',
        'ngAnimate',

        'webStorageModule',

        'TreasuredRecipesApp.animations',

        'TreasuredRecipesApp.templates',

        'TreasuredRecipesApp.services',
        'TreasuredRecipesApp.controllers',
        'TreasuredRecipesApp.components'

        // //foundation
        // 'foundation',
        // 'foundation.dynamicRouting',
        // 'foundation.dynamicRouting.animations'
    ] )
    .config( config ) // jshint ignore:line
    .run( run ) // jshint ignore:line
;

config.$inject = [ '$urlRouterProvider', '$locationProvider', '$stateProvider' ];
