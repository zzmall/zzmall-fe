/*
 * @Author: Connor 
 * @Date: 2019-05-12 15:33:53 
*/

require('./index.css');

var _mm = require('util/mm.js');

require('page/common/nav-simple/index.js');

console.log('123');

// console.log(_mm.)

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
    $element = $('.' + type + '-success').show();
    console.log(type);
});
