// karma.conf.js
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        reporters: ['spec'],

        // use Chrome cause Phanton doesnt have click events!
        browsers: ['Chrome'],

        // browsers: ['PhantomJS','PhantomJS_custom'],

        files: [
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
            'bower_components/lodash/dist/lodash.js',
            // 'spec/**/*.js'
            'spec/directives/imagePreloaderDirectiveSpec.js'
        ],


        // // you can define custom flags 
        // customLaunchers: {
        //     'PhantomJS_custom': {
        //         base: 'PhantomJS',
        //         options: {
        //             windowName: 'myWindow',
        //             settings: {
        //                 webSecurityEnabled: false
        //             },
        //         },
        //         flags: ['--load-images=true'],
        //         debug: true
        //     }
        // },

        // phantomjsLauncher: {
        //     // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom) 
        //     exitOnResourceError: true
        // }
    });
};
