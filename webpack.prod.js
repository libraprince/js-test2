//该配置为代码生产配置
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = merge(common, {
    devtool: 'source-map',
    node: {
        setImmediate: false,
        process: 'mock',
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    mode: 'production', //生产模式 执行代码压缩
    optimization: {
        moduleIds: 'named',
        chunkIds: 'total-size',
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        concatenateModules: true,
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\\/]node_modules[\\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        wrappedContextRecursive: false,

        rules: [{
                test: /\.(css|sass|scss)(\?.*)?$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html(\?.*)?$/,
                exclude: /index\.html(\?.*)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        useRelativePath: true,
                        name: 'components/[name].[hash:8].html'
                    }
                }, {
                    loader: "extract-loader",
                    options: {
                        attrs: [':src', ':data-src', ':href'],
                    }
                }, {
                    loader: 'html-loader',
                    options: {
                        root: '..',
                        attrs: [':src', ':data-src', ':href'],
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].[hash:8].css',
            allChunks: true
        }),
        new webpack.AutomaticPrefetchPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        })
    ]
});

/*需要安装的包npm extract-text-webpack-plugin@next flie-loader 
'html-loader?attrs[]=img:src&attrs[]=img:data-src&attrs[]=:href!extract-loader'
*/