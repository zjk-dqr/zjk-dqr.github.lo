$(function () {
    $.ajax({
        url: "json/goods.json",
        type: "get",
        dataType: "json",
        success: function (data) {
            showData(data);             //显示列表数据
            attachEvent();              //注册元素事件
        }
    })
    $("#pay").click(function () {
        var table = '<table width="280px" border="1"><thead><th>商品编号</th><th>单价</th><th>订购数量</th><th>小计</th></thead><tbody>';

        $(".cart-list").each(function () {                      //循环每个购物车项
            var id = $(this).attr("title");
            var $cb = $(this).find("input[type=checkbox]");     //找到购物车项复选框
            var price = $(this).find(".price").text();          //找到购物车项价格
            var count = $(this).find("input[type=number]").val();//找到购物车项数量
            var $total = $(this).find(".total-price em");       //找到购物车项总金额   
            var total = count * price;                          //购物车项总金额
            if ($cb.is(":checked"))                             //判断复选框是否选中
            {
                table += '<tr><td>' + id+'</td><td>' + price + '</td><td>' + count + '</td><td>' + total+'</td></tr>'
            }
        })
        var sum = $('#totPirce').text();
        table += "</tbody></table><br>总金额：￥"+sum;
        $("#jieshuan").html(table)

    })
})
function showData(data)                 //显示列表数据
{
    for (var i = 0; i < data.length; i++) {
        $(".container").append('<div class="cart-list" title="'+data[i].id+'">' +
            '<div class="cart-hd">' +
            '<input type="checkbox" value=""/>' +
            '<em>' + data[i].title + '</em>' +
            '</div>' +
            '<div class="cart-items">' +
            '<dl>' +
            '<dt><img class="one" src="' + data[i].imgUrl + '"/></dt>' +
            '<div class="float">'+
            '<dd>名称：' + data[i].title + '</dd>' +
            '<dd>简介：当你第一次见到C#时，千万不要傻傻地将它读作“C井号”...</dd>' +
            '<dd>定价：￥<span class="price">' + data[i].price + '</span></dd>' +
            '</div>'+
            '</dl>' +
            '<div class="icon-del del-item" data-toggle="modal" data-target="#myModal2"><a href="#"></a></div>' +
            '</div>' +
            '<div class="subtotal">' +
            '<span class="total-price">小计：￥<em></em></span>' +
            '<span class="count">' +
            '<a href="#" onclick="return false" class="icon-minus minus">-</a><input type="number" name="" id="num" value="1" /><a href="#" onclick="return false" class="icon-add add">+</a>' +
            '</span>' +
            '</div>' +
            '</div>');
    }
}
function attachEvent()                              //注册元素事件
{
    $('.add').click(function () {                   //购物车加数量
        var count = $(this).prev().val(); 		    //获取当前数量表单中的值
        $(this).prev().val(parseInt(count) + 1);	//数量加1
        compute();                                  //重新计算购物车总价
    })
    $('.minus').click(function () {                 //购物车减数量
        var count = $(this).next().val();			//获取当前数量表单中的值
        count--;
        if (count <= 1) {							//判断不能为负数
            count = 1;
        }
        $(this).next().val(count);                  //设置值
        compute();                                  //重新计算购物车总价
    })
    //购物车(全选)
    $("#allCheck").click(function () {
        $(".container input[type='checkbox']").attr("checked", this.checked);
    })
    //购物复选框选中，重新计算
    $("input[type='checkbox']").change(function () {
        compute()
    }).trigger("change");                           //页面加载时触发
    //购物车(删除)
    $('.del-item').click(function () {
        var thisItem = $(this)
        $('.modals').show();                        //显示对话框
        $('.ok').click(function () {                //确认删除
            thisItem.parent().parent().remove();    //删除当前购物车项
            $('.modals').hide();                    //隐藏对话框
            compute();                              //重新计算购物车总价
        })
        $('.cancel').click(function () {            //取消按钮
            $('.modals').hide();                    //隐藏对话框
        })
    })
}
//计算购物车金额
function compute() {
    var sum = 0;
    $(".cart-list").each(function () {                      //循环每个购物车项
        var $cb    = $(this).find("input[type=checkbox]");  //找到购物车项复选框
        var price  = $(this).find(".price").text();         //找到购物车项价格
        var count  = $(this).find("input[type=number]").val();//找到购物车项数量
        var $total = $(this).find(".total-price em");       //找到购物车项总金额   
        $total.html(count * price);                         //购物车项总金额
        if ($cb.is(":checked"))                             //判断复选框是否选中
        {
            sum += parseFloat($total.html());               //选中累计购物车总价
        }
        $('#totPirce').text(sum)                            //显示购物车总价
    })
}