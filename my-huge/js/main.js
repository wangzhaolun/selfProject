window.onload=function(){
    //头部按钮点击事件
    var toggle=document.getElementById("toggle_btn");
    var patty=toggle.querySelector("div.patty");
    var header=document.getElementById("header");
    var logo=document.getElementById("logo");
    var scroll=document.getElementById("scroll");
    var bigMain=document.getElementById("big-main");
    toggle.onclick=function(){
        if(header.getAttribute("class")==null||header.getAttribute("class")==""){
            patty.style.background="transparent";
            patty.className="patty shapeChange";
            header.className="open";
            logo.className="white";
            scroll.style.zIndex="999";
        }else if(bigMain.style.top==null||bigMain.style.top=="-100%"){
            patty.style.background="#EC008C";
            patty.className="patty blank";
            header.className="";
        }else{
            patty.className="patty";
            header.className="";
            logo.className="";
            patty.style.background="#EC008C";
            scroll.style.zIndex="1000";
        }
    };
    //页面内容异步加载
    var div=document.getElementById("main-project");
    var ul=div.querySelector("ul.likeChange");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4&&xhr.status===200){
            var list = JSON.parse(xhr.responseText);
            var html='';
            for(var i=0;i<list.length;i++){
                html+=`
            <li class="title ${list[i].type}"><a href=""><img src="images/img/${list[i].img}" alt=""/></a></li>
            `;
            }
            ul.innerHTML=html;
        }
    };
    xhr.open('POST','data/data.json',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(null);

    var divss=document.getElementById("main-bottom");
    var uls=divss.querySelector("ul.small-box");
    (function(){
        var xhr1 = new XMLHttpRequest();
        xhr1.onreadystatechange = function(){
            if(xhr1.readyState===4&&xhr1.status===200){
                var list = JSON.parse(xhr1.responseText);
                var html='';
                for(var i=0;i<list.length;i++){
                    html+=`
                <li>${list[i].text}
                    <span>${list[i].time}</span>
                </li>
            `;
                }
                uls.innerHTML=html;
            }
        };
        xhr1.open('GET','data/list.json',true);
        xhr1.send(null);
    })();


    //鼠标点击圆点实现翻页
    var divs=document.querySelectorAll(
        "#project>div"
    );
    var lis=document.querySelectorAll(
        "#scroll>li"
    );
    var lastLi=document.querySelector(
        "#scroll>li.link-main"
    );
    var nav=document.getElementById("nav");

    //中转判断值
    var judge = true;
    //鼠标滚动处理当前页
    var del=0;

    //实现翻页处理函数
    function page(index){
        for(var j=0;j<lis.length-1; j++){
            lis[j].className="";
        }
        lis[index].className="active";
        for(var k=0; k<index; k++){
            divs[k].className="show";
        }
        divs[index].className="";
    }
    //点击圆点实现翻页
    for(var i=0; i<lis.length-1; i++){
        lis[i].index=i;
        lis[i].onclick=function(){
            var index=this.index;
            page(index);
            if(index==0){
                //console.log(123);
                for(var n=0; n<divs.length; n++){
                    divs[n].className="";
                }
            }
            //根据点击初始化del
            del=index;
        }
    }
    //跳转nav处理函数
    function sliderUp(){
        setTimeout(function(){
            lastLi.parentElement.className="";
            document.body.style.overflow="hidden";
            patty.className="patty";
            logo.className="";
            nav.className="";
            bigMain.style.top=0;
        },800);
    }
    //跳转主体处理函数
    function sliderDown(){
        setTimeout(function(){
            bigMain.style.top='-100%';
            patty.className="patty blank";
            logo.className="white";
            nav.className="bgc";
        },500);
        setTimeout(function(){
            document.body.style.overflow="auto";
        },1000)
    }
    //最后一个圆点点击事件处理
    lastLi.onclick=function(){
        var self=this;
        if(judge){
            judge=false;
            sliderDown();
            setTimeout(function(){
                judge=true;
                self.parentElement.className="die";
            },800)
        }
    };
    //获得滚动条到顶部的距离（考虑到兼容性的写法）自定义方法
    function getScrollTop() {
        var scrollPos;
        if (window.pageYOffset) {
            scrollPos = window.pageYOffset; }
        else if (document.compatMode && document.compatMode != 'BackCompat')
        { scrollPos = document.documentElement.scrollTop; }
        else if (document.body) { scrollPos = document.body.scrollTop; }
        return scrollPos;
    }
    //鼠标上滑
    function wheelTop(){
        var top=getScrollTop();
        if(judge){
            judge=false;
            del-=1;
            del<0&&(del=0);
            del<3&&page(del);
            if(top==0&&del>1){
                sliderUp();
            }
            //console.log(del);
            setTimeout(function(){
                judge=true;
            },1000)
        }
    }
    //鼠标下滑
    function wheelBottom(){
        if(judge){
            judge=false;
            del+=1;
            del<3?page(del):sliderDown();
            //console.log(del);
            setTimeout(function(){
                judge=true;
            },1000)
        }
    }
    //鼠标滚轮上下滚动处理函数
    var scrollFunc=function(e){
        e=e || window.event;
        if(document.body.style.overflow=="auto"){
            del=3;
        }
        if(e.wheelDelta) {
            if (e.wheelDelta > 0) {
                wheelTop();
            } else if (e.wheelDelta < 0) {
                wheelBottom();
            }
        } else if(e.detail){//firefox
           if (e.detail < 0) {
               wheelTop();
            } else if (e.detail > 0) {
               wheelBottom();
            }
        }
    };
    //为鼠标滚轮注册事件
    if(document.addEventListener){
        document.addEventListener('DOMMouseScroll',scrollFunc,false); //firefox
    }
    window.onmousewheel=document.onmousewheel=scrollFunc; //others
};
