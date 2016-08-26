'use strict';
angular.module('application.services').factory('attachmentService', ['$q', '$http', 'webStorage',
    function($q, $http, webStorage) {
        var
            attachments,
            idHash = {},
            // idHash = {},


            cache = 15*60000, // 15 min
            // cache = 1*60*60000, // 1 hour

            lastreq,
            lastid,

            error = null,

            service = {};

        function buildHash() {
            for (var i = attachments.length - 1; i >= 0; i--) {
                idHash[attachments[i].id] = attachments[i];
            }
            // return idHash[asset.id];
        }

    // meant to be a READ ONLY service

        function getAttachmentsByRecipe(recipeId) {
            var deferred = $q.defer(),
                cacheTime = +(new Date()) - cache;


          // first check to see if in memory and not too old
            if (attachments && (lastreq > cacheTime) && recipeId !== lastid) {
                deferred.resolve(attachments);
            // }
            // second check to see if in localstorage and not too old
            } else if (webStorage.get('treasuredrecipes:wp-attachments:'+recipeId+':lastreq') > cacheTime) {

                attachments = webStorage.get('treasuredrecipes:wp-attachments:'+recipeId+':collection');
                lastreq = webStorage.get('treasuredrecipes:wp-attachments:'+recipeId+':lastreq');
                // if (attachments.length !== Object.keys(idHash).length) {
                    buildHash();
                // }
                deferred.resolve(attachments);

            } else {

            // third get a fresh copy
                console.log("attchment Fresh JSON requested", recipeId);

                $http({
                    method: 'GET', // read only 
                    url: 'http://www.treasuredrecipes.info/mullen-family/wp-json/wp/v2/media',
                    params: { parent: recipeId }
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log("successCallback response",response);
                    // set to global of `data`
                    attachments = response.data;
                    buildHash();

                    webStorage.set('treasuredrecipes:wp-attachments:'+recipeId+':collection', attachments);
                    webStorage.set('treasuredrecipes:wp-attachments:'+recipeId+':lastreq', +(new Date()));

                    deferred.resolve(attachments);

                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    error = "No attachments found.";
                });
            }


            lastid = recipeId;

            return deferred.promise;
        }

        function getAttachmentById( id ) {
            var deferred = $q.defer();

            // make sure is has is set
            getAttachmentsByRecipe().then(function() {
                deferred.resolve(idHash[id]);
            });

            return deferred.promise;
        }

        // function nextRecipe() {
        //     var deferred = $q.defer(),
        //         seat;
        //     getRecipeBySlug().then(function() {
        //         seat = attachments.indexOf(selected);
        //         if (seat === attachments.length - 1) {
        //             cacheNext = attachments[0];
        //         } else {
        //             cacheNext = attachments[seat + 1];
        //         }
        //         deferred.resolve(cacheNext);
        //     });

        //     return deferred.promise;
        // }

        // function prevRecipe() {
        //     var deferred = $q.defer(),
        //         seat;

        //     getRecipeBySlug().then(function() {
        //         seat = attachments.indexOf(selected);
        //         if (seat === 0) {
        //             cachePrev = attachments[attachments.length - 1];
        //         } else {
        //             cachePrev = attachments[seat - 1];
        //         }
        //         deferred.resolve(cachePrev);
        //     });

        //     return deferred.promise;
        // }


        service.getAttachmentsByRecipe = getAttachmentsByRecipe;

        service.getById = getAttachmentById;
        // service.selected = selected;
        // service.error = error;

        // service.next = nextRecipe;
        // service.prev = prevRecipe;

        // service.cachePrev = cachePrev;
        // service.cacheNext = cacheNext;

        // service.last = lastRecipe;

        return service;

    }
]);
