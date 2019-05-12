/*
 * @Author: Connor 
 * @Date: 2019-05-12 21:14:17 
*/

/* jshint esversion: 6 */
var hogan = require('hogan.js');

//渲染模板
module.exports = renderHtml = (htmlTemplate, data) => {
    var template = hogan.compile(htmlTemplate), result = template.render(data);
    return result;
};