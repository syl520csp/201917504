$(function() {

	// 语言切换	
	$("#lang").mouseover(function(event) {

		var ex = event.clientX - $(this).position().left;
		console.log(ex);
		if (ex < 30) {
			$('.btn-bg').animate({
				left: 0 + 'px'
			}, 200);
		} else {
			$('.btn-bg').animate({
				left: 35 + 'px'
			}, 200);
		}
	});

	//鼠标滚轮事件
	var flag = 0;
	var i = 0;
	var h = $(window).innerHeight();

	$(window).resize(function(event) {
		var winW = $(this).width();
		var winH = $(this).height();
		h = winH;
		$('.wrap').css('top', i * h + 'px');
	});

	indexFunc(0);

	$(document).on("mousewheel DOMMouseScroll", function(e) {
		var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
			(e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox

		if (delta > 0) {
			// console.log(delta);
			// 向上滚
			if (flag == 0) {
				i = (i < 0 && i >= -4) ? (i + 1) : 0;
				flag = 1;
			}
			if (i == 0) {
				$('.wrap').stop().animate({
					top: i * h + 'px'
				}, 1000);
				flag = 0;
			}
			$('.wrap').stop().animate({
				top: i * h + 'px'
			}, 1000, function() {
				flag = 0;
			});
			var $index = Math.abs(i);
			indexFunc($index);
		} else if (delta < 0) {
			// 向下滚
			// console.log(delta);
			if (flag == 0) {
				i = i > -4 ? (i - 1) : -4;
				flag = 1;
			}
			if (i == -4) {
				$('.wrap').stop().animate({
					top: i * h + 'px'
				}, 1000);
				flag = 0;
			}
			$('.wrap').stop().animate({
				top: i * h + 'px'
			}, 1000, function() {
				flag = 0;
			});
			var $index = Math.abs(i);
			indexFunc($index);
		}
	});

	// 返回顶部
	$('.top').click(function(event) {
		indexFunc(0);
		$('.wrap').stop().animate({
			top: 0
		}, 600);
		flag = 0;
		i = 0;
	});

	// 点击翻页
	$("#nav li").click(function(event) {
		$target = event.target.className;
		var $index = $(this).index();
		// console.log(($index * h));
		$("#main .wrap").animate({
			top: -($index * h) + 'px'
		}, 600);
		indexFunc($index);
		i = -$index;
		console.log(i);
	});



	function indexFunc(index) {
		$('#nav ul li').removeClass('fbgColor');
		$('#nav ul li').eq(index).addClass('fbgColor');
	}
});