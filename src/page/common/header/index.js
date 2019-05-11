/*
 * @Author: Connor 
 * @Date: 2019-05-12 02:28:02 
*/


require('./index.css');

var _mm = require('util/mm.js');

//调用页面头部
var _header = {

    init: function(){
        this.bindEvent();
        return this;
    },
    onLoad: function(){
        var keyword = _mm.getUrlParam('keyword');
        //如果keyword存在，则回填搜索框
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent: function(){
        var _this = this;
        //点击搜索以后，做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车后，做搜索提交
        $('#search-input').keyup(function(e){
            //13是回车键的keycode
            if(e.keyCode === 13){
                _this.searchSubmit();                
            }
        });
    },
    //搜索提交
    searchSubmit: function(){
        var keyword = $.trim($('#search-input').val());
        //如果提交的时候有keyword,则正常跳转到list页
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }
        //如果keyword为空，直接返回首页
        else{
            _mm.goHome();
        }
    }
};

_header.init();