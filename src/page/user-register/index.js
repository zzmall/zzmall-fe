/*
 * @Author: Connor 
 * @Date: 2019-05-14 19:11:42 
*/


require('./index.css');
require('page/common/nav-simple/index.js');

console.log('hello register.js');

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

        //验证username
        $('#username').blur(function(){
            //取username
            var username = $.trim($(this).val());
            //如果用户名为空，我们不做验证
            if(!username){
                return;
            }
            //异步验证用户名是否存在
            _user.checkUsername(username, function(res){
                formError.hide();
            }, function(errMsg){
                formError.show(errMsg);
            });
        });

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
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val()),
        };
        //表单验证结果
        validataResult = this.formValidata(formData);
        //如果验证结果为成功
        if(validataResult.status){
            //提交表单
            _user.register(formData,function(res){
                window.location.href = './result.html?type=register';
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
        //检验用户名是否为空
        if(!_mm.validata(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        //检验密码是否为空
        if(!_mm.validata(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        //检验输入的密码长度不能少于6位
        if(formData.password.length < 6){
            result.msg = '密码长度不能少于6位';
            return result;
        }
        //校验两次输入的密码是否一致
        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        //检验手机号的格式是否正确
        if(!_mm.validata(formData.phone, 'phone')){
            result.msg = '手机号格式错误';
            return result;
        }
        //检验邮箱格式是否正确
        if(!_mm.validata(formData.email, 'email')){
            result.msg = '邮箱格式错误';
            return result;
        }
        //检验密码提示问题是否为空
        if(!_mm.validata(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        //检验密码提示问题答案是否为空
        if(!_mm.validata(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
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
