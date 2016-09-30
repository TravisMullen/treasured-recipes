// https://www.sitepoint.com/mocking-dependencies-angularjs-tests/
describe( 'RecipeService', function() {
    'use strict';


    var service,
        $def, // promise
        $httpBackend,
        api,
        fooData,
        webStorage,
        viewRequirements,
        recipePromise,
        recipeResults;

    beforeEach( module( 'TreasuredRecipesApp' ) );

    beforeEach( function() {
        jasmine.clock().install();
    });

    afterEach( function() {
        jasmine.clock().uninstall();
    });

    beforeEach( function() {
        jasmine.addMatchers({
            // 
            // actual: data object to check for property
            // 
            // expected: property or property chain as string
            // 
            hasRequiredAttribute : function() {
                return {
                    compare : function( actual, expected ) {
                        var result = {},

                            key, // current target key/scope
                            keys, // all
                            scope = actual, // scope cause we gonna dig deep

                            // results dont exist until we find them!
                            value;


                        if ( expected.indexOf( '.' ) < 0 ) {
                            // if not nested property do shallow test
                            // 
                            value = actual[ expected ];
                        } else {
                            keys = expected.split( '.' );
                            for ( var i = 0; i < keys.length; i++ ) {
                                key = keys[ i ];

                                if ( typeof( scope[ key ] ) !== 'undefined' ) {
                                    scope = scope[ key ];

                                    if ( i === keys.length - 1 ) {
                                        // since this is last check, lets return the value
                                        value = scope;
                                    }
                                }
                            }

                        }

                        // if (typeof(value) === 'object') {
                        //     // result.message = expected + ' is an object. Please defined a spefic property.';
                        // }

                        result.pass = ( typeof( value ) !== 'undefined' );
                        // Our custom logic goes here. 
                        result.message = expected + ' is not a defined attribute ( value: ' + value + ' )!';
                        // This will be shown when test get failed
                        return result;
                        //The compare function must return a result object with: 
                        // 1. A 'pass' property that is a boolean result of the matcher
                        // 2. A 'message' property that is a string to show details when test get failed. 
                    }
                };
            }
        });
    });



    beforeEach( inject( function( recipeService, _webStorage_, $q ) {
        $def = $q;

        api = {};
        // to be mapped to ENV var
        api.host = 'http://www.treasuredrecipes.info'; // currently offsite-testing
        api.endPoint = '/mullen-family/wp-json/wp/v2';
        api.url = api.host + api.endPoint;

        viewRequirements = [
            'slug',
            'id',
            'title.rendered',
            'details.name',
            // 'details.thisWillBreakSinceItsNotFound',
            'details.recipeIngredient'
            // 'details.recipeInstructions' // not a hard set requirement
        ];

        webStorage = _webStorage_;
        webStorage.clear( true ); // clear that old shit out!

        service = recipeService;

        fooData = [ { // taken from wordpress plig-in example as what *should* be returned
            'id' : 5,
            'date' : '2016-08-16T04:27:25',
            'date_gmt' : '2016-08-16T04:27:25',
            'guid' : {
                'rendered' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/demo-recipe\/'
            },
            'modified' : '2016-08-21T21:42:30',
            'modified_gmt' : '2016-08-21T21:42:30',
            'slug' : 'demo-recipe',
            'type' : 'recipe',
            'link' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/demo-recipe\/',
            'title' : {
                'rendered' : 'Demo Recipe'
            },
            'content' : {
                'rendered' : '<p>Use this like normal post content. The recipe will automatically be included at the end of the post, or wherever you place the shortcode:<\/p>\n<p><script type="application\/ld+json">{"@context":"http:\\\/\\\/schema.org\\\/","@type":"Recipe","name":"Demo Recipe","author":{"@type":"Person","name":"travismullen.com@gmail.com"},"datePublished":"2016-08-16 04:27:25","image":"http:\\\/\\\/www.treasuredrecipes.info\\\/mullen-family\\\/wp-content\\\/uploads\\\/2016\\\/08\\\/demo-recipe.jpg","description":"This must be the best demo recipe I have ever seen. I could eat this every single day.","recipeYield":"2 people","prepTime":"PT10M","cookTime":"PT20M","recipeIngredient":["175 g tagliatelle","200 g bacon (tiny strips)","1 clove garlic","12.5 g pine kernels","50 g basil leaves","6.25 cl olive oil (extra virgin)","27.5 g Parmesan cheese (freshly grated)"],"recipeInstructions":["We\'ll be using a food processor to make the pesto. Put the garlic, pine kernels and some salt in there and process briefly.","Add the basil leaves (but keep some for the presentation) and blend to a green paste.","While processing, gradually add the olive oil and finally add the Parmesan cheese.","Bring a pot of salted water to the boil and cook your tagliatelle al dente.","Use the cooking time of the pasta to saut\\u00e9 your bacon strips.","After about 8 to 10 minutes, the pasta should be done. Drain it and put it back in the pot to mix it with the pesto.","Present the dish with some fresh basil leaves on top."],"recipeCategory":"Main Dish","recipeCuisine":"Italian"}<\/script><div id="wpurp-container-recipe-5"\n     data-id="5"\n     data-permalink="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/demo-recipe\/"\n     data-custom-link="\"\n     data-custom-link-behaviour="\"\n     data-image="http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-content\/uploads\/2016\/08\/demo-recipe.jpg"\n     data-servings-original="2" class="wpurp-container">\n\n\n    \n    <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-box">\n    <a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/demo-recipe\/print" target="_blank" class="recipe-tooltip wpurp-recipe-print-button"><i class="fa fa-print"><\/i><\/a>\n<div class="recipe-tooltip-content">\n    Print Recipe<\/div>\n<\/span>\n<span class="wpurp-recipe-title">Demo Recipe<\/span><span class="wpurp-box">\n    <\/span>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-description" style="font-style: italic;">This must be the best demo recipe I have ever seen. I could eat this every single day.<\/span>    <\/div>\n        <\/div>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-responsive-mobile">\n    <div class="wpurp-columns">\n                                                        <div class="wpurp-rows-row">\n                        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <div>\n            <img src="http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-content\/uploads\/2016\/08\/demo-recipe.jpg" alt="\" title="demo-recipe" class="wpurp-recipe-image" \/>\n    <\/div>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-stars"><i class="fa fa-star"><\/i><i class="fa fa-star"><\/i><i class="fa fa-star"><\/i><i class="fa fa-star"><\/i><i class="fa fa-star-o"><\/i><\/span>    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n            <\/div>\n        <\/div>\n    <\/div>\n        <\/div>\n                    <\/div>\n                                                                <div class="wpurp-rows-row">\n                        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <div class="wpurp-recipe-tags">\n            <div class="wpurp-recipe-tags-course">\n            <table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path fill="%highlight_color%" d="M22.7,12.3l-12-12C10.5,0.1,10.3,0,10,0H1C0.4,0,0,0.4,0,1v9c0,0.3,0.1,0.5,0.3,0.7l12,12\n\tc0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l9-9C23.1,13.3,23.1,12.7,22.7,12.3z M7,9C5.9,9,5,8.1,5,7c0-1.1,0.9-2,2-2s2,0.9,2,2\n\tC9,8.1,8.1,9,7,9z M13.7,16.7C13.5,16.9,13.3,17,13,17s-0.5-0.1-0.7-0.3l-3-3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3,3\n\tC14.1,15.7,14.1,16.3,13.7,16.7z M16.7,13.7C16.5,13.9,16.3,14,16,14s-0.5-0.1-0.7-0.3l-3-3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3,3\n\tC17.1,12.7,17.1,13.3,16.7,13.7z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-recipe-tag-name">Course<\/span>        <\/td>\n                                <td>\n            <span class="wpurp-recipe-tag-terms"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/course\/main-dish\/">Main Dish<\/a><\/span>        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n        <\/div>\n            <div class="wpurp-recipe-tags-cuisine">\n            <table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path fill="%highlight_color%" d="M22.7,12.3l-12-12C10.5,0.1,10.3,0,10,0H1C0.4,0,0,0.4,0,1v9c0,0.3,0.1,0.5,0.3,0.7l12,12\n\tc0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l9-9C23.1,13.3,23.1,12.7,22.7,12.3z M7,9C5.9,9,5,8.1,5,7c0-1.1,0.9-2,2-2s2,0.9,2,2\n\tC9,8.1,8.1,9,7,9z M13.7,16.7C13.5,16.9,13.3,17,13,17s-0.5-0.1-0.7-0.3l-3-3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3,3\n\tC14.1,15.7,14.1,16.3,13.7,16.7z M16.7,13.7C16.5,13.9,16.3,14,16,14s-0.5-0.1-0.7-0.3l-3-3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3,3\n\tC17.1,12.7,17.1,13.3,16.7,13.7z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-recipe-tag-name">Cuisine<\/span>        <\/td>\n                                <td>\n            <span class="wpurp-recipe-tag-terms"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/cuisine\/italian\/">Italian<\/a><\/span>        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n        <\/div>\n    <\/div>\n    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path data-color="color-2" fill="%highlight_color%" d="M4.3,16.6l-2.2,2.2c-0.6,0.6-0.9,1.3-0.9,2.1c0,0.8,0.3,1.6,0.9,2.1s1.3,0.9,2.1,0.9\n\tc0.8,0,1.6-0.3,2.1-0.9l2.2-2.2L4.3,16.6z"><\/path>\n<path fill="%highlight_color%" d="M22.6,5.4l-3.5-3.5c-1.1-1.1-2.6-1.8-4.2-1.8s-3.1,0.6-4.2,1.8l-8.4,8.4c-0.4,0.4-0.4,1,0,1.4l7.1,7.1\n\tC9.5,18.9,9.7,19,10,19c0,0,0,0,0,0c0.3,0,0.5-0.1,0.7-0.3L22.6,6.8C23,6.4,23,5.8,22.6,5.4z M9.2,14.6l-1.4-1.4l6.4-6.4l1.4,1.4\n\tL9.2,14.6z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-title">Prep Time<\/span>        <\/td>\n                                <td>\n            <span class="wpurp-recipe-prep-time">10<\/span> <span class="wpurp-recipe-prep-time-text">minutes<\/span>        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n<table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path data-color="color-2" fill="%highlight_color%" d="M9,9c0.6,0,1-0.4,1-1V4c0-0.6-0.4-1-1-1S8,3.4,8,4v4C8,8.6,8.4,9,9,9z"><\/path>\n<path data-color="color-2" fill="%highlight_color%" d="M4,12c0.6,0,1-0.4,1-1V7c0-0.6-0.4-1-1-1S3,6.4,3,7v4C3,11.6,3.4,12,4,12z"><\/path>\n<path data-color="color-2" fill="%highlight_color%" d="M14,12c0.6,0,1-0.4,1-1V7c0-0.6-0.4-1-1-1s-1,0.4-1,1v4C13,11.6,13.4,12,14,12z"><\/path>\n<path fill="%highlight_color%" d="M23,14h-5H1c-0.6,0-1,0.4-1,1v3c0,1.7,1.3,3,3,3h13c1.7,0,3-1.3,3-3v-1h4c0.6,0,1-0.4,1-1v-1\n\tC24,14.4,23.6,14,23,14z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-title">Cook Time<\/span>        <\/td>\n                                <td>\n            <span class="wpurp-recipe-cook-time">20<\/span> <span class="wpurp-recipe-cook-time-text">minutes<\/span>        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n<table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path data-color="color-2" fill="%highlight_color%" d="M16,16H8v-4h2v2h4v-2h2V16z"><\/path>\n<path fill="%highlight_color%" d="M23,0H1C0.4,0,0,0.4,0,1v22c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V1C24,0.4,23.6,0,23,0z M10,3h4v2h-4V3z M4,3\n\th4v2H4V3z M20,20H4V8h16V20z M20,5h-4V3h4V5z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-title">Passive Time<\/span>        <\/td>\n                                <td>\n            <span class="wpurp-recipe-passive-time">1<\/span> <span class="wpurp-recipe-passive-time-text">hour<\/span>        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path fill="%highlight_color%" d="M10,0C9.4,0,9,0.4,9,1v4H7V1c0-0.6-0.4-1-1-1S5,0.4,5,1v4H3V1c0-0.6-0.4-1-1-1S1,0.4,1,1v8c0,1.7,1.3,3,3,3\n\tv10c0,1.1,0.9,2,2,2s2-0.9,2-2V12c1.7,0,3-1.3,3-3V1C11,0.4,10.6,0,10,0z"><\/path>\n<path data-color="color-2" fill="%highlight_color%" d="M19,0c-3.3,0-6,2.7-6,6v9c0,0.6,0.4,1,1,1h2v6c0,1.1,0.9,2,2,2s2-0.9,2-2V1\n\tC20,0.4,19.6,0,19,0z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-title">Servings<\/span>        <\/td>\n                                <td>\n            <div class="wpurp-rows">\n                    <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-servings-changer"><input type="number" min="1" class="adjust-recipe-servings" data-original="2" data-start-servings="2" value="2"\/> people<\/span>    <\/div>\n                <\/div>\n        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-box">\n    <span class="wpurp-title">Ingredients<\/span><\/span>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div data-servings="2" class="wpurp-recipe-ingredients">\n    <div><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n            <\/div>\n                <div class="wpurp-rows-row">\n        <ul class="wpurp-recipe-ingredient-container">\n    <li class="wpurp-recipe-ingredient"><span data-normalized="175" data-fraction="\" data-original="175" class="wpurp-recipe-ingredient-quantity">175<\/span> <span data-original="g" class="wpurp-recipe-ingredient-unit">g<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/tagliatelle\/">tagliatelle<\/a><\/span><\/li><li class="wpurp-recipe-ingredient"><span data-normalized="200" data-fraction="\" data-original="200" class="wpurp-recipe-ingredient-quantity">200<\/span> <span data-original="g" class="wpurp-recipe-ingredient-unit">g<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/bacon\/">bacon<\/a><\/span> <span class="wpurp-recipe-ingredient-notes">tiny strips<\/span><\/li><\/ul>\n    <\/div>\n        <\/div>\n<\/div><div><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-ingredient-group">Fresh Pesto<\/span>    <\/div>\n                <div class="wpurp-rows-row">\n        <ul class="wpurp-recipe-ingredient-container">\n    <li class="wpurp-recipe-ingredient"><span data-normalized="1" data-fraction="\" data-original="1" class="wpurp-recipe-ingredient-quantity">1<\/span> <span data-original="clove" class="wpurp-recipe-ingredient-unit">clove<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/garlic\/">garlic<\/a><\/span><\/li><li class="wpurp-recipe-ingredient"><span data-normalized="12.5" data-fraction="\" data-original="12.5" class="wpurp-recipe-ingredient-quantity">12.5<\/span> <span data-original="g" class="wpurp-recipe-ingredient-unit">g<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/pine-kernels\/">pine kernels<\/a><\/span><\/li><li class="wpurp-recipe-ingredient"><span data-normalized="50" data-fraction="\" data-original="50" class="wpurp-recipe-ingredient-quantity">50<\/span> <span data-original="g" class="wpurp-recipe-ingredient-unit">g<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/basil-leaves\/">basil leaves<\/a><\/span><\/li><li class="wpurp-recipe-ingredient"><span data-normalized="6.25" data-fraction="\" data-original="6.25" class="wpurp-recipe-ingredient-quantity">6.25<\/span> <span data-original="cl" class="wpurp-recipe-ingredient-unit">cl<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/olive-oil\/">olive oil<\/a><\/span> <span class="wpurp-recipe-ingredient-notes">extra virgin<\/span><\/li><li class="wpurp-recipe-ingredient"><span data-normalized="27.5" data-fraction="\" data-original="27.5" class="wpurp-recipe-ingredient-quantity">27.5<\/span> <span data-original="g" class="wpurp-recipe-ingredient-unit">g<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/parmesan-cheese\/">Parmesan cheese<\/a><\/span> <span class="wpurp-recipe-ingredient-notes">freshly grated<\/span><\/li><\/ul>\n    <\/div>\n        <\/div>\n<\/div><\/div>\n    <\/div>\n                <\/div>\n                    <\/div>\n                                        <\/div>\n<\/div>\n<div class="wpurp-responsive-desktop">\n<table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <div class="wpurp-recipe-tags">\n            <div class="wpurp-recipe-tags-course">\n            <table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path fill="%highlight_color%" d="M22.7,12.3l-12-12C10.5,0.1,10.3,0,10,0H1C0.4,0,0,0.4,0,1v9c0,0.3,0.1,0.5,0.3,0.7l12,12\n\tc0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l9-9C23.1,13.3,23.1,12.7,22.7,12.3z M7,9C5.9,9,5,8.1,5,7c0-1.1,0.9-2,2-2s2,0.9,2,2\n\tC9,8.1,8.1,9,7,9z M13.7,16.7C13.5,16.9,13.3,17,13,17s-0.5-0.1-0.7-0.3l-3-3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3,3\n\tC14.1,15.7,14.1,16.3,13.7,16.7z M16.7,13.7C16.5,13.9,16.3,14,16,14s-0.5-0.1-0.7-0.3l-3-3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3,3\n\tC17.1,12.7,17.1,13.3,16.7,13.7z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-recipe-tag-name">Course<\/span>        <\/td>\n                                <td>\n            <span class="wpurp-recipe-tag-terms"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/course\/main-dish\/">Main Dish<\/a><\/span>        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n        <\/div>\n            <div class="wpurp-recipe-tags-cuisine">\n            <table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path fill="%highlight_color%" d="M22.7,12.3l-12-12C10.5,0.1,10.3,0,10,0H1C0.4,0,0,0.4,0,1v9c0,0.3,0.1,0.5,0.3,0.7l12,12\n\tc0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l9-9C23.1,13.3,23.1,12.7,22.7,12.3z M7,9C5.9,9,5,8.1,5,7c0-1.1,0.9-2,2-2s2,0.9,2,2\n\tC9,8.1,8.1,9,7,9z M13.7,16.7C13.5,16.9,13.3,17,13,17s-0.5-0.1-0.7-0.3l-3-3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3,3\n\tC14.1,15.7,14.1,16.3,13.7,16.7z M16.7,13.7C16.5,13.9,16.3,14,16,14s-0.5-0.1-0.7-0.3l-3-3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3,3\n\tC17.1,12.7,17.1,13.3,16.7,13.7z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-recipe-tag-name">Cuisine<\/span>        <\/td>\n                                <td>\n            <span class="wpurp-recipe-tag-terms"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/cuisine\/italian\/">Italian<\/a><\/span>        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n        <\/div>\n    <\/div>\n    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path data-color="color-2" fill="%highlight_color%" d="M4.3,16.6l-2.2,2.2c-0.6,0.6-0.9,1.3-0.9,2.1c0,0.8,0.3,1.6,0.9,2.1s1.3,0.9,2.1,0.9\n\tc0.8,0,1.6-0.3,2.1-0.9l2.2-2.2L4.3,16.6z"><\/path>\n<path fill="%highlight_color%" d="M22.6,5.4l-3.5-3.5c-1.1-1.1-2.6-1.8-4.2-1.8s-3.1,0.6-4.2,1.8l-8.4,8.4c-0.4,0.4-0.4,1,0,1.4l7.1,7.1\n\tC9.5,18.9,9.7,19,10,19c0,0,0,0,0,0c0.3,0,0.5-0.1,0.7-0.3L22.6,6.8C23,6.4,23,5.8,22.6,5.4z M9.2,14.6l-1.4-1.4l6.4-6.4l1.4,1.4\n\tL9.2,14.6z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-title">Prep Time<\/span>        <\/td>\n                                <td>\n            <span class="wpurp-recipe-prep-time">10<\/span> <span class="wpurp-recipe-prep-time-text">minutes<\/span>        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n<table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path data-color="color-2" fill="%highlight_color%" d="M9,9c0.6,0,1-0.4,1-1V4c0-0.6-0.4-1-1-1S8,3.4,8,4v4C8,8.6,8.4,9,9,9z"><\/path>\n<path data-color="color-2" fill="%highlight_color%" d="M4,12c0.6,0,1-0.4,1-1V7c0-0.6-0.4-1-1-1S3,6.4,3,7v4C3,11.6,3.4,12,4,12z"><\/path>\n<path data-color="color-2" fill="%highlight_color%" d="M14,12c0.6,0,1-0.4,1-1V7c0-0.6-0.4-1-1-1s-1,0.4-1,1v4C13,11.6,13.4,12,14,12z"><\/path>\n<path fill="%highlight_color%" d="M23,14h-5H1c-0.6,0-1,0.4-1,1v3c0,1.7,1.3,3,3,3h13c1.7,0,3-1.3,3-3v-1h4c0.6,0,1-0.4,1-1v-1\n\tC24,14.4,23.6,14,23,14z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-title">Cook Time<\/span>        <\/td>\n                                <td>\n            <span class="wpurp-recipe-cook-time">20<\/span> <span class="wpurp-recipe-cook-time-text">minutes<\/span>        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n<table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path data-color="color-2" fill="%highlight_color%" d="M16,16H8v-4h2v2h4v-2h2V16z"><\/path>\n<path fill="%highlight_color%" d="M23,0H1C0.4,0,0,0.4,0,1v22c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V1C24,0.4,23.6,0,23,0z M10,3h4v2h-4V3z M4,3\n\th4v2H4V3z M20,20H4V8h16V20z M20,5h-4V3h4V5z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-title">Passive Time<\/span>        <\/td>\n                                <td>\n            <span class="wpurp-recipe-passive-time">1<\/span> <span class="wpurp-recipe-passive-time-text">hour<\/span>        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path fill="%highlight_color%" d="M10,0C9.4,0,9,0.4,9,1v4H7V1c0-0.6-0.4-1-1-1S5,0.4,5,1v4H3V1c0-0.6-0.4-1-1-1S1,0.4,1,1v8c0,1.7,1.3,3,3,3\n\tv10c0,1.1,0.9,2,2,2s2-0.9,2-2V12c1.7,0,3-1.3,3-3V1C11,0.4,10.6,0,10,0z"><\/path>\n<path data-color="color-2" fill="%highlight_color%" d="M19,0c-3.3,0-6,2.7-6,6v9c0,0.6,0.4,1,1,1h2v6c0,1.1,0.9,2,2,2s2-0.9,2-2V1\n\tC20,0.4,19.6,0,19,0z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-title">Servings<\/span>        <\/td>\n                                <td>\n            <div class="wpurp-rows">\n                    <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-servings-changer"><input type="number" min="1" class="adjust-recipe-servings" data-original="2" data-start-servings="2" value="2"\/> people<\/span>    <\/div>\n                <\/div>\n        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-box">\n    <span class="wpurp-title">Ingredients<\/span><\/span>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div data-servings="2" class="wpurp-recipe-ingredients">\n    <div><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n            <\/div>\n                <div class="wpurp-rows-row">\n        <ul class="wpurp-recipe-ingredient-container">\n    <li class="wpurp-recipe-ingredient"><span data-normalized="175" data-fraction="\" data-original="175" class="wpurp-recipe-ingredient-quantity">175<\/span> <span data-original="g" class="wpurp-recipe-ingredient-unit">g<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/tagliatelle\/">tagliatelle<\/a><\/span><\/li><li class="wpurp-recipe-ingredient"><span data-normalized="200" data-fraction="\" data-original="200" class="wpurp-recipe-ingredient-quantity">200<\/span> <span data-original="g" class="wpurp-recipe-ingredient-unit">g<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/bacon\/">bacon<\/a><\/span> <span class="wpurp-recipe-ingredient-notes">tiny strips<\/span><\/li><\/ul>\n    <\/div>\n        <\/div>\n<\/div><div><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-ingredient-group">Fresh Pesto<\/span>    <\/div>\n                <div class="wpurp-rows-row">\n        <ul class="wpurp-recipe-ingredient-container">\n    <li class="wpurp-recipe-ingredient"><span data-normalized="1" data-fraction="\" data-original="1" class="wpurp-recipe-ingredient-quantity">1<\/span> <span data-original="clove" class="wpurp-recipe-ingredient-unit">clove<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/garlic\/">garlic<\/a><\/span><\/li><li class="wpurp-recipe-ingredient"><span data-normalized="12.5" data-fraction="\" data-original="12.5" class="wpurp-recipe-ingredient-quantity">12.5<\/span> <span data-original="g" class="wpurp-recipe-ingredient-unit">g<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/pine-kernels\/">pine kernels<\/a><\/span><\/li><li class="wpurp-recipe-ingredient"><span data-normalized="50" data-fraction="\" data-original="50" class="wpurp-recipe-ingredient-quantity">50<\/span> <span data-original="g" class="wpurp-recipe-ingredient-unit">g<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/basil-leaves\/">basil leaves<\/a><\/span><\/li><li class="wpurp-recipe-ingredient"><span data-normalized="6.25" data-fraction="\" data-original="6.25" class="wpurp-recipe-ingredient-quantity">6.25<\/span> <span data-original="cl" class="wpurp-recipe-ingredient-unit">cl<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/olive-oil\/">olive oil<\/a><\/span> <span class="wpurp-recipe-ingredient-notes">extra virgin<\/span><\/li><li class="wpurp-recipe-ingredient"><span data-normalized="27.5" data-fraction="\" data-original="27.5" class="wpurp-recipe-ingredient-quantity">27.5<\/span> <span data-original="g" class="wpurp-recipe-ingredient-unit">g<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/parmesan-cheese\/">Parmesan cheese<\/a><\/span> <span class="wpurp-recipe-ingredient-notes">freshly grated<\/span><\/li><\/ul>\n    <\/div>\n        <\/div>\n<\/div><\/div>\n    <\/div>\n                <\/div>\n        <\/td>\n                                <td>\n            <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <div>\n            <img src="http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-content\/uploads\/2016\/08\/demo-recipe.jpg" alt="\" title="demo-recipe" class="wpurp-recipe-image" \/>\n    <\/div>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-stars"><i class="fa fa-star"><\/i><i class="fa fa-star"><\/i><i class="fa fa-star"><\/i><i class="fa fa-star"><\/i><i class="fa fa-star-o"><\/i><\/span>    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n            <\/div>\n        <\/div>\n    <\/div>\n        <\/div>\n        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n<\/div>    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-box">\n    <span class="wpurp-title">Instructions<\/span><\/span>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-recipe-instructions">\n    <div><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-instruction-group">Fresh Pesto (you can make this in advance)<\/span>    <\/div>\n                <div class="wpurp-rows-row">\n        <ol class="wpurp-recipe-instruction-container">\n    <li class="wpurp-recipe-instruction"><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-instruction-text">We\'ll be using a food processor to make the pesto. Put the garlic, pine kernels and some salt in there and process briefly.<\/span>    <\/div>\n                <\/div>\n<\/li><li class="wpurp-recipe-instruction"><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-instruction-text">Add the basil leaves (but keep some for the presentation) and blend to a green paste.<\/span>    <\/div>\n                <\/div>\n<\/li><li class="wpurp-recipe-instruction"><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-instruction-text">While processing, gradually add the olive oil and finally add the Parmesan cheese.<\/span>    <\/div>\n                <\/div>\n<\/li><\/ol>\n    <\/div>\n        <\/div>\n<\/div><div><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-instruction-group">Finishing the dish<\/span>    <\/div>\n                <div class="wpurp-rows-row">\n        <ol class="wpurp-recipe-instruction-container">\n    <li class="wpurp-recipe-instruction"><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-instruction-text">Bring a pot of salted water to the boil and cook your tagliatelle al dente.<\/span>    <\/div>\n                <\/div>\n<\/li><li class="wpurp-recipe-instruction"><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-instruction-text">Use the cooking time of the pasta to saut\u00e9 your bacon strips.<\/span>    <\/div>\n                <\/div>\n<\/li><li class="wpurp-recipe-instruction"><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-instruction-text">After about 8 to 10 minutes, the pasta should be done. Drain it and put it back in the pot to mix it with the pesto.<\/span>    <\/div>\n                <\/div>\n<\/li><li class="wpurp-recipe-instruction"><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-instruction-text">Present the dish with some fresh basil leaves on top.<\/span>    <\/div>\n                <\/div>\n<\/li><\/ol>\n    <\/div>\n        <\/div>\n<\/div><\/div>\n    <\/div>\n        <\/div>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-box">\n    <span class="wpurp-title">Recipe Notes<\/span><\/span>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-recipe-notes"><p>Use this section for whatever you like.<\/p>\n<\/div>    <\/div>\n        <\/div>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-box">\n    <span class="wpurp-title">Share this Recipe<\/span><\/span>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <div data-url="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/demo-recipe\/" data-text="Demo Recipe - Powered by @WPUltimRecipe" data-layout="vertical" class="wpurp-twitter"><\/div>\n        <\/td>\n                                <td>\n            <div data-url="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/demo-recipe\/" data-layout="box_count" data-share="false" class="wpurp-facebook"><\/div>\n        <\/td>\n                                <td>\n            <div data-url="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/demo-recipe\/" data-layout="tall" data-annotation="bubble" class="wpurp-google"><\/div>\n        <\/td>\n                                <td>\n            <div data-url="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/demo-recipe\/" data-media="http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-content\/uploads\/2016\/08\/demo-recipe.jpg" data-description="Demo Recipe - Powered by @ultimaterecipe" data-layout="vertical" class="wpurp-pinterest"><\/div>\n        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n    <\/div>\n        <\/div>\n    <\/div>\n                <div class="wpurp-rows-row">\n            <\/div>\n        <\/div>\n<\/div>\n<\/p>\n<p>This text will appear below your recipe.<br \/>\n<\/p>\n'
            },
            'excerpt' : {
                'rendered' : '<p>Use this like normal post content. The recipe will automatically be included at the end of the post, or wherever you place the shortcode: Print Recipe Demo Recipe This must be the best demo recipe I have ever seen. I could eat this every single day. Course Main Dish Cuisine Italian Prep Time 10 minutes &hellip; <a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/demo-recipe\/" class="more-link">Continue reading<span class="screen-reader-text"> &#8220;Demo Recipe&#8221;<\/span><\/a><\/p>\n'
            },
            'author' : 1,
            'featured_media' : 6,
            'comment_status' : 'open',
            'ping_status' : 'closed',
            'categories' : [

            ],
            'tags' : [
                31,
                30
            ],
            'ingredient' : [
                4,
                7,
                5,
                8,
                9,
                6,
                3
            ],
            'course' : [
                11
            ],
            'cuisine' : [
                10
            ],
            'acf' : false,
            '_links' : {
                'self' : [ {
                    'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/recipe\/5'
                } ],
                'collection' : [ {
                    'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/recipe'
                } ],
                'about' : [ {
                    'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/types\/recipe'
                } ],
                'author' : [ {
                    'embeddable' : true,
                    'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/users\/1'
                } ],
                'replies' : [ {
                    'embeddable' : true,
                    'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/comments?post=5'
                } ],
                'wp:featuredmedia' : [ {
                    'embeddable' : true,
                    'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/media\/6'
                } ],
                'wp:attachment' : [ {
                    'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/media?parent=5'
                } ],
                'wp:term' : [ {
                    'taxonomy' : 'category',
                    'embeddable' : true,
                    'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/categories?post=5'
                }, {
                    'taxonomy' : 'post_tag',
                    'embeddable' : true,
                    'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/tags?post=5'
                }, {
                    'taxonomy' : 'ingredient',
                    'embeddable' : true,
                    'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/ingredient?post=5'
                }, {
                    'taxonomy' : 'course',
                    'embeddable' : true,
                    'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/course?post=5'
                }, {
                    'taxonomy' : 'cuisine',
                    'embeddable' : true,
                    'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/cuisine?post=5'
                } ],
                'curies' : [ {
                    'name' : 'wp',
                    'href' : 'https:\/\/api.w.org\/{rel}',
                    'templated' : true
                } ]
            }
        }, {
            'id' : 34,
            'date' : '2016-08-22T05:02:14',
            'date_gmt' : '2016-08-22T05:02:14',
            'guid' : { 'rendered' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/?post_type=recipe&#038;p=34' },
            'modified' : '2016-08-22T05:02:14',
            'modified_gmt' : '2016-08-22T05:02:14',
            'slug' : 'milk',
            'type' : 'recipe',
            'link' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/milk\/',
            'title' : { 'rendered' : 'Milk' },
            'content' : { 'rendered' : '\n<script type="application\/ld+json">{"@context":"http:\\\/\\\/schema.org\\\/","@type":"Recipe","name":"Heavy Cream","author":{"@type":"Person","name":"travismullen.com@gmail.com"},"datePublished":"2016-08-22 05:02:14","image":"http:\\\/\\\/www.treasuredrecipes.info\\\/mullen-family\\\/wp-content\\\/uploads\\\/2016\\\/08\\\/images-2.jpg","description":null}<\/script><div id="wpurp-container-recipe-34"\n     data-id="34"\n     data-permalink="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/milk\/"\n     data-custom-link="\"\n     data-custom-link-behaviour="\"\n     data-image="\"\n     data-servings-original="4" class="wpurp-container">\n\n\n    \n    <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-box">\n    <a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/milk\/print" target="_blank" class="recipe-tooltip wpurp-recipe-print-button"><i class="fa fa-print"><\/i><\/a>\n<div class="recipe-tooltip-content">\n    Print Recipe<\/div>\n<\/span>\n<span class="wpurp-recipe-title">Heavy Cream<\/span><span class="wpurp-box">\n    <\/span>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-description" style="font-style: italic;"><\/span>    <\/div>\n        <\/div>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-responsive-mobile">\n    <div class="wpurp-columns">\n                                                        <div class="wpurp-rows-row">\n                        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <div>\n            <img src="http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-content\/uploads\/2016\/08\/images-2.jpg" alt="\" title="images-2" class="wpurp-recipe-image" \/>\n    <\/div>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-stars"><\/span>    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n            <\/div>\n        <\/div>\n    <\/div>\n        <\/div>\n                    <\/div>\n                                                                <div class="wpurp-rows-row">\n                        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <div class="wpurp-recipe-tags">\n    <\/div>\n    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n            <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path fill="%highlight_color%" d="M10,0C9.4,0,9,0.4,9,1v4H7V1c0-0.6-0.4-1-1-1S5,0.4,5,1v4H3V1c0-0.6-0.4-1-1-1S1,0.4,1,1v8c0,1.7,1.3,3,3,3\n\tv10c0,1.1,0.9,2,2,2s2-0.9,2-2V12c1.7,0,3-1.3,3-3V1C11,0.4,10.6,0,10,0z"><\/path>\n<path data-color="color-2" fill="%highlight_color%" d="M19,0c-3.3,0-6,2.7-6,6v9c0,0.6,0.4,1,1,1h2v6c0,1.1,0.9,2,2,2s2-0.9,2-2V1\n\tC20,0.4,19.6,0,19,0z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-title">Servings<\/span>        <\/td>\n                                <td>\n            <div class="wpurp-rows">\n                    <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-servings-changer"><input type="number" min="1" class="adjust-recipe-servings" data-original="4" data-start-servings="4" value="4"\/> <\/span>    <\/div>\n                <\/div>\n        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n    <\/div>\n        <\/div>\n                    <\/div>\n                                        <\/div>\n<\/div>\n<div class="wpurp-responsive-desktop">\n<table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <div class="wpurp-recipe-tags">\n    <\/div>\n    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n            <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path fill="%highlight_color%" d="M10,0C9.4,0,9,0.4,9,1v4H7V1c0-0.6-0.4-1-1-1S5,0.4,5,1v4H3V1c0-0.6-0.4-1-1-1S1,0.4,1,1v8c0,1.7,1.3,3,3,3\n\tv10c0,1.1,0.9,2,2,2s2-0.9,2-2V12c1.7,0,3-1.3,3-3V1C11,0.4,10.6,0,10,0z"><\/path>\n<path data-color="color-2" fill="%highlight_color%" d="M19,0c-3.3,0-6,2.7-6,6v9c0,0.6,0.4,1,1,1h2v6c0,1.1,0.9,2,2,2s2-0.9,2-2V1\n\tC20,0.4,19.6,0,19,0z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-title">Servings<\/span>        <\/td>\n                                <td>\n            <div class="wpurp-rows">\n                    <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-servings-changer"><input type="number" min="1" class="adjust-recipe-servings" data-original="4" data-start-servings="4" value="4"\/> <\/span>    <\/div>\n                <\/div>\n        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n    <\/div>\n        <\/div>\n        <\/td>\n                                <td>\n            <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <div>\n            <img src="http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-content\/uploads\/2016\/08\/images-2.jpg" alt="\" title="images-2" class="wpurp-recipe-image" \/>\n    <\/div>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-stars"><\/span>    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n            <\/div>\n        <\/div>\n    <\/div>\n        <\/div>\n        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n<\/div>    <\/div>\n                <div class="wpurp-rows-row">\n            <\/div>\n                <div class="wpurp-rows-row">\n            <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-box">\n    <span class="wpurp-title">Share this Recipe<\/span><\/span>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <div data-url="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/milk\/" data-text="Heavy Cream - Powered by @WPUltimRecipe" data-layout="vertical" class="wpurp-twitter"><\/div>\n        <\/td>\n                                <td>\n            <div data-url="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/milk\/" data-layout="box_count" data-share="false" class="wpurp-facebook"><\/div>\n        <\/td>\n                                <td>\n            <div data-url="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/milk\/" data-layout="tall" data-annotation="bubble" class="wpurp-google"><\/div>\n        <\/td>\n                                <td>\n            <div data-url="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/milk\/" data-media="http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-content\/uploads\/2016\/08\/images-2.jpg" data-description="Heavy Cream - Powered by @ultimaterecipe" data-layout="vertical" class="wpurp-pinterest"><\/div>\n        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n    <\/div>\n        <\/div>\n    <\/div>\n                <div class="wpurp-rows-row">\n            <\/div>\n        <\/div>\n<\/div>\n' },
            'excerpt' : { 'rendered' : '<p>Print Recipe Heavy Cream Servings Servings Share this Recipe<\/p>\n' },
            'author' : 1,
            'featured_media' : 0,
            'comment_status' : 'open',
            'ping_status' : 'closed',
            'categories' : [],
            'tags' : [],
            'ingredient' : [],
            'course' : [],
            'cuisine' : [],
            'acf' : false,
            '_links' : { 'self' : [ { 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/recipe\/34' } ], 'collection' : [ { 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/recipe' } ], 'about' : [ { 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/types\/recipe' } ], 'author' : [ { 'embeddable' : true, 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/users\/1' } ], 'replies' : [ { 'embeddable' : true, 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/comments?post=34' } ], 'wp:attachment' : [ { 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/media?parent=34' } ], 'wp:term' : [ { 'taxonomy' : 'category', 'embeddable' : true, 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/categories?post=34' }, { 'taxonomy' : 'post_tag', 'embeddable' : true, 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/tags?post=34' }, { 'taxonomy' : 'ingredient', 'embeddable' : true, 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/ingredient?post=34' }, { 'taxonomy' : 'course', 'embeddable' : true, 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/course?post=34' }, { 'taxonomy' : 'cuisine', 'embeddable' : true, 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/cuisine?post=34' } ], 'curies' : [ { 'name' : 'wp', 'href' : 'https:\/\/api.w.org\/{rel}', 'templated' : true } ] }
        }, {
            'id' : 18,
            'date' : '2016-08-21T21:26:58',
            'date_gmt' : '2016-08-21T21:26:58',
            'guid' : { 'rendered' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/?post_type=recipe&#038;p=18' },
            'modified' : '2016-08-21T21:27:50',
            'modified_gmt' : '2016-08-21T21:27:50',
            'slug' : 'grilled-cheese',
            'type' : 'recipe',
            'link' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/grilled-cheese\/',
            'title' : { 'rendered' : 'Grilled Cheese' },
            'content' : { 'rendered' : '<p>Grilling cheeses was always so fun!<br \/>\n<\/p>\n<script type="application\/ld+json">{"@context":"http:\\\/\\\/schema.org\\\/","@type":"Recipe","name":"Toasted Cheese Sandwiches","author":{"@type":"Person","name":"travismullen.com@gmail.com"},"datePublished":"2016-08-21 21:26:58","image":"http:\\\/\\\/www.treasuredrecipes.info\\\/mullen-family\\\/wp-content\\\/uploads\\\/2016\\\/08\\\/tumblr_mg8pj5niWd1rnl2v3o1_500.png","description":"Heirloom salvia bespoke put a bird on it pinterest, brooklyn lo-fi banh mi messenger bag taxidermy plaid umami synth. Readymade affogato paleo pickled. Everyday carry 3 wolf moon slow-carb kale chips. Chillwave etsy listicle, messenger bag ennui aesthetic green juice freegan leggings. Bicycle rights celiac tofu polaroid, distillery vegan literally mlkshk intelligentsia put a bird on it hella. Actually pop-up master cleanse gluten-free, selvage tumblr twee tacos sartorial leggings synth. Pour-over tacos williamsburg quinoa.","recipeIngredient":["4 oz cheddar cheese (extra sharp!)","1 oz Parmesan cheese","4 oz Mozzarella cheese"],"recipeInstructions":["Butter bread","Fry in pan with cheese."]}<\/script><div id="wpurp-container-recipe-18"\n     data-id="18"\n     data-permalink="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/grilled-cheese\/"\n     data-custom-link="\"\n     data-custom-link-behaviour="\"\n     data-image="http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-content\/uploads\/2016\/08\/o-SAN-FRANCISCO-GRILLED-CHEESE-facebook.jpg"\n     data-servings-original="4" class="wpurp-container">\n\n\n    \n    <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-box">\n    <a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/grilled-cheese\/print" target="_blank" class="recipe-tooltip wpurp-recipe-print-button"><i class="fa fa-print"><\/i><\/a>\n<div class="recipe-tooltip-content">\n    Print Recipe<\/div>\n<\/span>\n<span class="wpurp-recipe-title">Toasted Cheese Sandwiches<\/span><span class="wpurp-box">\n    <\/span>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-description" style="font-style: italic;">Heirloom salvia bespoke put a bird on it pinterest, brooklyn lo-fi banh mi messenger bag taxidermy plaid umami synth. Readymade affogato paleo pickled. Everyday carry 3 wolf moon slow-carb kale chips. Chillwave etsy listicle, messenger bag ennui aesthetic green juice freegan leggings. Bicycle rights celiac tofu polaroid, distillery vegan literally mlkshk intelligentsia put a bird on it hella. Actually pop-up master cleanse gluten-free, selvage tumblr twee tacos sartorial leggings synth. Pour-over tacos williamsburg quinoa.<\/span>    <\/div>\n        <\/div>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-responsive-mobile">\n    <div class="wpurp-columns">\n                                                        <div class="wpurp-rows-row">\n                        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <div>\n            <img src="http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-content\/uploads\/2016\/08\/tumblr_mg8pj5niWd1rnl2v3o1_500.png" alt="\" title="tumblr_mg8pj5niWd1rnl2v3o1_500" class="wpurp-recipe-image" \/>\n    <\/div>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-stars"><\/span>    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n            <\/div>\n        <\/div>\n    <\/div>\n        <\/div>\n                    <\/div>\n                                                                <div class="wpurp-rows-row">\n                        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <div class="wpurp-recipe-tags">\n    <\/div>\n    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n            <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path fill="%highlight_color%" d="M10,0C9.4,0,9,0.4,9,1v4H7V1c0-0.6-0.4-1-1-1S5,0.4,5,1v4H3V1c0-0.6-0.4-1-1-1S1,0.4,1,1v8c0,1.7,1.3,3,3,3\n\tv10c0,1.1,0.9,2,2,2s2-0.9,2-2V12c1.7,0,3-1.3,3-3V1C11,0.4,10.6,0,10,0z"><\/path>\n<path data-color="color-2" fill="%highlight_color%" d="M19,0c-3.3,0-6,2.7-6,6v9c0,0.6,0.4,1,1,1h2v6c0,1.1,0.9,2,2,2s2-0.9,2-2V1\n\tC20,0.4,19.6,0,19,0z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-title">Servings<\/span>        <\/td>\n                                <td>\n            <div class="wpurp-rows">\n                    <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-servings-changer"><input type="number" min="1" class="adjust-recipe-servings" data-original="4" data-start-servings="4" value="4"\/> <\/span>    <\/div>\n                <\/div>\n        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-box">\n    <span class="wpurp-title">Ingredients<\/span><\/span>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div data-servings="4" class="wpurp-recipe-ingredients">\n    <div><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n            <\/div>\n                <div class="wpurp-rows-row">\n        <ul class="wpurp-recipe-ingredient-container">\n    <li class="wpurp-recipe-ingredient"><span data-normalized="4" data-fraction="\" data-original="4" class="wpurp-recipe-ingredient-quantity">4<\/span> <span data-original="oz" class="wpurp-recipe-ingredient-unit">oz<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/cheddar-cheese\/">cheddar cheese<\/a><\/span> <span class="wpurp-recipe-ingredient-notes">extra sharp!<\/span><\/li><li class="wpurp-recipe-ingredient"><span data-normalized="1" data-fraction="\" data-original="1" class="wpurp-recipe-ingredient-quantity">1<\/span> <span data-original="oz" class="wpurp-recipe-ingredient-unit">oz<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/parmesan-cheese\/">Parmesan cheese<\/a><\/span><\/li><li class="wpurp-recipe-ingredient"><span data-normalized="4" data-fraction="\" data-original="4" class="wpurp-recipe-ingredient-quantity">4<\/span> <span data-original="oz" class="wpurp-recipe-ingredient-unit">oz<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/mozzarella-cheese\/">Mozzarella cheese<\/a><\/span><\/li><\/ul>\n    <\/div>\n        <\/div>\n<\/div><\/div>\n    <\/div>\n                <\/div>\n                    <\/div>\n                                        <\/div>\n<\/div>\n<div class="wpurp-responsive-desktop">\n<table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <div class="wpurp-recipe-tags">\n    <\/div>\n    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n            <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <span class="wpurp-icon"><svg class="nc-icon glyph" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"><g>\n<path fill="%highlight_color%" d="M10,0C9.4,0,9,0.4,9,1v4H7V1c0-0.6-0.4-1-1-1S5,0.4,5,1v4H3V1c0-0.6-0.4-1-1-1S1,0.4,1,1v8c0,1.7,1.3,3,3,3\n\tv10c0,1.1,0.9,2,2,2s2-0.9,2-2V12c1.7,0,3-1.3,3-3V1C11,0.4,10.6,0,10,0z"><\/path>\n<path data-color="color-2" fill="%highlight_color%" d="M19,0c-3.3,0-6,2.7-6,6v9c0,0.6,0.4,1,1,1h2v6c0,1.1,0.9,2,2,2s2-0.9,2-2V1\n\tC20,0.4,19.6,0,19,0z"><\/path>\n<\/g><\/svg><\/span> <span class="wpurp-title">Servings<\/span>        <\/td>\n                                <td>\n            <div class="wpurp-rows">\n                    <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-servings-changer"><input type="number" min="1" class="adjust-recipe-servings" data-original="4" data-start-servings="4" value="4"\/> <\/span>    <\/div>\n                <\/div>\n        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-box">\n    <span class="wpurp-title">Ingredients<\/span><\/span>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div data-servings="4" class="wpurp-recipe-ingredients">\n    <div><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n            <\/div>\n                <div class="wpurp-rows-row">\n        <ul class="wpurp-recipe-ingredient-container">\n    <li class="wpurp-recipe-ingredient"><span data-normalized="4" data-fraction="\" data-original="4" class="wpurp-recipe-ingredient-quantity">4<\/span> <span data-original="oz" class="wpurp-recipe-ingredient-unit">oz<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/cheddar-cheese\/">cheddar cheese<\/a><\/span> <span class="wpurp-recipe-ingredient-notes">extra sharp!<\/span><\/li><li class="wpurp-recipe-ingredient"><span data-normalized="1" data-fraction="\" data-original="1" class="wpurp-recipe-ingredient-quantity">1<\/span> <span data-original="oz" class="wpurp-recipe-ingredient-unit">oz<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/parmesan-cheese\/">Parmesan cheese<\/a><\/span><\/li><li class="wpurp-recipe-ingredient"><span data-normalized="4" data-fraction="\" data-original="4" class="wpurp-recipe-ingredient-quantity">4<\/span> <span data-original="oz" class="wpurp-recipe-ingredient-unit">oz<\/span> <span class="wpurp-recipe-ingredient-name"><a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/ingredient\/mozzarella-cheese\/">Mozzarella cheese<\/a><\/span><\/li><\/ul>\n    <\/div>\n        <\/div>\n<\/div><\/div>\n    <\/div>\n                <\/div>\n        <\/td>\n                                <td>\n            <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <div>\n            <img src="http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-content\/uploads\/2016\/08\/tumblr_mg8pj5niWd1rnl2v3o1_500.png" alt="\" title="tumblr_mg8pj5niWd1rnl2v3o1_500" class="wpurp-recipe-image" \/>\n    <\/div>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-stars"><\/span>    <\/div>\n        <\/div>\n<div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n            <\/div>\n        <\/div>\n    <\/div>\n        <\/div>\n        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n<\/div>    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-box">\n    <span class="wpurp-title">Instructions<\/span><\/span>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-recipe-instructions">\n    <div><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n            <\/div>\n                <div class="wpurp-rows-row">\n        <ol class="wpurp-recipe-instruction-container">\n    <li class="wpurp-recipe-instruction"><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-instruction-text">Butter bread<\/span>    <\/div>\n                <div class="wpurp-rows-row">\n        <div><img src="http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-content\/uploads\/2016\/08\/images-1.jpg" alt="\" title="images-1" class="wpurp-recipe-instruction-image"\/><\/div>    <\/div>\n        <\/div>\n<\/li><li class="wpurp-recipe-instruction"><div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-recipe-instruction-text">Fry in pan with cheese.<\/span>    <\/div>\n                <div class="wpurp-rows-row">\n        <div><img src="http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-content\/uploads\/2016\/08\/enhanced-17688-1428598712-14-600x450.jpg" alt="\" title="enhanced-17688-1428598712-14" class="wpurp-recipe-instruction-image"\/><\/div>    <\/div>\n        <\/div>\n<\/li><\/ol>\n    <\/div>\n        <\/div>\n<\/div><\/div>\n    <\/div>\n        <\/div>\n    <\/div>\n                <div class="wpurp-rows-row">\n            <\/div>\n                <div class="wpurp-rows-row">\n        <div class="wpurp-rows">\n            <div class="wpurp-rows-row">\n        <span class="wpurp-box">\n    <span class="wpurp-title">Share this Recipe<\/span><\/span>\n    <\/div>\n                <div class="wpurp-rows-row">\n        <table class="wpurp-columns">\n    <tbody>\n    <tr>\n                        <td>\n            <div data-url="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/grilled-cheese\/" data-text="Toasted Cheese Sandwiches - Powered by @WPUltimRecipe" data-layout="vertical" class="wpurp-twitter"><\/div>\n        <\/td>\n                                <td>\n            <div data-url="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/grilled-cheese\/" data-layout="box_count" data-share="false" class="wpurp-facebook"><\/div>\n        <\/td>\n                                <td>\n            <div data-url="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/grilled-cheese\/" data-layout="tall" data-annotation="bubble" class="wpurp-google"><\/div>\n        <\/td>\n                                <td>\n            <div data-url="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/grilled-cheese\/" data-media="http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-content\/uploads\/2016\/08\/tumblr_mg8pj5niWd1rnl2v3o1_500.png" data-description="Toasted Cheese Sandwiches - Powered by @ultimaterecipe" data-layout="vertical" class="wpurp-pinterest"><\/div>\n        <\/td>\n                    <\/tr>\n    <\/tbody>\n<\/table>\n    <\/div>\n        <\/div>\n    <\/div>\n                <div class="wpurp-rows-row">\n            <\/div>\n        <\/div>\n<\/div>\n' },
            'excerpt' : { 'rendered' : '<p>Grilling cheeses was always so fun! Print Recipe Toasted Cheese Sandwiches Heirloom salvia bespoke put a bird on it pinterest, brooklyn lo-fi banh mi messenger bag taxidermy plaid umami synth. Readymade affogato paleo pickled. Everyday carry 3 wolf moon slow-carb kale chips. Chillwave etsy listicle, messenger bag ennui aesthetic green juice freegan leggings. Bicycle rights &hellip; <a href="http:\/\/www.treasuredrecipes.info\/mullen-family\/recipe\/grilled-cheese\/" class="more-link">Continue reading<span class="screen-reader-text"> &#8220;Grilled Cheese&#8221;<\/span><\/a><\/p>\n' },
            'author' : 1,
            'featured_media' : 20,
            'comment_status' : 'open',
            'ping_status' : 'closed',
            'categories' : [],
            'tags' : [ 24, 23 ],
            'ingredient' : [ 20, 22, 9 ],
            'course' : [],
            'cuisine' : [],
            'acf' : false,
            '_links' : { 'self' : [ { 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/recipe\/18' } ], 'collection' : [ { 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/recipe' } ], 'about' : [ { 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/types\/recipe' } ], 'author' : [ { 'embeddable' : true, 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/users\/1' } ], 'replies' : [ { 'embeddable' : true, 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/comments?post=18' } ], 'wp:featuredmedia' : [ { 'embeddable' : true, 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/media\/20' } ], 'wp:attachment' : [ { 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/media?parent=18' } ], 'wp:term' : [ { 'taxonomy' : 'category', 'embeddable' : true, 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/categories?post=18' }, { 'taxonomy' : 'post_tag', 'embeddable' : true, 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/tags?post=18' }, { 'taxonomy' : 'ingredient', 'embeddable' : true, 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/ingredient?post=18' }, { 'taxonomy' : 'course', 'embeddable' : true, 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/course?post=18' }, { 'taxonomy' : 'cuisine', 'embeddable' : true, 'href' : 'http:\/\/www.treasuredrecipes.info\/mullen-family\/wp-json\/wp\/v2\/cuisine?post=18' } ], 'curies' : [ { 'name' : 'wp', 'href' : 'https:\/\/api.w.org\/{rel}', 'templated' : true } ] }
        } ];




    }) );


    // it('should set required references and functions for service', function() {
    //     expect(service).toBeDefined();

    //     expect(service.error).toBeNull();

    //     expect(service.next).toBeDefined();
    //     expect(service.prev).toBeDefined();
    // });
    describe( 'Requesting a collection of recipes', function() {
        beforeEach( inject( function( _$httpBackend_ ) {
            $httpBackend = _$httpBackend_;
        }) );

        it( 'should return an array of recipes', function() {
            var results;

            $httpBackend.expectGET( api.url + '/recipe' ) // get recipes!
                .respond( fooData );

            service.recipes().then( function( data ) {
                results = data;
            });

            $httpBackend.flush();

            expect( results ).toBeDefined();
            expect( results.length ).toBeGreaterThan( 0 );
        });

        it( 'should set values in storage.', function() {

            $httpBackend.expectGET( api.url + '/recipe' ) // get recipes!
                .respond( fooData );

            service.recipes();


            spyOn( webStorage, 'get' );
            spyOn( webStorage, 'set' );

            $httpBackend.flush();

            expect( webStorage.set ).toHaveBeenCalled();
            expect( webStorage.get ).not.toHaveBeenCalled();

        });


        it( 'should augment recipe data to be filtered by the view', function() {
            var results,
                seq = 0; // which recipe?

            $httpBackend.expectGET( api.url + '/recipe' ) // get recipes!
                .respond( fooData );

            service.recipes().then( function( data ) {
                results = data;
            });

            $httpBackend.flush();

            // run test against each attrib/property
            for ( var i = 0; i < viewRequirements.length; i++ ) {
                expect( results[ seq ] ).hasRequiredAttribute( viewRequirements[ i ] );
            }
        });

    });

    describe( 'Requesting a single recipe by slug attribute', function() {
        var recipes,
            data,
            seq = 0,
            attribute = 'slug';

        it( 'should return a valid item.', function() {

            data = fooData[ seq ];

            service.get( data[ attribute ] ).then( function( res ) {
                expect( res ).toBeDefined();
                for ( var i = 0; i < viewRequirements.length; i++ ) {
                    expect( res ).hasRequiredAttribute( viewRequirements[ i ] );
                }
            });

        });

        it( 'should set last recipe.', function() {
            var promise;

            data = fooData[ seq ];

            promise = $def.all({
                get : service.get( data[ attribute ] ),
                last : service.last()
            });
            promise.then( function( res ) {
                expect( res.last ).toBeDefined();
                expect( res.last ).hasRequiredAttribute( 'id' );
                expect( res.last ).hasRequiredAttribute( 'slug' );
            });
        });
    });

    describe( 'Next Recipe', function() {
        var recipes,
            promise,
            data,
            seq = 0,
            attribute = 'slug';

        beforeEach( inject( function() {
            recipes = recipeResults;
            data = fooData[ seq ];
            service.get( data[ attribute ] ); // this is expected to be called before any other fns
            promise = service.next();

        }) );

        it( 'should return a valid item.', function() {
            promise.then( function( res ) {
                expect( res ).toBeDefined();
                expect( res ).hasRequiredAttribute( 'id' );
                expect( res ).hasRequiredAttribute( 'slug' );
            });
        });

        it( 'should return next item in array.', function() {
            var index,
                test,
                filter = function( value, key ) {
                    if ( value[ attribute ] === data[ attribute ] ) {
                        return value;
                    }
                };

            promise.then( function( res ) {
                index = recipes.indexOf( res );
                test = _.findIndex( recipes, filter );
                expect( index ).toBe( test + 1 );
            });
        });
    });

    describe( 'Previous Recipe', function() {
        var recipes,
            promise,
            data,
            seq = 0,
            attribute = 'slug';

        beforeEach( inject( function() {
            recipes = recipeResults;
            data = fooData[ seq ];
            service.get( data[ attribute ] ); // this is expected to be called before any other fns
            promise = service.prev();

        }) );

        it( 'should return a valid item.', function() {
            promise.then( function( res ) {
                expect( res ).toBeDefined();
                expect( res ).hasRequiredAttribute( 'id' );
                expect( res ).hasRequiredAttribute( 'slug' );
            });
        });

        it( 'should return previous (or last) item in array.', function() {
            var index,
                test,
                filter = function( value, key ) {
                    if ( value[ attribute ] === data[ attribute ] ) {
                        return value;
                    }
                };

            promise.then( function( res ) {
                index = recipes.indexOf( res );
                test = recipes.length;
                expect( index ).toBe( test - 1 );
            });
        });
    });

    describe( 'Cached Requests', function() {
        var recipes,
            promise,
            data,
            seq = 0,
            attribute = 'slug';

        beforeEach( inject( function( _$httpBackend_ ) {

            $httpBackend = _$httpBackend_;
            // reset local for each test        // this test will be repeated for all other tests to have fesh data
            $httpBackend.expectGET( api.url + '/recipe' ) // get recipes!
                .respond( fooData );

            service.recipes();

            $httpBackend.flush();

        }) );

        beforeEach( inject( function() {
            data = fooData[ seq ];
            promise = $def.all({
                get : service.get( data[ attribute ] ),
                last : service.last(),
                prev : service.prev()
            });
        }) );

        it( 'should not request another HTTP request.', function() {
            // $httpBackend.flush();
            promise.then( function( res ) {
                service.recipes().then( function( ores ) {
                    expect( ores ).toBeDefined();
                    expect( ores.length ).toBeGreaterThan( 0 );
                });
            });
            // expect(webStorage.set).not.toHaveBeenCalled();
            // expect(webStorage.get).toHaveBeenCalled();
        });
        it( 'if storage is cleared should request another HTTP request.', function() {

            webStorage.clear( true ); // remove that old data

            $httpBackend.expectGET( api.url + '/recipe' ) // get recipes!
                .respond( fooData );


            promise.then( function( res ) {
                service.recipes().then( function( ores ) {
                    expect( ores ).toBeDefined();
                    expect( ores.length ).toBeGreaterThan( 0 );
                });
            });

            $httpBackend.flush();
        });
        // it('should set values in storage.', function() {
        //     var results;


        //     $httpBackend.expectGET(api.url + '/recipe') // get recipes!
        //         .respond(fooData);

        //     service.recipes();


        //     spyOn(webStorage, 'get');
        //     spyOn(webStorage, 'set');

        //     $httpBackend.flush();

        //     expect(webStorage.set).toHaveBeenCalled();
        //     expect(webStorage.get).not.toHaveBeenCalled();

        // });
        // it('should resolve promise', function() {
        //   passPromise = true;

        //   var items;

        //   dataSvcObj.getData().then(function(data) {
        //     items=data;
        //   });
        //   rootScope.$digest();

        //   expect(mockDataSourceSvc.getAllItems).toHaveBeenCalled();
        //   expect(items).toEqual([]);
        // });
        // it('if cache expired should request another HTTP request.', function() {
        //     var rate = service.cache;

        //     console.log("rate",rate);

        //     // $httpBackend.expectGET(api.url + '/recipe') // get recipes!
        //     //     .respond(fooData);


        //     promise.then(function(res) {
        //         console.log("service.isCached",service.isCached());
        //         console.log("rate*0.01",rate*0.01);
        //         console.log("rate",rate);
        //         console.log("rate + rate*0.01",rate + rate*0.01);
        //         jasmine.clock().tick(rate + rate*0.01);
        //         console.log("service.isCached",service.isCached());
        //         service.recipes().then(function(ores) {


        //             expect( ores ).toBeDefined();
        //             expect( ores.length ).toBeGreaterThan(0);
        //         });
        //     });

        //     // $httpBackend.flush();
        // });



        // it('should not request another HTTP request.', function() {
        //     promise.then(function(res) {
        //         service.recipes().then(function(ores) {
        //             expect( ores ).toBeDefined();
        //             expect( ores.length ).toBeGreaterThan(0);
        //         });
        //     });
        // });
    });

    // describe('Previous Recipe', function() {
    //     var recipes,
    //         promise,
    //         data,
    //         seq = 0,
    //         attribute = 'slug';

    //     beforeEach(inject(function() {
    //         data = fooData[seq];
    //         promise = service.get(data[attribute]);

    //     }));

    //     it('should return a valid item.', function() {
    //         promise.then(function(res) {
    //             expect(res).toBeDefined();
    //             for (var i = 0; i < viewRequirements.length; i++) {
    //                 expect( res ).hasRequiredAttribute(viewRequirements[i]);
    //             }
    //         });
    //     });
    // });
    // it('should set local storage', function() {
    //     var results;

    //     service.recipes().then(function(data) {
    //         results = data;
    //     });

    //     $httpBackend.flush();

    //     expect(results).toBeDefined();
    //     expect(results.length).toBeGreaterThan(0);
    // });

    // it('should set pre/next', function() {
    //     var results;

    //     service.recipes().then(function(data) {
    //         results = data;
    //     });

    //     $httpBackend.flush();

    //     expect(results).toBeDefined();
    //     expect(results.length).toBeGreaterThan(0);
    // });
    afterEach( function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

});
