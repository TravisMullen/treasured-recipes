'use strict';


// change this to be ITEM service so it can be used against the nav and medie


angular.module( 'TreasuredDatasetsApp.DataService', [
        'webStorageModule'
    ] )
    .factory( 'DataService', [ '$q', '$http', 'webStorage',
        function( $q, $http, webStorage ) { 
            return function init( figgy ) {

            var 

                config = figgy || {},

                dataset,
                slugHash = {},
                nameSpace = config.nameSpace || 'dataset'+( new Date() ), // placeholder

                storageKeys = {
                    lastreq : nameSpace + ':lastreq',
                    collection : nameSpace + ':collection',
                    selected : nameSpace + ':selected'
                },

                cache = config.cache || 15 * 60000, // 15 min
                // cache = 1*60*60000, // 1 hour


                error = null,

                // expose some external data
                data = {
                    selected : undefined,

                    cachePrev : undefined,
                    cacheNext : undefined,

                    lastreq : undefined,

                    keys : storageKeys,

                    refreshInterval : cache
                },

                // targets: {

                // },

                service = {};
            
            if ( !figgy.collection ) {
                throw 'need a valid collection!';
            }

            // meant to be a READ ONLY service
            function filterJSONfromDataset( dataset ) {
                var updated = [],
                    rendered,
                    filtered;
                if ( !dataset.length ) {
                    return [];
                }
                for ( var i = dataset.length - 1; i >= 0; i-- ) {
                    rendered = dataset[ i ].content.rendered;
                    // get that fuckin JSON out of there!
                    filtered = rendered.substring( rendered.indexOf( '{' ), rendered.lastIndexOf( '}' ) + 1 );
                    dataset[ i ].details = JSON.parse( filtered );
                    // take out the trash
                    delete dataset[ i ].content;

                    // set a hash since we are already in the data
                    slugHash[ dataset[ i ].slug ] = true;
                }
                return dataset;
            }

            function remainingTime() {
                var cacheTime = +( new Date() ) - cache,
                    req = webStorage.get( storageKeys.lastreq );
                return req ? ( req - cacheTime ) : false;
            }

            function getDatasets( bustCache ) {
                var deferred = $q.defer();

                if ( remainingTime() ) {
                    // first check to see if in memory and not too old
                    if ( dataset ) {
                        // console.log( 'Loaded from Memory' );
                        deferred.resolve( dataset );

                        // second check to see if in localstorage and not too old
                    } else {

                        // console.log( 'Loaded from Storage' );

                        dataset = webStorage.get( storageKeys.collection );
                        // rebuild lost hash
                        for ( var i = 0; i < dataset.length; i++ ) {
                            slugHash[ dataset[ i ].slug ] = true;
                        }

                        // data.lastreq = webStorage.get(storageKeys.lastreq);

                        deferred.resolve( dataset );
                    }
                } else {

                    // third get a fresh copy
                    // console.log( 'Fresh JSON requested' );

                    $http({
                        method : 'GET', // read only 
                        // path or JSON API or file ('/assets/data/json/example1.json')
                        url : config.collection 
                    }).then( function successCallback( response ) {
                        // this callback will be called asynchronously
                        // when the response is available

                        // set to global of `data`
                        dataset = filterJSONfromDataset( response.data );

                        webStorage.set( storageKeys.collection, dataset );
                        webStorage.set( storageKeys.lastreq, +( new Date() ) );

                        deferred.resolve( dataset );

                    }, function errorCallback( response ) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        error = 'No dataset endpoint found.';
                    });
                }

                return deferred.promise;
            }

            function getSelected() {
                var deferred = $q.defer();
                deferred.resolve( data.selected );
                return deferred.promise;
            }

            function getDatasetBySlug( slug ) {
                var deferred = $q.defer();

                // if (slug === false) {
                //     deferred.resolve( { waiting: true } );
                // } else {
                    getDatasets().then( function() {

                        if ( !slug ) {
                            slug = data.selected.slug;
                        }

                        for ( var i = dataset.length - 1; i >= 0; i-- ) {
                            if ( dataset[ i ].slug === slug ) {
                                data.selected = dataset[ i ];

                                webStorage.set( storageKeys.selected, data.selected );

                                deferred.resolve( data.selected );
                                return;
                            } else if ( i === 0 ) {
                                deferred.reject();
                            }
                        }
                    });
                // }
                return deferred.promise;
            }

            function nextDataset() {
                var deferred = $q.defer(),
                    seat;
                getDatasetBySlug().then( function() {
                    seat = dataset.indexOf( data.selected );
                    if ( seat === dataset.length - 1 ) {
                        data.cacheNext = dataset[ 0 ];
                    } else {
                        data.cacheNext = dataset[ seat + 1 ];
                    }
                    deferred.resolve( data.cacheNext );
                });

                return deferred.promise;
            }

            function prevDataset() {
                var deferred = $q.defer(),
                    seat;

                getDatasetBySlug().then( function() {
                    seat = dataset.indexOf( data.selected );
                    if ( seat === 0 ) {
                        data.cachePrev = dataset[ dataset.length - 1 ];
                    } else {
                        data.cachePrev = dataset[ seat - 1 ];
                    }
                    deferred.resolve( data.cachePrev );
                });

                return deferred.promise;
            }

            function lastDataset() {
                var deferred = $q.defer(),
                    last = webStorage.get( storageKeys.selected );

                getDatasets().then( function() {
                    if ( last && slugHash[ last.slug ] ) {
                        deferred.resolve( last );
                    } else {
                        deferred.resolve( dataset[ 0 ] );
                    }
                });

                return deferred.promise;
            }

            function isStored() {
                var value = false;
                if ( webStorage.get( storageKeys.collection ) ) {
                    value = true;
                }
                return value;
            }

            service.dataset = getDatasets;

            service.get = getDatasetBySlug;
            // service.getSelected = getSelected;
            // service.selected = data.selected;
            service.error = error;

            service.items = data;

            service.next = nextDataset;
            service.prev = prevDataset;

            service.cachePrev = data.cachePrev;
            service.cacheNext = data.cacheNext;

            service.last = lastDataset;
            service.storageKeys = storageKeys;

            service.isStored = isStored;
            service.isCached = remainingTime;
            service.cache = cache;

            // service.unset = function() {
            //     data.selected = undefined;
            //     data.cachePrev = undefined;
            //     data.cacheNext = undefined;
            // };


            return service;
            }

        }
    ] );
