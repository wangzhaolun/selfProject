/**
 * Created by lb on 2017/7/20.
 */
$(function(){
    var volumeBar=$(".audio-set-volume");
    var EndX=parseInt(volumeBar.css("width"));
    var audioCtr=$('#audio-ctr');
    bgm.volume=0.5;

    //播放 or 暂停
    $(".audio-play").click(function(){
        if($(this).attr("class")=="audio-play"){
            $(this).attr("class","audio-pause");
            bgm.pause();
        }else{
            $(this).attr("class","audio-play");
            bgm.play();
        }
    });
    //旋转控件
    $(".audio-rotate-dot").click(function(){
        audioCtr.hasClass('audio-Horizontal')?audioCtr.attr('class','audio-LengthWays'):audioCtr.attr('class','audio-Horizontal');
    });

    //音量条处理事件
    volumeBar.on('mousedown',function(){
        //console.log(123);
        $(document).on('mousemove',function(e){
            //console.log(audioCtr.css("transform"));
            if(audioCtr.css("transform")!='none')
                setVolumeLengthWays(e);
            else
                setVolumeHorizontal(e);

        }).one('mouseup',function(){
            $(this).unbind('mousemove');
        });
    }).on('click',function(e){
        if(audioCtr.css("transform")!='none')
            setVolumeLengthWays(e);
        else
            setVolumeHorizontal(e);
    });
    //音量条处理函数
    function setVolumeHorizontal(e){
        e = e || window.event;
        var X = (e.clientX-volumeBar.offset().left);
        //console.log(X);
        X = (X > 0) ? (X > EndX) ? EndX : X : 0;
        var goX = (X/EndX).toFixed(2);
        //console.log(goX);
        bgm.volume=goX;
        $(".audio-back").css({
            'width' : goX*100+"%"
        });
    }
    function setVolumeLengthWays(e){
        e = e || window.event;
        var Y = (e.clientY-(volumeBar.offset().top-$(document).scrollTop()));
        Y = (Y > 0) ? (Y > EndX) ? EndX : Y : 0;
        var goY = 1-(Y/EndX).toFixed(2);
        bgm.volume=goY;
        $(".audio-back").css({
            'width' : goY*100+"%"
        });
    }
});