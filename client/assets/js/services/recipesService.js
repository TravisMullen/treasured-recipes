'use strict';
angular.module('TreasuredRecipesApp.services').factory('recipeService', ['$q', '$http', 'webStorage',
    function($q, $http, webStorage) {
        var
            recipes,
            slugHash = {},
            nameSpace = 'treasured-recipes',

            storageKeys = {
                lastreq: nameSpace+':lastreq',
                collection: nameSpace+':collection',
                selected: storageKeys+':selected'
            },

            cachePrev,
            cacheNext,

            cache = 15*60000, // 15 min
            // cache = 1*60*60000, // 1 hour

            lastreq,

            selected,
            error = null,

            service = {};

    // meant to be a READ ONLY service

        function filterJSONfromRecipe(recipes) {
            var updated = [],
                rendered,
                filtered;
            if (!recipes.length) {
                return [];
            }
            for (var i = recipes.length - 1; i >= 0; i--) {
                rendered = recipes[i].content.rendered;
                // get that fuckin JSON out of there!
                filtered = rendered.substring(rendered.indexOf('{'), rendered.lastIndexOf('}') + 1);
                recipes[i].details = JSON.parse(filtered);
                // take out the trash
                delete recipes[i].content;

                // set a hash since we are already in the data
                slugHash[ recipes[i].slug ] = true;
            }
            return recipes;
        }

        function remainingTime() {
            var cacheTime = +(new Date()) - cache,
                req = webStorage.get(storageKeys.lastreq);
            return req ? (req - cacheTime) : false;
        }

        function getRecipes(bustCache) {
            var deferred = $q.defer();

            if ( remainingTime() ) {
                // first check to see if in memory and not too old
                if (recipes) {
                    console.log("Loaded from Memory");
                    deferred.resolve(recipes);

                // second check to see if in localstorage and not too old
                } else {

                    console.log("Loaded from Storage");

                    recipes = webStorage.get(storageKeys.collection);
                    // rebuild lost hash
                    for (var i = 0; i < recipes.length; i++) {
                        slugHash[ recipes[i].slug ] = true;
                    }

                    // lastreq = webStorage.get(storageKeys.lastreq);

                    deferred.resolve(recipes);
                }
            } else {

            // third get a fresh copy
                console.log("Fresh JSON requested");

                $http({
                    method: 'GET', // read only 
                    url: 'http://www.treasuredrecipes.info/mullen-family/wp-json/wp/v2/recipe' // path or JSON API or file ('/assets/data/json/example1.json')
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                    // set to global of `data`
                    recipes = filterJSONfromRecipe(response.data);

                    webStorage.set(storageKeys.collection, recipes);
                    webStorage.set(storageKeys.lastreq, +(new Date()));

                    deferred.resolve(recipes);

                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    error = "No recipes found.";
                });
            }

            return deferred.promise;
        }

       function getSelected( slug ) {
            var deferred = $q.defer();
            deferred.resolve(selected);
            return deferred.promise;
        }

        function getRecipeBySlug( slug ) {
            var deferred = $q.defer();
            getRecipes().then(function() {

                if (!slug) {
                    slug = selected.slug;
                }

                for (var i = recipes.length - 1; i >= 0; i--) {
                    if (recipes[i].slug === slug) {
                        selected = recipes[i];

                        webStorage.set(storageKeys.selected, selected);
                        
                        deferred.resolve(selected);
                        return;
                    } else if ( i === 0 ) {
                        deferred.reject();
                    }
                }
            });

            return deferred.promise;
        }

        function nextRecipe() {
            var deferred = $q.defer(),
                seat;
            getRecipeBySlug().then(function() {
                seat = recipes.indexOf(selected);
                if (seat === recipes.length - 1) {
                    cacheNext = recipes[0];
                } else {
                    cacheNext = recipes[seat + 1];
                }
                deferred.resolve(cacheNext);
            });

            return deferred.promise;
        }

        function prevRecipe() {
            var deferred = $q.defer(),
                seat;

            getRecipeBySlug().then(function() {
                seat = recipes.indexOf(selected);
                if (seat === 0) {
                    cachePrev = recipes[recipes.length - 1];
                } else {
                    cachePrev = recipes[seat - 1];
                }
                deferred.resolve(cachePrev);
            });

            return deferred.promise;
        }

        function lastRecipe() {
            var deferred = $q.defer(),
                last = webStorage.get(storageKeys.selected);

            getRecipes().then(function() {
               if (last && slugHash[last.slug]) {
                    deferred.resolve(last);
                } else {
                    deferred.resolve(recipes[0]);
                }
            });

            return deferred.promise;
        }

        function isStored() {
            var value = false;
            if ( webStorage.get(storageKeys.collection ) ) {
                value = true;
            } 
            return value;
        }

        service.recipes = getRecipes;

        service.get = getRecipeBySlug;
        service.selected = selected;
        service.error = error;

        service.next = nextRecipe;
        service.prev = prevRecipe;

        service.cachePrev = cachePrev;
        service.cacheNext = cacheNext;

        service.last = lastRecipe;
        service.storageKeys = storageKeys;

        service.isStored = isStored;
        service.isCached = remainingTime;
        service.cache = cache;


        return service;

    }
]);
