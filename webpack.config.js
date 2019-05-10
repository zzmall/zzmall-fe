/*
 * @Author: Connor 
 * @Date: 2019-05-10 21:15:29 
 */


/* jshint esversion: 6 */
const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var getHtmlConfig = function(name){
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        hash: true,
        chunks: ['common',name]
    };
};

var config = {
    entry: {
        'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js']
    },
    output: {
        filename: 'js/[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist',
        index: '/view/index.html'
    },
    externals: {
        'jquery' : 'window.jQuery'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'resource'
                        }
                    }
                ]
            }
        ]

    },
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                },
                commons: {
                    test: /[\\/]src[\\/]page[\\/]common[\\/]/,
                    name: 'common',
                    chunks: 'all'
                }
                
                
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(), //自动清理dist
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),

    ]
};

module.exports = config;

