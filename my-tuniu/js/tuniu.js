$(function(){

    function loadProduct(m,pageNo) {
        //console.log(123456);
        $.ajax({
            type: 'POST',
            url: 'data/product.php',
            data: {pageNo: pageNo},
            success: function (data) {
                //console.log(data);
                var html = "";
                $.each(data, function (i, obj) {
                    html+=`
                        <li>
                    <a href="">
                        <img src="${obj.pic}" alt=""/>
                        <p>${obj.pname}</p>
                    </a>
                    <b>${obj.price}</b>
                </li>
                    `;
                });
                //console.log(html);
                $("ul.product").eq(m).html(html);
            }
        })
    }
    var len=$("ul.product").length;
    for(var i=1;i<=len;i++){
        loadProduct(i-1,i);
    }


    //登录登出
    if(sessionStorage['loginUname']){
        $("div.site-menu").html("欢迎回来: "+sessionStorage['loginUname']+"  <a>退出登录</a>");
        //console.log(12345);
        $("div.site-menu").on('click','a',function(e){
            e.preventDefault();
            if(e.target.innerHTML=='退出登录'){
                sessionStorage.removeItem('loginUname');
                location.href="tuniu.html"
            }
        })
    }

    //5F手风琴效果
    var $ulList=$('#seller-container>ul');
    var $btnLeft=$('#seller-container>div.seller-btn-left');
    var $btnRight=$('#seller-container>div.seller-btn-right');
    //移动个数
    var moved=0;
    //li宽度
    var liWidth=191;
    //起始left
    var liOffset=25;
    //li的个数
    var liCount=$ulList.children('li').length;
    //console.log(liCount);
    $btnLeft.click(function(){
        if(liCount-moved>6){
            moved++;
            $ulList.css("left",-liWidth*moved+liOffset+"px")
        }
    });
    $btnRight.click(function(){
        if(moved>0){
            moved--;
            $ulList.css("left",-liWidth*moved+liOffset+"px")
        }
    });

    //6F-news切换效果
    var $divs=$('div.news-details>div');
    var $ps=$('div.news-details p');
    //限制字符个数
    $ps.each(function(){
        //console.log(arguments)
        var maxwidth=230;
        if($(this).text().length>maxwidth){
            $(this).text($(this).text().substring(0,maxwidth)+'.....');
        }
    });

    $('ul.news-title').on('mouseenter','li',function(){
        $(this).addClass('read').siblings('.read').removeClass('read');
        $divs.eq($(this).index()).addClass('active').siblings('.active').removeClass('active');
    });

});