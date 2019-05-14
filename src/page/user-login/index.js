/*
 * @Author: Connor 
 * @Date: 2019-05-10 21:19:11 
 */

require('./index.css');
require('page/common/nav-simple/index.js');

console.log('hello login.js');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//表单里的错误提示
var formError = {
    show: function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function(){
        $('.error-item').hide().find('.err-msg').text('');        
    }
};

//page 逻辑部分
var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent: function(){

        var _this = this;
        $('#submit').click(function(){
            _this.submit();
        });
        //如果用户按下回车键，也可以进行提交
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    //提交表单
    submit: function(){
        console.log('进入submit方法');
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        //表单验证结果
        validataResult = this.formValidata(formData);
        //如果验证结果为成功
        if(validataResult.status){
            //提交表单
            _user.login(formData,function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            },function(errMsg){
                formError.show(errMsg);
            });
        }
        //如果失败
        else{
            //返回错误提示
            formError.show(validataResult.msg);
        }
    },
    //校验表单信息
    formValidata: function(formData){
        var result = {
            status: false,
            msg: ''
        };
        if(!_mm.validata(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validata(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        //验证通过
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

$(function(){
    page.init();
});
 