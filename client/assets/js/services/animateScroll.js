'use strict';
angular.module( 'TreasuredRecipesApp.AnimateScroll', [] )
    .factory( 'AnimateScrollService', [ '$q', '$timeout', '$interval',
        function( $q, $timeout, $interval ) {
            var service = {},

                active = false,

                runTime = 0,

                animationDeffered = $q.defer(),
                listenerDeffered = $q.defer(),


                stagger = 1800, // from background styles
                pixelDistance = 14,
                animationSpeed = 33.367, // 29.997 framer per second

                topMargin = 20,
                bufferArea = 2,

                lastTop,

                // hold instaances in memeory
                animateScroll,
                stageView,
                targetToView;

            function moveScroller() {
                var anchor = targetToView.getBoundingClientRect();

                // maintain anticipated runtime for sanity
                // runTime
                runTime += animationSpeed;

                animateScroll = $timeout( function() {
                    stageView.scrollTop = ( stageView.scrollTop - Math.round( stageView.scrollTop*0.01 ) );
                    if ( anchor.top <= bufferArea ) {
                        moveScroller()
                    } else {
                        lastTop = anchor.top;
                        console.log( 'runTime', runTime );
                        $timeout( function( argument ) {
                            console.log( 'anticiplated animation  compelt!!' );
                            animationDeffered.resolve( lastTop );
                        }, animationSpeed );
                        runTime= 0;
                    }
                }, animationSpeed );
                // console.log("moveScroller animateScroll",animateScroll);
                return animationDeffered.promise;
            }

            // anchorElm - element that measured
            // 
            // scrollElm - element to have the scroll applied if its not the body

            function animateScrollPosition() {
                var queueAnim = $q.defer(), 
                    anchorElm = targetToView.getBoundingClientRect();
                console.log( 'animateScrollPosition', anchorElm.top < -( anchorElm.height + topMargin ) );
                // ANIMATE SCROLL TO TITLE
                // if if target if off screen by more than buffer, then scroll to it
                if ( anchorElm.top < -( anchorElm.height + topMargin ) ) {
                    active = true;
                    $timeout( function() {
                        // deferred.resolve(t);
                        var t = moveScroller().then( function( data ) {
                            queueAnim.resolve( data );
                            listenerDeffered.resolve( data );
                            active = false;
                            console.log( 'animateScroll', animateScroll );
                        });
                    }, stagger ); // wait for ng-enter/ng-leave to complete
                }

                return queueAnim.promise;
            }

            function getElements( anchorTarget, scrollTarget ) {
                stageView = document.querySelector( anchorTarget );
                targetToView = document.querySelector( scrollTarget );
                return animateScrollPosition();
            }

            function cancelScroll() {
                active = false;
                return $interval.cancel( animateScroll );
            }

            // service
            // 
            service.run = getElements;
            service.scroll = animateScrollPosition;
            service.cancel = cancelScroll;


            service.listen = function() {
                var def = $q.defer(),
                    animDef = animationDeffered.promise;
                console.log( 'listenerDeffered', listenerDeffered );
                if ( active ) {
                    animDef.then( function( res ) {
                        if ( res ) {
                            console.log( 'complete res', res );
                            def.resolve( 'complete' );
                        }
                    });
                } else {
                    def.resolve( 'listen/none' );

                }
                // if ( queueAnim && animateScroll ) {
                //     queueAnim.then( function( res ) {
                //         def.resolve( res );
                //     });
                // } else {
                //     def.resolve( null );
                // }
                // cl
                console.log( 'def', def );
                return def.promise;
            };


            return service;

        }
    ] );
