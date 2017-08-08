'use strict';

const path = require('path');
const webpack = require('webpack');
const BabiliWebpackPlugin = require('babili-webpack-plugin');

module.exports={
    devtool:'source-map',
    entry:{
        main:path.join(__dirname,'../src/main/main.js')
    },
    output:{
        filename:'[name].js',
        path:path.join(__dirname,'../dist/electron')
    },
    module:{
        rules:[{
            test:/\.js$/,
            use:'babel-loader',
            exclude:/node_modules/
        }]
    }
}