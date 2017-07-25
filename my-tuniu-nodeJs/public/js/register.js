$(function(){
    $("#header").load("header.html",function(){
        $("#header>p").html("欢迎注册");
        $("#header>div").html(`已有账号？
	<a href="login.html">立即登录</a>`);
    });
    $("#footer").load("footer.html");

    $("#regForm p").hide();
    $("#regForm input").focus(function(){
        $(this).parent("li").next("li").children("p").show();
        if($(this).attr("id")=="regName"){
            if($(this).val()==""){
                $(this).parent("li").next("li").html("<p>请输入手机号</p>");
            }
        }
        if($(this).attr("id")=="regPwd"){
            if($(this).val()==""){
                $(this).parent("li").next("li").html("<p>建议使用字母、数字和符号两种以上的组合,4-20个字符</p>");
            }
        }
        if($(this).attr("id")=="regPwdTwo"){
            if($(this).val()==""){
                $(this).parent("li").next("li").html("<p>请再次输入密码</p>");
            }
        }
    }).blur(function(){
        $(this).parent("li").next("li").children("p").hide();
        //console.log($(this).attr("id"));
        if($(this).attr("id")=="regName"){
            var reg=/^1[3|4|5|8]\d{9}$/;
            if(!reg.test($(this).val())&&$(this).val()!=""){
                $(this).focus().parent("li").next("li").html("<h3>输入格式不正确</h3>");
            }else if(reg.test($(this).val())){
                $(this).parent("li").next("li").html("")
            }
        }
        if($(this).attr("id")=="regPwd"){
            if(($(this).val().length<5||$(this).val().length>20)&&$(this).val()!=""){
                $(this).focus().parent("li").next("li").html("<h3>密码长度不匹配</h3>");
            }else if($(this).val().length>=5||$(this).val().length<=20){
                $(this).parent("li").next("li").html("")
            }
            if($("#regPwdTwo").val()!=""){
                var pwdT=$("#regPwdTwo").val();
                if(pwdT!=$(this).val()){
                    $("#regPwdTwo").parent("li").next("li").html("<h3>两次密码输入不一致</h3>");
                }
            }

        }
        if($(this).attr("id")=="regPwdTwo"){
            var pwd=$("#regPwd").val();
            if(pwd!=$(this).val()&&$(this).val()!=""){
                $(this).focus().parent("li").next("li").html("<h3>两次密码输入不一致</h3>");
            }else if(pwd==$(this).val()&&$(this).val()!=""){
                $(this).parent("li").next("li").html("");
            }
        }
    });

    $("#regBtn").click(function(e){
        e.preventDefault();
        function judge(){
            var result=true;
            $("#regForm input").each(function(){
                $(this).val()!=""?result=(true&&result):result=(false&&result);
            });
            return result;
        }
        if($("#regForm li:odd").is(":empty")&&judge()&&$("#regPwdTwo").val()==$("#regPwd").val()){
            var data = $('#regForm').serialize();
            console.log(data);
            $.ajax({
                type:'POST',
                url:'/user/register',
                data:data,
                success:function(data){
                    alert(data.msg);
                    location.href="login.html";
                }
            });
        }
    })
})