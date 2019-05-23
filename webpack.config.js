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
        filename: name + '.html',
        title: title,
        hash: true,
        chunks: ['common',name]
    };
};

var config = {
    //mode: 'production',
    mode: 'development',
    entry: {
        'common'            : ['./src/page/common/index.js'],
        'index'             : ['./src/page/index/index.js'],
        'list'              : ['./src/page/list/index.js'],
        'detail'            : ['./src/page/detail/index.js'],
        'cart'              : ['./src/page/cart/index.js'],
        'order-confirm'     : ['./src/page/order-confirm/index.js'],
        'order-list'        : ['./src/page/order-list/index.js'],
        'order-detail'      : ['./src/page/order-detail/index.js'],
        'payment'           : ['./src/page/payment/index.js'],
        'user-login'        : ['./src/page/user-login/index.js'],
        'user-register'     : ['./src/page/user-register/index.js'],
        'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
        'user-center'       : ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
        'result'            : ['./src/page/result/index.js'],
        'about'             : ['./src/page/about/index.js'],
    },
    output: {
        filename: 'js/[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: 8081,
        inline: true,
        // proxy: {
        //     '**/*.do': {
        //         target: 'http://test.happymmall.com',
        //         changeOrigin: true
        //     }
        // }
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
            },
            {
                test: /\.ejs$/,
                use: ['ejs-loader']
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
                common: {
                    test: /[\\/]src[\\/]page[\\/]common[\\/]/,
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 3,
                    priority: 10,
                    reuseExistingChunk: true
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
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('about', '关于ZZMall')),

    ]
};

module.exports = config;

