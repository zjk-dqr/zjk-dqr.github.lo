$(function () { 							   
    var $type=$(".brand-list ul li:gt(8)");
     console.log($type);
    $type.hide();							   
    $('.more a').click(function () {          
        if ($type.is(":visible")) {
            $type.hide("fast");                
            $(this).text("显示全部");       
        } else {
            $type.show("fast");               
            $(this).text("显示精简");         
        }
        return false;					       
    })
})