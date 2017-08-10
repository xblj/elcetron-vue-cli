process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const mainConfig = require('./weppack.main.config');
const rendererConfig = require('./webpack.renderer.config');

function packRenderer() {
    return new Promise((resolve, reject) => {
        rendererConfig.devtool = '';
        rendererConfig.entry = [path.resolve(__dirname, '../src/renderer/index.js')];
        rendererConfig.output.filename = '[hash].bundle.js';
        rendererConfig.plugins.push(
            // 提取css文件，防止将css与js打包到一起
            new ExtractTextPlugin('style.css'),
            new CleanWebpackPlugin(['dist'], {
                root: path.resolve(__dirname, '..'),  //根目录
                verbose: true,        　　　　　　　　//开启在控制台输出信息
                dry: false       　　　　　　　　　　//启用删除文件
            }),
            new webpack.optimize.UglifyJsPlugin()
        );
        webpack(rendererConfig, (err, stats) => {
            if (err) {
                console.log('打包渲染程序失败', err.message);
                reject();
                process.exit();
            }
            resolve();
        })
    });
}
function packMain() {
    return new Promise((resolve, reject) => {
        mainConfig.devtool = ''
        webpack(mainConfig, (err, stats) => {
            if (err) {
                console.log('主程序打包', err.message);
                reject();
                process.exit();
            }
            resolve();
        })
    });
}
packRenderer().then(() => {
    packMain();
});