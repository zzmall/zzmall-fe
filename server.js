/* jshint esversion: 6 */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// 告诉 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  index: 'view/index.html'
}));

// 将文件 serve 到 port 8081
app.listen(8081, function () {
  console.log('Example app listening on port 8081!\n');
});
