'use strict'

process.env.BABEL_ENV = 'renderer';

const path = require('path')
const webpack = require('webpack')

const BabiliWebpackPlugin = require('babili-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
console.log(webpack.optimize)
const cssLoader = process.env.NODE_ENV === 'production' ?
    ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
    })
    : ['style-loader', 'css-loader'];
console.log(process.env.NODE_ENV);

const renderConfig = {
    devtool: 'source-map',
    entry: [
        // 这是webpack-dev-server的配置
        'webpack-dev-server/client?http://localhost:4040',
        // 这个是热替换的配置
        'webpack/hot/dev-server',
        // 入口文件地址，单入口
        path.resolve(__dirname, '../src/renderer/index.js')
    ],
    output: {
        filename: 'renderer.bundle.js',
        // 打包输入地址    
        path: path.resolve(__dirname, '../dist/electron/'),
        // 页面公共地址
        publicPath: ''
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            use: cssLoader
        }, {
            test: /\.vue$/,
            use: ['vue-loader']
        }]
    },
    plugins: [
        // 热替换插件
        new webpack.HotModuleReplacementPlugin(),
        // 根据模版文件生成对应的打包文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.html')
        }),
        // 这里会定义一个全局变量供程序使用
        new webpack.DefinePlugin({
            'PRODUCTION': process.env.NODE_ENV === 'production'
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        alias: {
            '@': path.join(__dirname, '../src/renderer'),
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.json', '.css']
    },
}

module.exports = renderConfig;