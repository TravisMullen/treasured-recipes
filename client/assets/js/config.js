'use strict';
angular.module( 'app.settings', [] ).factory( 'ConfigService', function( ) {
    // settings exported here from `gulpfile.js`
    var figgy = {"api":{"pages":"http://treasuredrecipes.info/mullen-family/wp-json/wp/v2/pages","items":"http://treasuredrecipes.info/mullen-family/wp-json/wp/v2/recipe","media":"http://treasuredrecipes.info/mullen-family/wp-json/wp/v2/media"},"title":"Treasured Recipes","nameSpace":"treasured-recipes"} // eeend
    
    // if is dev. trace transitions
    // 
    // if () {
		  // $trace.enable('TRANSITION');
    // }

    return figgy;
});