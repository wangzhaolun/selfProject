/**
 * Created by lb on 2017/6/23.
 */
//轮播
if(window.$===undefined){
    throw new Error("jquery未加载");
}
//消失隐藏轮播插件
//jQuery.fn.carousel = function() {
//    var interval = 1500;
//    var $imgList = this.children("img");
//    var index = 0;
//    function slider() {
//        index++;
//        index>=4&&(index=0);
//        $imgList.eq(index)
//            .addClass("active")
//            .siblings(".active")
//            .removeClass("active");
//    }
//    var timer = setInterval(slider,interval);
//}
//左右轮播插件
jQuery.fn.carousel=function(){
    var i = 0;
    var timer = null;

    for (var j = 0; j < $('ul.carousel-img>li').length; j++) {
        $('ul.carousel-dot').append('<li></li>')
    }
    $('ul.carousel-dot>li').first().addClass('active');

    var cloneLi = $('ul.carousel-img>li').first().clone();
    $('ul.carousel-img').append(cloneLi).width($('ul.carousel-img>li').length * $('ul.carousel-img>li').width());

    $('.banner-slider').hover(function(){
        $('.carousel-btn').show();
    },function(){
        $('.carousel-btn').hide();
    });

    //右按钮
    $('.carousel-btn-next').click(function(){
        i++;
        if (i==$('ul.carousel-img>li').length) {
            i=1;
            $('ul.carousel-img').css({left:0});
        }

        $('ul.carousel-img').stop().animate({left:-i*750},400);
        if (i==$('ul.carousel-img>li').length-1) {
            $('.carousel-dot>li').eq(0).addClass('active').siblings().removeClass('active');
        }else{
            $('.carousel-dot>li').eq(i).addClass('active').siblings().removeClass('active');
        }

    });

    //左按钮
    $('.carousel-btn-prev').click(function(){
        i--;
        if (i==-1) {
            i=$('ul.carousel-img>li').length-2;
            $('ul.carousel-img').css({left:-($('ul.carousel-img>li').length-1)*750});
        }
        $('ul.carousel-img').stop().animate({left:-i*750},400);
        $('.carousel-dot>li').eq(i).addClass('active').siblings().removeClass('active');
    });

    //鼠标滑入圆点
    $('.carousel-dot li').mouseenter(function(){
        i=$(this).index();
        $('ul.carousel-img').stop().animate({left:-i*750},400);
        $('.carousel-dot li').eq(i).addClass('active').siblings().removeClass('active');
    });

    //自动轮播
    function task(){
        i++;
        if (i == $('ul.carousel-img>li').length) {
            i = 1;
            $('ul.carousel-img').css({left: 0});
        }
        $('ul.carousel-img').animate({left: -i * 750},400);
        if (i==$('ul.carousel-img>li').length-1) {
            $('ul.carousel-dot li').eq(0).addClass('active').siblings().removeClass('active');
        }else{
            $('ul.carousel-dot li').eq(i).addClass('active').siblings().removeClass('active');
        }
    }

    //开始自动轮播
    timer = setInterval(task,2500);

    //鼠标移入，暂停自动播放，移出，开始自动播放
    $('.banner-slider').hover(function(){
        clearInterval(timer);
    },function(){
        timer=setInterval(task,2500)
    })
};