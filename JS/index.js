$(function(){

	console.log("jQuery + CSS3 + 媒体查询 编写")


	// 判断滚轮滚动方向来控制nav样式
	var scrollTop = 0;
	var navFixFlag = true;
	var clearTime;
	var s2_animate_start_offset = $('.s2-body-lastItem').offset().top;
	var s2_animate_end_offset = $('.s2-animate').offset().top+500;
	var s3_animate_start_offset = $('.section-3 .s-head-body').offset().top;
	$(window).scroll(function(){

		// 向上滚 滚动条
		if ($(window).scrollTop() < scrollTop) {
			$('#nav').removeClass('navFix-up')
			$('#nav').addClass('navFix-down')
			navFixFlag = false;

			// <=60用透明底nav
			if (scrollTop <= 60) {
				$('#nav').removeClass('navFix-down')
				$('#nav').addClass('navFix-up')
				setTimeout("$('#nav').removeClass('navFix navFix-up')",200)
			}
			rightSideBarHide()

			// fixTools第三框的隐藏
			if (scrollTop <= 100) {
				$('#toolsBackToTop').addClass('toolsBackToTopHide')
				setTimeout("$('#toolsBackToTop').css('display','none');$('#toolsBackToTop').removeClass('toolsBackToTopShow toolsBackToTopHide')",500)
			}
		}

		// 向下滚 滚动条
		if ($(window).scrollTop() > scrollTop) {
			navFixFlag = true;
			$('#nav').removeClass('navFix-down')
			rightSideBarHide()

		}

		scrollTop = $(window).scrollTop()

		// 滚动时section-2动画开始
		if (scrollTop > s2_animate_start_offset && scrollTop < s2_animate_end_offset) {
			$('.c1').addClass('c1_a');
			$('.c2').addClass('c2_a');
			$('.c3').addClass('c3_a');
			$('.c4').addClass('c4_a');
			$('.c5').addClass('c5_a');
		}
		// 滚动时section-2动画结束
		if (scrollTop < s2_animate_start_offset || scrollTop > s2_animate_end_offset) {
			$('.c1').removeClass('c1_a');
			$('.c2').removeClass('c2_a');
			$('.c3').removeClass('c3_a');
			$('.c4').removeClass('c4_a');
			$('.c5').removeClass('c5_a');
		}

		// 滚动时section-3动画开始
		if (scrollTop > s3_animate_start_offset) {
			$('.s3-left').addClass('s3-left-a');
			$('.s3-right').addClass('s3-right-a');
			$('.s3-bottom').addClass('s3-bottom-a');
			$('.s3-text-left').addClass('s3-text-left-a')
			$('.s3-text-right').addClass('s3-text-right-a')
			$('.s3-text-bottom').addClass('s3-text-bottom-a')
		}
		// 滚动时section-3删除动画
		if (scrollTop < s3_animate_start_offset) {
			$('.s3-left').removeClass('s3-left-a');
			$('.s3-right').removeClass('s3-right-a');
			$('.s3-bottom').removeClass('s3-bottom-a');
			$('.s3-text-left').removeClass('s3-text-left-a')
			$('.s3-text-right').removeClass('s3-text-right-a')
			$('.s3-text-bottom').removeClass('s3-text-bottom-a')
		}


		// 大于60用白底nav，<=60用透明底nav
		if (scrollTop > 60 && navFixFlag) {
			$('#nav').addClass('navFix')
			$('#nav').addClass('navFix-up')
		}

		// fixTools第三框的显示
		if (scrollTop > 100) {
			setTimeout("$('#toolsBackToTop').addClass('toolsBackToTopShow');$('#toolsBackToTop').css('display','block')",500)
		}


	})

	// 云层飘动 start
		//飘动函数
		var cloudLeft = -7500;
		function cloudMove(){
			$('.cloud ul').css('left',cloudLeft++)                                 //运行一次left加一次1
			var cloudLeftStr = $('.cloud ul').css('left')                          //获取left值
			// console.log(typeof(cloudLeftStr)+"::::"+cloudLeftStr)
			if (Number(cloudLeftStr.substr(0,cloudLeftStr.indexOf('px'))) == 0) {  //当left=0时，重置cloudLeft
				cloudLeft = -7500;
			}
			
		}
	//100毫秒动一次
	setInterval(cloudMove,80)
	// 云层飘动 end

	// fixTools第三框的点击回到顶部
		$('#toolsBackToTop').on('click',function(){
			$('body,html').animate({
				scrollTop: 0
			},500)
		})

	// <770时导航按钮的点击事件
	var isShow = false
	$('.mini-navBtn').on('click',function(e){
		$('#rightSideBar').addClass('rightSideBar-show')
		isShow = true;
		stopPropagation(e)
		$('body').addClass('bodyLeftMove')
		// $('.navWrap').addClass('navWrapLeftMove')
	})

	// 阻止rightSideBar上点击事件冒泡到document上
	$('#rightSideBar').on('click',function(e){
		stopPropagation(e)
	})

	//右侧隐藏导航栏收起函数
	function rightSideBarHide(){
		if (isShow) {
			$('#rightSideBar').addClass('rightSideBar-hide')
			setTimeout("$('#rightSideBar').removeClass('rightSideBar-hide rightSideBar-show')",200)
			isShow = false
			$('body').addClass('bodyRightMove')
			setTimeout("$('body').removeClass('bodyRightMove bodyLeftMove')",200)
		}
	}

	//阻止事件冒泡
	function stopPropagation(e){
		if (e.stopPropagation) {
			e.stopPropagation()
		}else{
			e.cancelBubble = true
		}
	}

	// 点击rightSideBar外时隐藏rightSideBar
	$(document).on('click',function(){
		rightSideBarHide()
	})

	//section-1部分
		//head的下箭头滚动到section-1
		$('.header-arrow').on('click',function(){
			$('html,body').animate({
					scrollTop: $('.section-1').offset().top
				},500)
		})

		// li悬浮时图片动画
		$('.s1-body li').on('mouseenter',function(){
			var liNum = $(this).attr('class').substr(12,1);
			switch(liNum){
				case '1':
				s1Animation1($(this));
				break;
				case '2':
				s1Animation2($(this));
				break;
				case '3':
				s1Animation3($(this));
				break;
				case '4':
				s1Animation4($(this));
				break;
			}
		})

		$('.s1-body li').on('mouseleave',function(){
			var liNum = $(this).attr('class').substr(12,1);
			switch(liNum){
				case '1':
				$(this).find('.i-l').css('animation','none')
				$(this).find('.i-r').css('animation','none')
				break;
				case '2':
				$(this).find('.i-r').css('animation','none')
				break;
				case '3':
				$(this).find('.i-r').css('animation','none')
				break;
				case '4':
				$(this).find('.i-r').css('animation','none')
				break;
			}
		})

		//s1中四个li的动画
		function s1Animation1(e){
			e.find('.i-l').css('animation','s1-item1-l 2000ms linear 0s infinite')
			e.find('.i-r').css('animation','s1-item1-r 2000ms linear 0s infinite')
		}
		function s1Animation2(e){
			e.find('.i-r').css('animation','s1-item2 2000ms linear 0s infinite')
		}
		function s1Animation3(e){
			e.find('.i-r').css('animation','s1-item3 1000ms linear 0s infinite')
		}
		function s1Animation4(e){
			e.find('.i-r').css('animation','s1-item4 2000ms linear 0s infinite')
		}
})