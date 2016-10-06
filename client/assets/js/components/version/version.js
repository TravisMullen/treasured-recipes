'use strict';

angular.module( 'TreasuredRecipesApp.version', [
  'TreasuredRecipesApp.version.interpolate-filter',
  'TreasuredRecipesApp.version.version-directive'
] )

.value( 'version', '0.1' );
