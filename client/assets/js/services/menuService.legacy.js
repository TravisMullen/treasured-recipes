'use strict';


// change this to be ITEM service so it can be used against the nav and medie


angular.module( 'TreasuredNavItemsApp.MenuService', [
        'webStorageModule'
    ] )
    .factory( 'MenuService', [ '$q', '$http', 'webStorage', 'ConfigService',
        function( $q, $http, webStorage, ConfigService ) {
            var
                navigation,
                slugHash = {},
                nameSpace = ConfigService.nameSpace, // "treasured-navigation"

                storageKeys = {
                    lastreq : nameSpace + ':lastreq',
                    collection : nameSpace + ':collection',
                    selected : nameSpace + ':data.selected'
                },

                cache = 15 * 60000, // 15 min
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

                keyAttr = 'slug',

                service = {};



            // meant to be a READ ONLY service
            function filterJSONfromNavItem( navigation ) {
                var updated = [];
                    // rendered,
                    // filtered;
                if ( !navigation.length ) {
                    return [];
                }
                for ( var i = navigation.length - 1; i >= 0; i-- ) {
                    // rendered = navigation[ i ].content.rendered;
                    // get that fuckin JSON out of there!
                    // filtered = rendered.substring( rendered.indexOf( '{' ), rendered.lastIndexOf( '}' ) + 1 );
                    // navigation[ i ].details = JSON.parse( filtered );
                    // take out the trash
                    // delete navigation[ i ].content;

                    // set a hash since we are already in the data
                    slugHash[ navigation[ i ][ keyAttr ] ] = true;
                }
                return navigation;
            }

            function remainingTime() {
                var cacheTime = +( new Date() ) - cache,
                    req = webStorage.get( storageKeys.lastreq );
                return req ? ( req - cacheTime ) : false;
            }

            function getNavItems( bustCache ) {
                var deferred = $q.defer();

                if ( remainingTime() ) {
                    // first check to see if in memory and not too old
                    if ( navigation ) {
                        // console.log( 'Loaded from Memory' );
                        deferred.resolve( navigation );

                        // second check to see if in localstorage and not too old
                    } else {

                        // console.log( 'Loaded from Storage' );

                        navigation = webStorage.get( storageKeys.collection );
                        // rebuild lost hash
                        for ( var i = 0; i < navigation.length; i++ ) {
                            slugHash[ navigation[ i ][ keyAttr ] ] = true;
                        }

                        // data.lastreq = webStorage.get(storageKeys.lastreq);

                        deferred.resolve( navigation );
                    }
                } else {

                    // third get a fresh copy
                    // console.log( 'Fresh JSON requested' );

                    $http({
                        method : 'GET', // read only 
                        url : ConfigService.api.pages
                    }).then( function successCallback( response ) {
                        // this callback will be called asynchronously
                        // when the response is available

                        // set to global of `data`
                        navigation = filterJSONfromNavItem( response.data );

                        webStorage.set( storageKeys.collection, navigation );
                        webStorage.set( storageKeys.lastreq, +( new Date() ) );

                        deferred.resolve( navigation );

                    }, function errorCallback( response ) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        error = 'No navigation found.';
                    });
                }

                return deferred.promise;
            }

            function getSelected() {
                var deferred = $q.defer();
                deferred.resolve( data.selected );
                return deferred.promise;
            }

            function getNavItemBySlug( index ) {
                var deferred = $q.defer();

          
                getNavItems().then( function() {

                    if ( !index ) {
                        index = data.selected[ keyAttr ];
                    }

                    for ( var i = navigation.length - 1; i >= 0; i-- ) {
                        if ( navigation[ i ][ keyAttr ] === index ) {
                            data.selected = navigation[ i ];

                            webStorage.set( storageKeys.selected, data.selected );

                            deferred.resolve( data.selected );
                            return;
                        } else if ( i === 0 ) {
                            deferred.reject();
                        }
                    }
                });

                return deferred.promise;
            }

            function nextNavItem() {
                var deferred = $q.defer(),
                    seat;
                getNavItemBySlug().then( function() {
                    seat = navigation.indexOf( data.selected );
                    if ( seat === navigation.length - 1 ) {
                        data.cacheNext = navigation[ 0 ];
                    } else {
                        data.cacheNext = navigation[ seat + 1 ];
                    }
                    deferred.resolve( data.cacheNext );
                });

                return deferred.promise;
            }

            function prevNavItem() {
                var deferred = $q.defer(),
                    seat;

                getNavItemBySlug().then( function() {
                    seat = navigation.indexOf( data.selected );
                    if ( seat === 0 ) {
                        data.cachePrev = navigation[ navigation.length - 1 ];
                    } else {
                        data.cachePrev = navigation[ seat - 1 ];
                    }
                    deferred.resolve( data.cachePrev );
                });

                return deferred.promise;
            }

            function lastNavItem() {
                var deferred = $q.defer(),
                    last = webStorage.get( storageKeys.selected );

                getNavItems().then( function() {
                    if ( last && slugHash[ last[ keyAttr ] ] ) {
                        deferred.resolve( last );
                    } else {
                        deferred.resolve( navigation[ 0 ] );
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

            service.navigation = getNavItems;

            service.get = getNavItemBySlug;
            // service.getSelected = getSelected;
            // service.selected = data.selected;
            service.error = error;

            service.items = data;

            service.next = nextNavItem;
            service.prev = prevNavItem;

            service.cachePrev = data.cachePrev;
            service.cacheNext = data.cacheNext;

            service.last = lastNavItem;
            service.storageKeys = storageKeys;

            service.isStored = isStored;
            service.isCached = remainingTime;
            service.cache = cache;

            return service;

        }
    ] );
