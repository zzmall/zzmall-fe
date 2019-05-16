/*
 * @Author: Connor 
 * @Date: 2019-05-15 16:26:51 
*/


require('./index.css');

require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');

var _mm =  require('util/mm.js');
var _user = require('service/user-service.js');
var renderHtml = require('util/html-hogan.js');
var templateIndex = require('./index.string');

var page = {
    init: function(){
        this.onLoad();
    },
    onLoad: function(){
        //初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo: function(){
        var userHtml = '';
        //获取用户信息
        _user.getUserInfo(function(res){
            userHtml = renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};

$(function(){
    page.init();
});