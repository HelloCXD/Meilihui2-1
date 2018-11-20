$(function(){
//	tab切换
	var a = $(".tab").find("a");
	for(var i = 0;i < a.length;i++){
		a.eq(i).on("click",function(){
			var i = $(this).index();
			$(this).removeClass().addClass("now_tab").siblings().removeClass();
			$("._tab").eq(i).removeClass("show").addClass("show").siblings().removeClass("show");
		})
	}

	//计算总数
    total()

    //单个商品的选中状态
    $('.list_content .confirm-wrapper').click(function () {
        var cartid = $(this).attr('cartid')
        var $that = $(this)

        $.get('/changecartstatus/', {'cartid': cartid}, function (response) {
            console.log(response)
            if (response.status == 1){
                var isselect = response.isselect
                $that.attr('isselect', isselect)
                $that.children().remove()
                if (isselect){
                    $that.append('<span class="glyphicon glyphicon-ok"></span>')
                } else {
                    $that.append('<span class="no"></span>')
                }

                //总计
                total()
            }
        })

    })

    // 全选、取消
    $('#all').click(function () {
        var isselect = $(this).attr('isselect')
        isselect = (isselect == 'false') ? true : false
        $(this).attr('isselect', isselect)

        if (isselect){
            $(this).find('span').removeClass('allno').addClass('allok')
        } else {
            $(this).find('span').removeClass('allok').addClass('allno')
        }

        $.get('/meilihui/changecartselect/',{'isselect':isselect}, function (response) {
            console.log(response)
            if (response.status == 1){
                //遍历所有购物车
                $('.confirm-wrapper').each(function () {
                    $(this).attr('isselect', isselect)
                    if (isselect){
                        $(this).find('span').removeClass('no').addClass('glyphicon glyphicon-ok')
                    } else {
                        $(this).find('span').removeClass('glyphicon glyphicon-ok').addClass('no')
                    }
                })

                //总计
                total()
            }
        })
    })

    // 总计
    function total() {
        var sum = 0

        //遍历操作
        $('.goods').each(function () {
            var $confirm = $(this).find('.confirm-wrapper')


            if ($confirm.find('.glyphicon-ok').length) {
                var price = $(this).find('.price').attr('price')
                var num = $(this).find('.num').attr('number')
                console.log(price, num)
                sum += price * num
            }
        })

        //显示

        console.log('总数'+sum)
        $('.pay .allMoney b').html(parseInt(sum))
    }


    //下单

    $('#generateorder').click(function () {
        $.get('/meilihui/generateorder/', function (response) {
            console.log(response)
            if (response.status == 1){  // 跳转到订单详情
                window.open('/meilihui/orderinfo/'+response.identifier +
                '/', target='_self')
            }
        })
    })

	//商品信息传入




	// var good = $.cookie("goods");
	// if(good){good = JSON.parse(good);}
	// $.get("/static/json/商品详情.json",function(data){
	// 	for(var i = 0;i < data.length;i++){
	// 		var obj = data[i];
	// 		for(var n = 0;n < good.length;n++){
	// 			if(obj.id == good[n].id){
	// 				$(".show").hide();
	// 				$(".shoppingList").show();
	// 				var ul = $("<ul class='ul'></ul>");
	// 				var list_content_first = $("<li class='list_content_first'></li>");
	// 				var list_img = $("<p class='list_img'></p>");
	// 				var list_img_a = $("<a href='/goods/'></a>");
	// 				var a_img = $("<img src=" + obj.index1 + " title=" + obj.title + " id=" + obj.id + " class='_img'/>");
	// 				a_img.appendTo(list_img_a);
	// 				list_img_a.appendTo(list_img);
	// 				var list_news = $("<p class='list_news'></p>");
	// 				var brand = $("<span class='brand'></span>");
	// 				var brand_a = $("<a href='index2.html'>" + obj.name + "</a>");
	// 				brand_a.appendTo(brand);
	// 				brand.appendTo(list_news);
	// 				var goods = $("<span class='goods'></span>");
	// 				var goods_a = $("<a href='goods.html'>" + obj.title + "</a>");
	// 				goods_a.appendTo(goods);
	// 				var span = $("<span>尺寸：OS</span>");
	// 				list_news.append(brand,goods,span);
	// 				list_content_first.append(list_img,list_news);
	// 				var li_two = $("<li>￥<span class='obj_p'>" + obj.pri + "</span></li>");
	// 				var li_three = $("<li></li>");
	// 				var number = $("<div class='number'></div>");
	// 				var reduce = $("<span class='reduce'></span>");
	// 				var num = $("<span class='num'>" + good[n].num + "</span>");
	// 				var add = $("<span class='add'></span>");
	// 				number.append(reduce,num,add);
	// 				li_three.append(number);
	// 				var li_four = $("<li></li>");
	// 				var li_five = $("<li class='price1'>￥<span>" + obj.pri*good[n].num + "</span></li>");
	// 				var li_six = $("<li><img src='/static/img/no_shopping.png' class='del' /></li>");
	// 				ul.append(list_content_first,li_two,li_three,li_four,li_five,li_six);
	// 				$(".list_content").append(ul);
	// 			}
	// 		}
	// 	}
	// 	color();
	// 	del();
	// 	total();
	// 	//商品加减
	// 	for(var x = 0;x < $(".ul").length;x++){
	// 		var obj_p = $(".ul").eq(x).find(".obj_p").html();
	// 		$(".ul").eq(x).find(".add").on("click",function(){
	// 			var x = $(this).parents(".ul").index();
	// 			for(var n = 0;n < good.length;n++){
	// 				if($(".ul").eq(x).find("._img").attr("id") == good[n].id){
	// 					good[n].num++;
	// 					$(".ul").eq(x).find(".num").html(good[n].num);
	// 					$(".ul").eq(x).find(".price1").children("span").html(obj_p*good[n].num);
	// 					$.cookie("goods", JSON.stringify(good), {expires:100, path:"/"});
	// 				}
	// 			}
	// 			if($(".ul").eq(x).find(".num").html() > 1){
	// 				$(".ul").eq(x).find(".reduce").css("background","url(/static/img/reduce.gif)");
	// 			}else{
	// 				$(".ul").eq(x).find(".reduce").css("background","url(/static/img/reduce_none.gif)");
	// 			}
	// 			total();
	// 			var sum1 = $(".sum").html()*1 + 1;
	// 			$(".sum").html(sum1);
	// 		})
	// 		$(".ul").eq(x).find(".reduce").on("click",function(){
	// 			var x = $(this).parents(".ul").index();
	// 			for(var n = 0;n < good.length;n++){
	// 				if($(".ul").eq(x).find("._img").attr("id") == good[n].id){
	// 					if($(".ul").eq(x).find(".num").html() <= 1){
	// 						good[n].num = 1;
	// 						$(".ul").eq(x).find(".price1").children("span").html(obj_p*good[n].num);
	// 						$(".ul").eq(x).find(".num").html(good[n].num);
	// 						$.cookie("goods", JSON.stringify(good), {expires:100, path:"/"});
	// 					}else{
	// 						good[n].num--;
	// 						$(".ul").eq(x).find(".price1").children("span").html(obj_p*good[n].num);
	// 						$(".ul").eq(x).find(".num").html(good[n].num);
	// 						$.cookie("goods", JSON.stringify(good), {expires:100, path:"/"});
	// 					}
	// 				}
	// 			}
	// 			//单品数量“-”号颜色改变
	// 			if($(".ul").eq(x).find(".num").html() > 1){
	// 				$(".ul").eq(x).find(".reduce").css("background","url(/static/img/reduce.gif)");
	// 			}else{
	// 				$(".ul").eq(x).find(".reduce").css("background","url(/static/img/reduce_none.gif)");
	// 			}
	// 			//总价
	// 			total();
	// 			//菜单栏购物车
	// 			if($(".ul").eq(x).find(".num").html() == 1){
	// 				var sum1 = $(".sum").html()*1 - 1;
	// 				$(".sum").html(sum1);
	// 			}else{
	// 				var sum2 = $(".sum").html()*1 - 1;
	// 				$(".sum").html(sum2);
	// 			}
	// 		})
	// 	}
	//
	//
	// })




	// $(".btn2").on("click",function(){
	// 	window.open("/index/");
	// })
	// $(".btn3").on("click",function(){
	// 	alert("结算成功，欢迎下次光临");
	// })
	// function color(){
	// 	for(var x = 0;x < $(".ul").length;x++){
	// 		if($(".ul").eq(x).find(".num").html() > 1){
	// 			$(".ul").eq(x).find(".reduce").css("background","url(/static/img/reduce.gif)");
	// 		}else{
	// 			$(".ul").eq(x).find(".reduce").css("background","url(/static/img/reduce_none.gif)");
	// 		}
	// 	}
	// }
	// function total(){
	// 	var sum = 0;
	// 	for(var x = 0;x < $(".ul").length;x++){
	// 		var _money = $(".ul").eq(x).find(".price1 span").html();
	// 		sum += parseInt(_money);
	// 	}
	// 	$(".allMoney span").html(sum);
	// }
	// function del(){
	// 	for(var x = 0;x < $(".ul").length;x++){
	// 		$(".ul").eq(x).find(".del").on("click",function(){
	// 			var x = $(this).parents(".ul").index();
	// 			for(var n = 0;n < good.length;n++){
	// 				if($(".ul").eq(x).find("._img").attr("id") == good[n].id){
	// 					console.log($.cookie("goods"));
	// 					good.splice(n,1);
	// 					$(".ul").eq(x).hide();
	// 					$.cookie("goods", JSON.stringify(good), {expires:100, path:"/"});
	// 					console.log($.cookie("goods"));
	// 				}
	// 			}
	// 		})
	// 	}
	// }




})