$(function(){
    $("#header").load("data/header.php");
    $("#footer").load("data/footer.php");

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
            url:'data/login.php',
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