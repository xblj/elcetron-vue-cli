'use strict'

process.env.BABEL_ENV = 'main'

const path = require('path')
const webpack = require('webpack')

const BabiliWebpackPlugin = require('babili-webpack-plugin')

let mainConfig = {
    devtool: 'source-map',
    target: 'electron-main',
    entry: [
        path.resolve(__dirname, '../src/main/main.js')
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../dist/electron/')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json']
    },
}

module.exports = mainConfig
