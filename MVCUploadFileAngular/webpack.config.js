(function () {
    'use strict';

    var webpack = require("webpack"),
        path = require('path'),
        ExtractTextPlugin = require('extract-text-webpack-plugin');

    // path
    var PATHS = {
        app: path.resolve(__dirname, 'Scripts', 'app'), 
        js: path.resolve(__dirname, 'Scripts'),
        npm: path.resolve(__dirname, 'node_modules'),
        appModule: path.resolve(__dirname, 'Scripts', 'app', 'app'),
        fileUploadModule: path.resolve(__dirname, 'Scripts', 'app', 'fileupload', 'fileupload.controller')
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
            vendor: ['angular'],
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
                 { test: /\.css/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
                 { test: /\.scss/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') },
            ]
        },
        // resolve requirer custom modules with path
        resolve: {
            extensions: ['', '.js'],
            root: path.resolve(__dirname, 'Scripts'),
            modulesDirectories: ['node_modules'],
            alias: {
                appModule: PATHS.appModule,
                fileUploadModule: PATHS.fileUploadModule
            }
        },
        plugins: [
            // Combine alls chunks to one bundle
            new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
            // Create vendor bundle
            new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")]
    };

    module.exports = config;

})();