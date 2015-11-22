(function () {
    'use strict';

    var webpack = require("webpack"),
        path = require('path'),
        ExtractTextPlugin = require('extract-text-webpack-plugin')

    // path
    var PATHS = {
        app: path.resolve(__dirname, 'Scripts', 'app'),
        js: path.resolve(__dirname, 'Scripts'),
        css: path.resolve(__dirname, 'Content'),
        npm: path.resolve(__dirname, 'node_modules')
    };

    var config = {
        // resolve requirer node_modules
        addVendor: function (name, path) {
            this.resolve.alias[name] = path;
            this.module.noParse.push(new RegExp(path));
        },
        // base directory
        context: PATHS.app,
        // entry point for bundle
        entry: {
            vendor: ['angular', 'angular-busy', 'angular-resource', 'angularjs-toaster', 'angular-animate'],
            app: path.resolve(PATHS.js, 'main.js')
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: "bundle.js",
            chunkFilename: "[id].chunk.js",
            publicPath: path.resolve(__dirname, 'build')
        },
        module: {
            noParse: [],
            loaders: [
                 { test: /\.js$/, loader: 'ng-annotate!babel', exclude: /node_modules|bower_components/ },
                 // Extract css files
                 { test: /\.css/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
                 // Extract scss files
                 { test: /\.scss/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') },
                 // Font loader
                 { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=100000&minetype=application/font-woff" },
                 { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=100000" },
                 { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=100000" },
                 { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=100000" },
                 { test: /\.png$/, loader: "url-loader?limit=100000" }
                 // file-loader
            ]
        },
        // resolve requirer custom modules with path
        resolve: {
            extensions: ['', '.js'],
            root: path.resolve('./'),
            modulesDirectories: ['node_modules'],
            alias: {
                app: PATHS.app,
                angularResource: path.resolve(PATHS.npm, 'ng-resource', 'lib', 'angular-resource'),
                cssSite: path.resolve(PATHS.css, 'Site.css'),
                cssBootstrap: path.resolve(PATHS.npm, 'bootstrap', 'dist', 'css', 'bootstrap.css'),
                cssAngularToaster: path.resolve(PATHS.npm, 'angularjs-toaster', 'toaster.css'),
                cssAngularBusy: path.resolve(PATHS.npm, 'angular-busy', 'dist', 'angular-busy.css')
            }
        },
        plugins: [
            // Output a single js file for all entry chunks loaded async
            new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
            // Split all depenpencies to one separated bundle
            new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
            // Use the plugin to specify the resulting filename
            new ExtractTextPlugin("bundle.css", { allChunks: true })
        ]
    };

    module.exports = config;
})();