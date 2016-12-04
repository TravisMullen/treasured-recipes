/* globals require, __dirname */
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
    htmlmin = require( 'gulp-htmlmin' ),
    tplcache = require( 'gulp-angular-templatecache' ),
    rimraf = require( 'rimraf' ),
    router = require( 'front-router' ),
    sequence = require( 'run-sequence' ),
    notify = require( 'gulp-notify' ),
    watch = require( 'gulp-watch' ),
    jshint = require( 'gulp-jshint' ),
    jasmine = require( 'gulp-jasmine' ),
    jscs = require( 'gulp-jscs' ),
    change = require( 'gulp-change' ),
    jscsStylish = require( 'gulp-jscs-stylish' ),
    karma = require( 'karma' ),

    // constants
    config = require( './package.json' ),

    // globals
    Server, // for karma

    errors = [],
    warns = [],
    hadWarns = false,
    hadErrors = false;


    // declare `Server` jawn.
    Server = karma.Server;

console.log( 'config', config );

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
    sass : [,
        'client/assets/js/**/*.scss',
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
        'bower_components/angular-css/angular-css.js'//,

        // 'bower_components/foundation-apps/js/vendor/**/*.js',
        // 'bower_components/foundation-apps/js/angular/**/*.js',
        // '!bower_components/foundation-apps/js/angular/app.js'
    ],
    // These files are for JavaScript
    appJS : [
        'client/assets/js/app.js',
        'client/assets/js/**/*.js',
        '!client/assets/js/**/*test.js'
    ],
    // These files are for Tests
    spec : {  
        dir : [ 

            // components
            'client/assets/js/**/*test.js',

            // services/directives
            'spec/**/*.js',
            // './spec/**/*.js',
            
            // exclude broken shit!
            '!spec/directives/imagePreloaderDirectiveSpec.js'

         ],
        libs : [
            // libs 
            // 
            'build/assets/js/libs.js',

            // mock requirement
            'bower_components/angular-mocks/angular-mocks.js',

            // founation templates
            'build/assets/js/templates.js',

            // app (modules)
            'build/assets/js/app.js',

            // app (templates)
            'build/assets/js/treasured-recipes-templates.js',

            // spec tests
            'bower_components/lodash/dist/lodash.js'



        ],
        // globals for test files (pass lint)
        globals : [
            // lodash
            '_',
            // jasmine
            // 
            'jasmine',
            'describe',
            'beforeEach', 
            'it', 
            'expect', 
            'afterEach',
            'spyOn',
            // angular
            'angular',
            'inject',
            'module'
        ]
    }
};

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task( 'clean', function( cb ) {
    rimraf( './build', cb );
});

// // Cleans the build directory
// gulp.task( 'clean', function( cb ) {
//     rimraf( './build', cb );
// });

// Copies everything in the client folder except templates, Sass, and JS
gulp.task( 'copy', function() {
    return gulp.src( paths.assets, {
            base : './client/'
        })
        .pipe( gulp.dest( './build' ) );
});


// Copies page templates and generates URLs for them
gulp.task( 'copy:templates', function() {
    return gulp.src( ['./client/views/**/*.html','./client/assets/js/components/**/*.html'] )

        // .pipe(htmlmin({
        //     removeComments: true
        // }))
        .pipe( tplcache({
            module : config.nameSpace+'.templates',
            filename : config.name+'-templates.js',
            standalone: true
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

gulp.task( 'module-style', function() {
    var minifyCss = $.if( isProduction, $.minifyCss() );

    return gulp.src( 'client/assets/js/components/**/*.scss' )
        .pipe( $.sass({
            includePaths : ['client/assets/scss/app.scss' ,'client/assets/js/components/**/*.scss'],
            outputStyle : 'nested',
            errLogToConsole : true
        }) )
        .pipe( $.autoprefixer({
            browsers : [ 'last 2 versions', 'ie 10' ]
        }) )
        .pipe( minifyCss )
        .pipe( gulp.dest( './build/assets/css/' ) );
});

// Compiles and copies the Foundation for Apps JavaScript, as well as custom JS
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

function encapsulate( content ) {
    var temp = [];

    temp.push( '( function( ) {' );
    temp.push( '\'use strict\';' );

    temp.push( content );

    temp.push( '})( angular );' );

    return temp.join( '\r' );
}


gulp.task( 'uglify:app', function() {
    var uglify = $.if( isProduction, $.uglify()
        .on( 'error', function( e ) {
            console.log( e );
        }) );

    return gulp.src( paths.appJS )
        .pipe( uglify )
        .pipe( $.concat( 'app.js' ) )
        // .pipe( change( encapsulate ) )
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


gulp.task( 'validate:run', function() {
    watch( paths.appJS, function( file ) {

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



// Validation and Style.
// - - - - - - - - - - - - - - -

    // clean that shit up!
gulp.task( 'validate:jshint:jscs', function() {
    gulp.src( paths.appJS )
        .pipe( $.jshint( '.jshintrc' ) ) // check the quality

    .pipe( jscs({ fix : true }) ) // enforce style guide
        .pipe( jscsStylish.combineWithHintResults() ) // combine with jshint results 

    .pipe( $.jshint.reporter( 'jshint-stylish' ) )
        
        .pipe( gulp.dest( './client/assets/js' ) );
});


// gulp.task( 'validate:style:jscs', function() {
//     gulp.src( paths.appJS )
//         .pipe( $.jscs({ fix : true }) )
//         .pipe( $.jshint.reporter( 'jshint-stylish' ) )
//         .pipe( jscs.reporter( 'fail' ) )
//         .pipe( gulp.dest( './client/assets/js' ) );

// });

gulp.task( 'style:gulpfile', function() {
    // might as well clean that gulpfile up, too!
    gulp.src( 'gulpfile.js' )
        .pipe( $.jscs({ fix : true }) )
        .pipe( $.jscsStylish() )
        .pipe( jscs.reporter( 'fail' ) )
        .pipe( gulp.dest( './' ) );
});




// Build.
// - - - - - - - - - - - - - - -
// 
// Builds your entire app once, without starting a server
gulp.task( 'build', function( cb ) {
    sequence( 'clean', [ 'copy', 'copy:foundation', 'sass', 'module-style', 'uglify' ], 'copy:templates', cb );
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task( 'default', [ 'validate:jshint:jscs', 'server' ], function() {
    // Watch Sass
    gulp.watch( [ './client/assets/scss/**/**/*', './scss/**/*' ], [ 'sass' ] );
    gulp.watch( [ './client/assets/js/**/**/*.scss' ], [ 'module-style' ] );

    // Watch JavaScript
    gulp.watch( [ './client/assets/js/**/*', './js/**/*' ], [ 'uglify:app' ] );

    // Watch static files
    gulp.watch( [ './client/**/*.*', '!./client/templates/**/*.*', '!./client/assets/{scss,js}/**/*.*' ], [ 'copy' ] );

    // Watch app templates
    gulp.watch( [ './client/**/*.html' ], [ 'copy:templates' ] );
});




// Test.
// - - - - - - - - - - - - - - -

gulp.task( 'test:lint', function() {

    gulp.src( paths.spec.dir )
        .pipe( $.jshint( '.jshintrc' ) )
        // .pipe(jshint({ predef: 'jasmine '}))
        .pipe( $.jshint({
            predef : paths.spec.globals
        }) )

    .pipe( jscs({ fix : true }) ) // enforce style guide
        .pipe( jscsStylish.combineWithHintResults() ) // combine with jshint results 

    .pipe( $.jshint.reporter( 'jshint-stylish' ) )

    .pipe( gulp.dest( './spec' ) );

});


// gulp.task('test-jasmine', function() {
// gulp.src('spec/test.js')
//     // gulp-jasmine works on filepaths so you can't have any plugins before it 
//     .pipe(jasmine());

// });

var karmaConfig = {
    configFile : __dirname + '/karma.conf.js',
    files : paths.spec.libs.concat( paths.spec.dir )
};

gulp.task( 'test:run', function( done ) {
    karmaConfig.singleRun = true;
    return new Server( karmaConfig, done ).start();
});


gulp.task( 'test:watch', function( done ) {
    return new Server( karmaConfig, done ).start();
});

// TEST!
gulp.task( 'test', function( cb ) {
    sequence( [ 'build', 'test:lint' ], 'test:run', cb );
});
gulp.task( 'test:dev', function( cb ) {
    sequence( [ 'build', 'test:lint' ], 'test:watch', cb );
});
