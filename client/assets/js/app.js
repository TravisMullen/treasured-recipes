// require('bower_components/angular-webstorage/angular-webstorage');

/* globals angular, FastClick */
(function() {
    'use strict';

    function config($urlProvider, $locationProvider, $stateProvider) {
        $urlProvider.otherwise('/home');

        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        $stateProvider
            .state('home', {
                url: '/home',

                views: {
                    "header": {
                        templateUrl: 'partials/splash/header.html'
                    },
                    "main": {
                        templateUrl: 'home/home.landing.html'
                    }
                }
            })

        .state('recipe', {
            url: '/recipe/:slug',
            // controller: 'recipeCtrl as recipe',
            // templateUrl: 'recipe/landing.html',
            // data: {
            //     slug: false // queue large header/nav
            // }

            views: {
                "header": {
                    templateUrl: 'partials/interior/header.html'
                },
                "main": {
                    templateUrl: 'recipe/view.html'
                },
                "footer": {
                    templateUrl: 'partials/nav.html'
                }
            }

        })
        .state('index', {
            url: '/table-of-contents',
            // controller: 'recipeCtrl as recipe',
            // templateUrl: 'recipe/landing.html',
            // data: {
            //     slug: false // queue large header/nav
            // }

            views: {
                "header": {
                    templateUrl: 'partials/interior/header.html'
                },
                "main": {
                    templateUrl: 'recipe/list.html'
                },
                "footer": {
                    templateUrl: 'partials/footer.html'
                }
            }

        })
        .state('404', {
            url: '/page-not-found',
            // controller: 'recipeCtrl as recipe',
            // templateUrl: 'recipe/landing.html',
            // data: {
            //     slug: false // queue large header/nav
            // }

            views: {
                "header": {
                    template: "Not Found!"
                },
                "main": {
                    templateUrl: '404.html'
                },
                "footer": {
                    templateUrl: 'partials/footer.html'
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

        $locationProvider.hashPrefix('!');
    }

    function run() {
        // FastClick.attach(document.body);
    }

    angular.module('application.templates', []);
    
    angular.module('application.services', []);
    angular.module('application.controllers', []);
    angular.module('application.components', []);

    angular.module('application', [
            'ui.router',
            'ngAnimate',

            'webStorageModule',

            'application.templates',

            'application.services',
            'application.controllers',
            'application.components'

            // //foundation
            // 'foundation',
            // 'foundation.dynamicRouting',
            // 'foundation.dynamicRouting.animations'
        ])
        .config(config) // jshint ignore:line
        .run(run) // jshint ignore:line
    ;

    config.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];


})();
