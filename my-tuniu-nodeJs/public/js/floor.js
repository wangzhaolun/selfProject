/**
 * Created by lb on 2017/6/23.
 */
if(window.$===undefined){
    throw new Error("jquery必须加载");
}
jQuery.fn.scrollspy = function(options){
    //1:   获取options参数中对应target字符串
    var str = options.target;
    //2:   依据字符串获取对象 opt 楼层div
    var opt = $(str);
    $(window).scroll(function(){
        //4:   获取滚动条到页面顶部距离
        var top = $(window).scrollTop();
        //console.log(top);
        if(top<600){
            opt.fadeOut();
        }else if(top<1700){
            opt.fadeIn();
        }

        var $liList = opt.find("li:lt(4)");
        $liList.each(function(i,li){
            var floorId = $(this).children("a").attr("href");
            var floorTop = $(floorId).offset().top-150;
            //console.log(floorTop);
            if(top>=floorTop){
                $(li).addClass('active')
                    .siblings(".active")
                    .removeClass("active");
            }
        });

        if(top>1600){
            $(opt.find("li:last")).addClass('active').siblings('.active').removeClass('active');
        }
    });
}