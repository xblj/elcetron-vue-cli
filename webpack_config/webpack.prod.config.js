var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var merge = require('webpack-merge');
var path = require('path');
var baseConfig = require('./webpack.base.config');

var prodConfig = merge(baseConfig, {
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/'], {
            root: path.resolve(__dirname, '../')
        }),
        // 这个构造函数必须传参数,没法进行热替换，所以只能在产品中使用
        new ExtractTextPlugin('style-[contenthash:10].css')
    ]
});
console.log(prodConfig);
module.exports = prodConfig;
