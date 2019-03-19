//该配置为开发模式配置
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const simple = require('./webpack.simple.js');
module.exports = merge(common, {
    mode:'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        port:9090,
    },
    plugins: [
        new webpack.NamedModulesPlugin(), //名字补丁工具
        // webpack-dev-server 强化插件
        new webpack.HotModuleReplacementPlugin(), //热模块插件
    ]
});