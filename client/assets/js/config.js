'use strict';
angular.module( 'app.settings', ['ui.router'] ).factory( 'ConfigService', function( ) {
    // settings exported here from `gulpfile.js`
    var figgy = {"api":{"items":"http://www.treasuredrecipes.info/mullen-family/wp-json/wp/v2/recipe","media":"http://www.treasuredrecipes.info/mullen-family/wp-json/wp/v2/media"},"title":"Treasured Recipes","nameSpace":"treasured-recipes"} // eeend
    
    // if is dev. trace transitions
    // 
    // if () {
		  // $trace.enable('TRANSITION');
    // }

    return figgy;
});