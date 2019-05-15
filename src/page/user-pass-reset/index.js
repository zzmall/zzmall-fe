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
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadStepUsername();
    },
    bindEvent: function(){

        var _this = this;

        //按钮点击事件
        //第一步 通过用户名获取密码提示问题
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            //判断用户名是否存在，存在则返回密码提示问题
            if(username){
                _user.getQuestion(username, function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            //不存在
            else{
                formError.show('请输入用户名');
            }
        });
        //第二步 校验用户输入的密码提示问题答案
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            //判断是否存在，存在则返回密码提示问题
            if(answer){
                //检验该answer是否正确
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function(res){
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            //不存在
            else{
                formError.show('请输入密码提示问题答案');
            }
        });
        //第三步 修改密码
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            //判断是否存在，存在则修改密码
            if(password && password.length >= 6){
                //检验该answer是否正确
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function(res){
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            //不存在
            else{
                formError.show('请输入位数不少于6位的新密码');
            }
        });
        
    },
    //加载第一步 用户名
    loadStepUsername: function(){
        $('.step-username').show();
    },
    //加载第二步 密码提示问题
    loadStepQuestion: function(){
        //清除之前的错误提示
        formError.hide();
        //将第一步进行隐藏，显示第二步并赋值.question
        $('.step-username').hide().siblings('.step-question').show()
        .find('.question').text(this.data.question);
    },
    //加载第三步 密码
    loadStepPassword: function(){
        //清除之前的错误提示
        formError.hide();
        //将第二步进行隐藏，显示第三步
        $('.step-question').hide().siblings('.step-password').show();
    },
};

$(function(){
    page.init();
});
 