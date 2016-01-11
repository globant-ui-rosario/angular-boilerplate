var dirnameRegExp = new RegExp(__dirname);
var platform = process.platform;
var coverageifyConfig = {
    ignores: [
        /\.json/,
        /_tests_/,
        /_mocks_/
    ],
    contains: []
};

if (/win/.test(platform)) {
    coverageifyConfig.ignores.push(dirnameRegExp);
} else if (/linux/.test(platform)) {
    coverageifyConfig.contains.push(dirnameRegExp);
}

module.exports = function(config) {
    config.set({

        basePath: './',

        frameworks: ['browserify', 'mocha'],

        files: [
            'test-libs/globals.js',
            'modules/**/_tests_/*.js'
        ],

        preprocessors: {
            'test-libs/globals.js': [ 'browserify' ],
            'modules/**/_tests_/*.js': [ 'browserify' ]
        },

        browserify: {
            debug: true,
            transform: [ ['coverageify', coverageifyConfig] ]
        },

        browsers : ['PhantomJS'],

        reporters: ['progress', 'coverage'],

        coverageReporter : {
            dir: 'test-coverage',
            reporters: [
                {type: 'html', subdir: 'html'}
            ]
        },

        logLevel: config.LOG_ERROR,

        singleRun: false,

        autoWatch: true

    });
};