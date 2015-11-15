(function () {
    'use strict';

    var gulp = require("gulp"),
     gutil = require("gulp-util"),
     webpack = require("webpack"),
     webpackConfig = require("./webpack.config.js"),
     livereload = require('gulp-livereload');

    var watchPaths = [
    './gulpfile.js',
    './webpack.config.js',
    'Scripts/**/*.js',
    'Content/**/*.css',
    'Views/**/*.cshtml'
    ];

    gulp.task("webpack", ["webpack:build-dev"], function () {
        livereload.listen();
        gulp.watch(watchPaths, ["webpack:build-dev"]);
    });

    gulp.task("build", ["webpack:build"]);
    gulp.task("webpack:build", function (callback) {
        var myConfig = Object.create(webpackConfig);
        myConfig.plugins = myConfig.plugins.concat(
            new webpack.DefinePlugin({
                "process.env": {
                    // This has effect on the react lib size            
                    "NODE_ENV": JSON.stringify("production")
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
        );

        webpack(myConfig, function (err, stats) {
            if (err) throw new gutil.PluginError("webpack:build", err);
            gutil.log("[webpack:build]", stats.toString({
                colors: true
            }));
            callback();
        });
    });

    var myDevConfig = Object.create(webpackConfig);
    myDevConfig.devtool = "eval";
    myDevConfig.debug = true;

    // create a single instance of the compiler to allow caching
    var devCompiler = webpack(myDevConfig);

    gulp.task("webpack:build-dev", function (callback) {
        // run webpack
        devCompiler.run(function (err, stats) {
            if (err) throw new gutil.PluginError("webpack:build-dev", err);
            gutil.log("[webpack:build-dev]", stats.toString({
                colors: true
            }));
            callback();
            livereload.reload();
        });
    });
})();