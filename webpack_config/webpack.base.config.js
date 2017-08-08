var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index.js',
    ],
    output: {
        // 这个是webpack打包目录
        path: path.join(__dirname, '../dist'),
        // 这个是页面静态资源目录
        publicPath: '',
        filename: '[hash].js'
    },
    module: {
        rules:[{
            test:/\.less$/,
            use:['style-loader','css-loader','less-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}