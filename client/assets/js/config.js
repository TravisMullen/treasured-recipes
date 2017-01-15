/* jshint quotmark: true */
'use strict';
angular.module( 'app.settings', [] ).factory( 'ConfigService', function() {
	// settings exported here from `gulpfile.js`
    return {'api' : {'items' : 'http://www.treasuredrecipes.info/mullen-family/wp-json/wp/v2/recipe'}, 'title' : 'Treasured Recipes', 'nameSpace' : 'treasured-recipes'} // end
});