/*
 * @Author: Connor 
 * @Date: 2019-05-10 21:18:58 
*/

require('./index.css');

require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');

var _mm =  require('util/mm.js');

navSide.init({
    name: 'pass-update'
});