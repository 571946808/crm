$(function(){
    //刷新页面之后保证样式正确
    $(".navbar-nav li,.navbar-nav li ul li").each(function(){
        $this = $(this);  
        if($this[0].href==String(window.location)){  
            $this.addClass("active");  
        }  
    }); 
	//侧边栏显示隐藏
	$('.fa-exchange').click(function () {
        if ($('.bars').siblings().is(":visible") === true) {
            $('.holder, .footer').css({
                'margin-left': '30px'
            });
            $('.sidebar').css({
                'margin-left': '-200px'
            });
            $('.fa-exchange').css({
                'width':'30px'
            });
            $('#firstMenu1').hide();
            $('#firstMenu2').hide();
            $('#firstMenu3').hide();
            $('#firstMenu4').hide();
            //$('.sidebar').hide();
        } else {
            $('.holder, .footer').css({
                'margin-left': '230px'
            });
            $('.sidebar').css({
                'margin-left': '0'
            });
            $('.fa-exchange').css({
                'width':'230px'
            });
            $(".activeSidebar").show();
        }
    });
    //根据头部显示侧边栏
    $('#Menu0,#logoMenu0').click(function(){
        $('#firstMenu1').css("display","");
        $('#firstMenu1').siblings().css("display","none");
        $(".bars").css("display","block");
        $('#Menu0').parent().addClass('active');
        $('#Menu1').parent().removeClass('active');
        $('#Menu2').parent().removeClass('active');
        $('#Menu3').parent().removeClass('active');
        $('#Menu4').parent().removeClass('active');
        $('#firstMenu0').addClass('activeSidebar');
        $('#firstMenu1').removeClass('activeSidebar');
        $('#firstMenu2').removeClass('activeSidebar');
        $('#firstMenu3').removeClass('activeSidebar');
        $('#firstMenu4').removeClass('activeSidebar');

    })
    $('#Menu1,#logoMenu1').click(function(){
        $('#firstMenu1').css("display","");
        $('#firstMenu1').siblings().css("display","none");
        $(".bars").css("display","block");
        $('#Menu0').parent().removeClass('active');
        $('#Menu1').parent().addClass('active');
        $('#Menu2').parent().removeClass('active');
        $('#Menu3').parent().removeClass('active');
        $('#Menu4').parent().removeClass('active');
        $('#firstMenu0').removeClass('activeSidebar');
        $('#firstMenu1').addClass('activeSidebar');
        $('#firstMenu2').removeClass('activeSidebar');
        $('#firstMenu3').removeClass('activeSidebar');
        $('#firstMenu4').removeClass('activeSidebar');

    })
    $('#Menu2,#logoMenu2').click(function(){
        $('#firstMenu2').css("display","");
        $('#firstMenu2').siblings().css("display","none");
        $(".bars").css("display","block");
        $('#Menu0').parent().removeClass('active');
        $('#Menu1').parent().removeClass('active');
        $('#Menu2').parent().addClass('active');
        $('#Menu3').parent().removeClass('active');
        $('#Menu4').parent().removeClass('active');
        $('#firstMenu0').removeClass('activeSidebar');
        $('#firstMenu1').removeClass('activeSidebar');
        $('#firstMenu2').addClass('activeSidebar');
        $('#firstMenu3').removeClass('activeSidebar');
        $('#firstMenu4').removeClass('activeSidebar');

    })
    $('#Menu3,#logoMenu3').click(function(){
        $('#firstMenu3').css("display","");
        $('#firstMenu3').siblings().css("display","none");
        $(".bars").css("display","block");
        $('#Menu0').parent().removeClass('active');
        $('#Menu1').parent().removeClass('active');
        $('#Menu2').parent().removeClass('active');
        $('#Menu3').parent().addClass('active');
        $('#Menu4').parent().removeClass('active');
        $('#firstMenu0').removeClass('activeSidebar');
        $('#firstMenu1').removeClass('activeSidebar');
        $('#firstMenu2').removeClass('activeSidebar');
        $('#firstMenu3').addClass('activeSidebar');
        $('#firstMenu4').removeClass('activeSidebar');

    })
    $('#Menu4,#logoMenu4').click(function(){
        $('#firstMenu4').css("display","");
        $('#firstMenu4').siblings().css("display","none");
        $(".bars").css("display","block");
        $('#Menu0').parent().removeClass('active');
        $('#Menu1').parent().removeClass('active');
        $('#Menu2').parent().removeClass('active');
        $('#Menu3').parent().removeClass('active');
        $('#Menu4').parent().addClass('active');
        $('#firstMenu0').removeClass('activeSidebar');
        $('#firstMenu1').removeClass('activeSidebar');
        $('#firstMenu2').removeClass('activeSidebar');
        $('#firstMenu3').removeClass('activeSidebar');
        $('#firstMenu4').addClass('activeSidebar');

    })

    //回到顶部
    $('#back-to-top').click(function(){
    	$("html,body").animate({scrollTop:0}, 500);
    });

    //展开，收起下级菜单
    $('.J_firstMenu').click(function(){
    	var ul = $(this).next('ul'),
    		i = $(this).children(".fa-angle-right");

    	if(ul.is(':visible') === true){
    		ul.css('display','none');
    		i.css('transform','rotate(0deg)');
    	}else{
    		ul.css('display',''); 
    		i.css('transform','rotate(90deg)');
    	}
    });
});
