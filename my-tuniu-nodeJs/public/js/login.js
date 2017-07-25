$(function(){
    $("#header").load("header.html");
    $("#footer").load("footer.html");

    $("#loginForm input").focus(function(){
        $("div.loginBox>p").html("");
    });


    $("#loginBtn").click(function(e){
        e.preventDefault();
        var n = $("#loginName").val();
        var p = $("#loginPwd").val();
        console.log(n,p);
        $.ajax({
            type:'POST',
            url:'/user/login',
            data:{uname:n,upwd:p},
            success:function(data){
                if(data.code<0){
                    $("div.loginBox>p").html(data.msg);
                }else{
                    $("div.loginBox>p").html(data.msg);
                    sessionStorage["loginUname"]=data.uname;
                    setInterval(function(){
                        location.href="tuniu.html"
                    },1000)
                }
            }
        });
    })
})