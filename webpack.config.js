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
var webpackDevServerOutput = require('webpack-dev-server-output');

var getHtmlConfig = function(name, title){
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
        hash: true,
        chunks: ['common',name]
    };
};

var config = {
    // mode: 'production',
    mode: 'development',
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'result': ['./src/page/result/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],

    },
    output: {
        filename: 'js/[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
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
            },
            {
                test: /\.string$/,
                use: ['html-loader']
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
        new webpackDevServerOutput({
            path: './dist',
            idDel: true
        }),
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登陆')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),

    ]
};

module.exports = config;

