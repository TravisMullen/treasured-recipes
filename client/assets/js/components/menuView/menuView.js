'use strict';

function menuViewCtrl( MenuService ) {
    var view = this;

    // destory self on state change request
    // view.$onInit = function() { 
        MenuService.get().then( function( res ) {
            view.items = res;
        });
    // };

    // view.searchRecipes = function searchFilter( value, index, array ) {
    //     if ( typeof( view.searchValue ) === 'string' && view.searchValue.length ) {
    //         if ( value.title && value.title.rendered ) {
    //             if ( value.title.rendered.toLowerCase().indexOf( view.searchValue.toLowerCase() ) >= 0 ) {
    //                 return true;
    //             }
    //         }
    //     // if no valid search, check settings for showList
    //     } else if ( view.settings && view.settings.showList ) {
    //         return true;
    //     }
    // };

}

menuViewCtrl.$inject = [ 'MenuService' ];

// function menuViewConfig( $stateProvider ) {
//     $stateProvider
//         .state( 'menu', {

//             parent : 'main',
//             url : '/search',
//             // abstract :q true,

//             // controller: 'menuViewCtrl',
//             // controllerAs : '$searchCtrl',

//             css : [ { 
//                 href : 'assets/css/menuView/menuView.css',
//                 preload : true,
//                 persist : true 
//             } ],
//             resolve : {
//                 items : function( MenuService ) {
//                     return MenuService.get();
//                 },
//                 active : function( MenuService, $stateParams ) {
//                     return MenuService.get( $stateParams.slug );
//                 }//,
//                 //     // recipes : function( RecipeService, $stateParams ) {
//                 //     //     return RecipeService.recipes( $stateParams.slug );
//                 //     // },
//                 // last : function( RecipeService, $stateParams ) {
//                 //     return RecipeService.last();
//                 // }

//                 //     delay : function( $q, $timeout ) {
//                 //         var deferred = $q.defer();
//                 //         $timeout( function() {
//                 //             deferred.resolve({ hello : 'loaded!'});
//                 //         }, 1000 );
//                 //         return deferred.promise;
//                 //     }
//             },

//             views : {
//                 'content' : {
//                     templateUrl : 'menuView/views/contentView.html'
//                 }
//             },

//             data : {
//                 showList : false,
//                 classList : [ 'search-view' ]
//             }
//         })
//         .state( 'search.list', {
//             url : '/list',
//             css : [ { 
//                 href : 'assets/css/menuView/menuView.css',
//                 preload : true,
//                 persist : true 
//             } ],
//             data : {
//                 showList : true
//             }
//         });
// }


// menuViewConfig.$inject = [ '$stateProvider' ];

angular.module( 'TreasuredRecipesApp.menuView', [
    'ngAnimate',
    'ui.router',
    // 'TreasuredRecipesApp.animations',
    
    'TreasuredNavItemsApp.MenuService',
    'TreasuredRecipesApp.templates'
] )

// .config( [ '$stateProvider', menuViewConfig ] )

.component( 'menuView', {
    templateUrl : 'menuView/menuView.html',
    css : [ { 
        href : 'assets/css/menuView/menuView.css',
        preload : true,
        persist : true 
    } ],
    controller : menuViewCtrl,
    // replace: true,
    bindings : {

        // export : '&', 

        items : '=',
        // last : '=',
        // stateChange : '=?',
        loaded : '='

        // searchValue : '=',
        // searchRecipes : '=',

        // gotoRecipes : '&'

    }
});