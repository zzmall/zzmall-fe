/*
 * @Author: Connor 
 * @Date: 2019-05-11 10:55:07 
*/

console.log('util mm.js');

var conf = {
    //服务器host
    serverHost: 'http://localhost:8081'
};

var _mm = {
    //网络请求
    request: function(param){
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            datatype: param.type || 'json',
            data: param.data || '',
            success: function(res){
                //请求成功
                if(0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                //没有登陆状态，需要强制登陆
                if(10 === param.status){
                    _this.doLogin();
                }
                if(1 === res.status){
                    // console.log('status=1');
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
            
        });
    },
    //获取服务器地址
    getServerUrl: function(path){
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam: function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //成功提示
    successTips: function(msg){
        alert(msg || '操作成功');
    },
    //错误提示
    errorTips: function(msg){
        alert(msg || '哪里不对了吧~');
    },
    //字段的验证，支持非空、手机、邮箱的判断
    validata: function(v, type){
        var value = $.trim(v);
        //非空检验
        if('require' === type){
            return !!value;
        }
        //手机号校验
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        //邮箱格式校验
        if('email' === type){
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    },
    //跳转到主页/首页
    goHome: function(){
        window.location.href = './index.html';
    },
    //统一登陆处理
    doLogin: function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    }
};

module.exports = _mm;