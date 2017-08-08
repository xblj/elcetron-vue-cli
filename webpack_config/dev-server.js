const electron = require('elelctron');
const {spawn} = require('child_process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const mainConfig = require('./webpack.main.config');
const rendererConfig = require('./webpack.renderer.config');


const compiler = webpack(config);
const server = new WebpackDevServer(compiler,{
    hot:true,
    filename:config.output.filename,
    publicPath:'',
    stats:{
        colors:true
    }
});
server.listen(8080,'localhost',function(err){
    if(err){
        console.log(err);
        process.exit(0);
    }
    console.log('server start');
});