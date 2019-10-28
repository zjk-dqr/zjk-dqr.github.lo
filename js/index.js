$(function(){
				$(window).resize(computeWidth).trigger("resize");
				imgSlider();
				
			})
			function imgSlider(){
				var length=$(".banner-box img").length;
				var index=0;
				var adTimer;
				$(".carousel").hover(function(){
					clearInterval(adTimer);
				},function(){
					adTimer=setInterval(function(){
						showImg(index);
						index++;
						if(index==length){
							index=0;
						}
					},3000);
				}).trigger("mouseleave");
			}
			function showImg(index){
				var adHeight=$(".carousel").height();
				$(".banner-box").stop(true,false).animate({
					top:-adHeight*index
				},1000)
			}
			function computeWidth(){
				var domWidth=$(window).width();
				$(".banner-box img").css("width",domWidth);
				$(".banner-box").css("height",$(".banner-box img").height()*3);
				$(".carousel").css("height",$(".banner-box img").height()+"px");
			}