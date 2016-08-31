/* requireObjectDestructuring: false, globals require, __dirname */
'use strict';
// FOUNDATION FOR APPS TEMPLATE GULPFILE
// -------------------------------------
// This file processes all of the assets in the "client" folder, 
// combines them with the Foundation for Apps assets, 
// and outputs the finished files in the "build" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var 
    $ = require( 'gulp-load-plugins' )(),
    argv = require( 'yargs' ).argv, 
    gulp = require( 'gulp' ),
    tplcache = require( 'gulp-angular-templatecache' ),
    rimraf = require( 'rimraf' ),
    router = require( 'front-router' ),
    sequence = require( 'run-sequence' ),
    notify = require( 'gulp-notify' ),
    watch = require( 'gulp-watch' ),
    jshint = require( 'gulp-jshint' ),
    jasmine = require( 'gulp-jasmine' ),
    jscs = require( 'gulp-jscs' ),
    jscsStylish = require( 'gulp-jscs-stylish' ),
    karma = require( 'karma' ),

    // globals
    Server, // for karma

    errors = [],
    warns = [],
    hadWarns = false,
    hadErrors = false;

    // declare `Server` jawn.
    Server = karma.Server;


// Check for --production flag
var isProduction = !!( argv.production );

// 2. FILE PATHS
// - - - - - - - - - - - - - - -

var paths = {
    assets : [
        './client/**/*.*',
        '!./client/views/**/*.*',
        '!./client/assets/{scss,js}/**/*.*'
    ],
    // Sass will check these folders for files when you use @import.
    sass : [
        'client/assets/scss',
        'bower_components/foundation-apps/scss'
    ],
    // These files include Foundation for Apps and its dependencies
    libs : [
        'bower_components/fastclick/lib/fastclick.js',
        'bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
        'bower_components/tether/tether.js',
        'bower_components/hammerjs/hammer.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-webstorage/angular-webstorage.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/foundation-apps/js/vendor/**/*.js',
        'bower_components/foundation-apps/js/angular/**/*.js',
        '!bower_components/foundation-apps/js/angular/app.js'
    ],
    // These files are for your app's JavaScript
    appJS : [
        'client/assets/js/**/*.js'
    ]
}

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task( 'clean', function( cb ) {
    rimraf( './build', cb );
});

// Copies everything in the client folder except templates, Sass, and JS
gulp.task( 'copy', function() {
    return gulp.src( paths.assets, {
            base : './client/'
        })
        .pipe( gulp.dest( './build' ) );
});


gulp.task( 'lint', function() {
    gulp.src( paths.appJS )
        .pipe( $.jshint( '.jshintrc' ) )
        .pipe( $.jshint.reporter( 'jshint-stylish' ) )
        .pipe( jscs({ fix : true }) )
        .pipe( jscsStylish() )
        // .pipe( jscs.reporter( ) )
        .pipe( jscs.reporter( 'fail' ) )
        .pipe( gulp.dest( paths.appJS ) );;
});

// Copies your app's page templates and generates URLs for them
gulp.task( 'copy:templates', function() {
    return gulp.src( './client/views/**/*.html' )
        // .pipe(router({
        //   path: 'build/assets/js/routes.js',
        //   root: 'client'
        // }))
        .pipe( tplcache({
            module : 'application.templates',
            filename : 'templates-custom.js'
        }) )
        .pipe( gulp.dest( './build/assets/js' ) );
});

// Compiles the Foundation for Apps directive partials into a single JavaScript file
gulp.task( 'copy:foundation', function( cb ) {
    gulp.src( 'bower_components/foundation-apps/js/angular/components/**/*.html' )
        .pipe( $.ngHtml2js({
            prefix : 'components/',
            moduleName : 'foundation',
            declareModule : false
        }) )
        .pipe( $.uglify() )
        .pipe( $.concat( 'templates.js' ) )
        .pipe( gulp.dest( './build/assets/js' ) );

    // Iconic SVG icons
    gulp.src( './bower_components/foundation-apps/iconic/**/*' )
        .pipe( gulp.dest( './build/assets/img/iconic/' ) );

    cb();
});

// Compiles Sass
gulp.task( 'sass', function() {
    var minifyCss = $.if( isProduction, $.minifyCss() );

    return gulp.src( 'client/assets/scss/app.scss' )
        .pipe( $.sass({
            includePaths : paths.sass,
            outputStyle : ( isProduction ? 'compressed' : 'nested' ),
            errLogToConsole : true
        }) )
        .pipe( $.autoprefixer({
            browsers : [ 'last 2 versions', 'ie 10' ]
        }) )
        .pipe( minifyCss )
        .pipe( gulp.dest( './build/assets/css/' ) );
});

// Compiles and copies the Foundation for Apps JavaScript, as well as your app's custom JS
gulp.task( 'uglify', [ 'uglify:foundation', 'uglify:app' ] )

gulp.task( 'uglify:foundation', function( cb ) {
    var uglify = $.if( isProduction, $.uglify()
        .on( 'error', function( e ) {
            console.log( e );
        }) );

    return gulp.src( paths.libs )
        .pipe( uglify )
        .pipe( $.concat( 'libs.js' ) )
        .pipe( gulp.dest( './build/assets/js/' ) );
});

gulp.task( 'uglify:app', function() {
    var uglify = $.if( isProduction, $.uglify()
        .on( 'error', function( e ) {
            console.log( e );
        }) );

    return gulp.src( paths.appJS )
        .pipe( uglify )
        .pipe( $.concat( 'app.js' ) )
        .pipe( gulp.dest( './build/assets/js/' ) );
});

// Starts a test server, which you can view at http://localhost:8079
gulp.task( 'server', [ 'build' ], function() {
    gulp.src( './build' )
        .pipe( $.webserver({
            port : 8079,
            host : 'localhost',
            fallback : 'index.html',
            livereload : true,
            open : true
        }) );
});

gulp.task( 'lint', function() {
    gulp.src( [ './js/*.js', 'gulpfile.js' ] )
        .pipe( jshint( '.jshintrc' ) )
        .pipe( jshint.reporter( 'jshint-stylish' ) );
});

gulp.task( 'validate', function() {
    gulp.src( [ './js/*.js', 'gulpfile.js' ] )
        .pipe( jshint( '.jshintrc' ) ) // check the quality

    .pipe( jscs({ fix : false }) ) // enforce style guide
        .pipe( jscsStylish.combineWithHintResults() ) // combine with jshint results 

    .pipe( jshint.reporter( 'jshint-stylish' ) );
});

gulp.task( 'watch', function() {
    watch( './js/*.js', function( file ) {

        gulp.src( file.history ) // use `.history[]` to pipe only file with change event
            .pipe( jshint( '.jshintrc' ) ) // check the quality

        // .pipe( jscs({ fix : false } ) )                       // enforce style guide
        // .pipe( jscsStylish.combineWithHintResults() )       // combine with jshint results 

        .pipe( notify( function( file ) {
            var note = { title : '', message : '' };

            // send notifications 
            // -- for errors only, not warnings
            // -- if code was dirty and then bacame clean

            if ( file.jshint.success && hadErrors === false && hadWarns === false ) {
                // Don't show something if success without previous errors
                return false;
            }


            if ( !file.jshint.results ) {
                file.jshint.results = [];
            }

            // Don't show warnings
            warns = file.jshint.results.map( function( data ) {
                // only show errors `err.error.code.indexOf('E') !== -1` (not warnings)

                note.title = file.relative;

                if ( data.error && data.error.code.indexOf( 'E' ) !== -1 ) {
                    //  console.log("data.error.code.indexOf('E')",data.error.code.indexOf('E'));
                    note.message = '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                    return note.message;
                } else {
                    return false;
                }
            });

            // Did we purge all the warnings?
            if ( warns.length === 0 ) {
                if ( hadWarns ) {
                    hadWarns = false;
                    hadErrors = false;
                    note.message = 'PASSED :: This jawn is passing `jshint` and `jscs` without \warnings or errors.'
                    return note.message;
                }
            } else {
                hadWarns = true;
            }


            // remove warnings (false) from map
            errors = warns.filter( function( value ) {
                return value;
            });

            // Any errors?
            if ( errors.length === 0 ) {

                // success or not, if its no longer dirty
                // let us know!
                if ( hadErrors ) {
                    hadErrors = false;
                    note.message += 'PASSED :: This jawn is passing `jshint` and `jscs` without errors.';
                    if ( hadWarns ) {
                        note.message += ' You still have ' + warns.length + ' warnings. Nbd. ¯\\_(ツ)_/¯';
                    }
                    return note;
                }

                return false;
            } else {
                hadErrors = true;
            }
            note.message = ' (' + errors.length + ' errors)\n' + errors.join( '\n' )
            return note;
        }) )

        .pipe( jshint.reporter( 'jshint-stylish' ) );
    });
});

gulp.task( 'clean', function() {
    // clean that shit up!
    gulp.src( './js/*.js' )
        .pipe( jscs({ fix : true }) )
        .pipe( jscsStylish() )
        // .pipe( jscs.reporter( ) )
        .pipe( jscs.reporter( 'fail' ) )
        .pipe( gulp.dest( './js' ) );

});

gulp.task( 'clean-gulpfile', function() {
    // might as well clean that gulpfile up, too!
    gulp.src( 'gulpfile.js' )
        .pipe( jscs({ fix : true }) )
        .pipe( jscsStylish() )
        .pipe( jscs.reporter( 'fail' ) )
        .pipe( gulp.dest( './' ) );
});

gulp.task( 'test-lint', function() {

    gulp.src( [ './spec/**/*.js' ] )
        .pipe( jshint( '.jshintrc' ) )
        // .pipe(jshint({ predef: 'jasmine '}))
        .pipe( jshint({
            predef : [
                'describe',
                'beforeEach', 
                'it', 
                'expect', 
                'afterEach'
            ]
        }) )
        .pipe( jshint.reporter( 'jshint-stylish' ) );

});

gulp.task( 'test-style', function() {

    // clean that shit up!
    // gulp.src( './spec/*.js' )
    //     .pipe( jscs({ fix : true }) )
    //     .pipe( jscsStylish() )
    //     .pipe( gulp.dest( './spec' ) );

    gulp.src( './spec/*.js' )
        // .pipe( jscs({ fix : true }) )
        .pipe( jscsStylish() )
        // .pipe( jscs.reporter( ) )
        .pipe( jscs.reporter( 'fail' ) )
        .pipe( gulp.dest( './spec' ) );

});

// gulp.task('test-jasmine', function() {
// gulp.src('spec/test.js')
//     // gulp-jasmine works on filepaths so you can't have any plugins before it 
//     .pipe(jasmine());

// });

gulp.task( 'test-run', function( done ) {
    return new Server({
        configFile : __dirname + '/karma.conf.js',
        singleRun : true
    }, done ).start();
});


gulp.task( 'test-watch', function( done ) {
    return new Server({
        configFile : __dirname + '/karma.conf.js'
    }, done ).start();
});

gulp.task( 'test-watch-chrome', function( done ) {
    return new Server({
        configFile : __dirname + '/karma.conf.js',
        browsers : [ 'Chrome' ]
    }, done ).start();
});
// Builds your entire app once, without starting a server
gulp.task( 'build', function( cb ) {
    sequence( 'clean', [ 'copy', 'copy:foundation', 'sass', 'uglify' ], 'copy:templates', cb );
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task( 'default', [ 'lint', 'server' ], function() {
    // Watch Sass
    gulp.watch( [ './client/assets/scss/**/**/*', './scss/**/*' ], [ 'sass' ] );

    // Watch JavaScript
    gulp.watch( [ './client/assets/js/**/*', './js/**/*' ], [ 'uglify:app' ] );

    // Watch static files
    gulp.watch( [ './client/**/*.*', '!./client/templates/**/*.*', '!./client/assets/{scss,js}/**/*.*' ], [ 'copy' ] );

    // Watch app templates
    gulp.watch( [ './client/views/**/*.html' ], [ 'copy:templates' ] );
});





gulp.task( 'clean-gulpfile', function() {
    // might as well clean that gulpfile up, too!
    gulp.src( 'gulpfile.js' )
        .pipe( jscs({ fix : true }) )
        .pipe( jscsStylish() )
        .pipe( jscs.reporter( 'fail' ) )
        .pipe( gulp.dest( './' ) );
});
