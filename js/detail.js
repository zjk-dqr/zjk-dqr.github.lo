$(function(){
    //选项卡设置
	$(".goods-details .detail-content").eq(0).show()//设置默认第一个显示
	$(".detail-hds ul li").click(function(){
		var id = $(this).index();
		$(".goods-details .detail-content").eq(id).show().siblings().hide();
		$(this).addClass(' detail-hds-li').siblings().removeClass('detail-hds-li');
	})
	var ft=true;
	$(".favOne").click(function(){
		if(ft){
			$(".favOne img").attr("src","img/images/商品详情/详情-收藏1.png");
			ft=false;
		}else{
			$(".favOne img").attr("src","img/images/商品详情/详情-收藏.png");
			ft=true;
		}
		
	})

})