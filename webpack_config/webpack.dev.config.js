var path = require('path');
var webpack =require('webpack');
var baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
var devConfig=merge(baseConfig,{
    entry:[
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080'
    ],
    module:{
        rules:[{
            test:/\.css$/,
            use:['style-loader','css-loader']
        }]  
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
});
console.log(devConfig);
module.exports = devConfig;
