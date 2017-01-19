'use strict';

angular.module( 'TreasuredRecipesApp.animations', [] )
.animation( '.animation-watcher', [ '$animateCss', function( $animateCss ) {
    return {
        enter : function( element, done ) {
            var animation = $animateCss( element, {
                    event : 'enter',
                    cleanupStyles : true,
                    structural : true,
                    delay : true
                });

                console.log( 'animation-watcher enter start' );
            animation.start().done( function( res ) {
                console.log( 'animation-watcher enter done!', res );
                done();
            });
        },
        leave : function( element, done ) {
            // todo: if running, queue this next in line and wait for complete
            // 
            var animation = $animateCss( element, {
                    event : 'leave',
                    cleanupStyles : true, 
                    structural : true,
                    delay : true
                });

                console.log( 'animation-watcher leave start' );
            animation.start().done( function( res ) {
                console.log( 'animation-watcher leave done!', res );
                done();
            });
        }
    }
} ] );
// factory 
// 
// send to anim service
// add to queue
// if self ID next in queue or queue is empty,
// then shift/pop from queue
// start anim
// 
// priority (inject begining or end of array)