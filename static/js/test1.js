function getCheckedProduct() {
    var a = "";
    $("#tab1").find(".checkItem").each(function () {
        if ($(this).hasClass("checkedItem")) {
            a += $(this).parents(".list_content_ul").data("itemid") + ","
        }
    });
    return a
}

function checkedBagProduct() {
    var a = getCheckedProduct();
    selectedProducts(a)
}

function selectedProducts(a) {
    $.ajax({
        type: "POST",
        async: false,
        url: contextPath + "/cart/choose",
        data: {productIds: a},
        success: function (c) {
            if (c.result == 1) {
                var b = c.html;
                $("#tab1").html(b);
                $("#globalPromotion").html(c.globalPromotionHtml);
                resumedCheckedClass();
                hidenButton();
                reLoadHeight()
            }
        }
    })
}

function reduceCountV3(e, c, d, a) {
    if (a <= d) {
    } else {
        var b = getCheckedProduct();
        $.ajax({
            type: "POST",
            url: c + "/cart/update",
            data: {bagDetailId: e, operationType: "2", productIds: b},
            success: function (h) {
                var g = h.html;
                var f = h.result.result * 1;
                switch (f) {
                    case -3:
                        break;
                    case -4:
                        break;
                    default:
                        $("#tab1").html(g);
                        $("#globalPromotion").html(h.globalPromotionHtml);
                        resumedCheckedClass();
                        reLoadHeight();
                        hidenButton();
                        break
                }
            }
        })
    }
}

function delBagProductV3(c, b) {
    var a = getCheckedProduct();
    $.ajax({
        type: "POST", url: b + "/cart/delete", data: {bagDetailId: c, productIds: a}, success: function (e) {
            if (e.result == 0) {
                var d = e.html;
                $("#tab1").html(d);
                $("#globalPromotion").html(e.globalPromotionHtml);
                resumedCheckedClass();
                hidenButton()
            }
        }
    })
}

function addCountV3(f, c, e, a) {
    var d = $("#" + f).text();
    if ("" != d) {
        return
    }
    if (a >= e) {
        $("#" + f).text("本次限购" + e + "件");
        setTimeout('hideMsg("' + f + '")', 3000)
    } else {
        var b = getCheckedProduct();
        $.ajax({
            type: "POST",
            url: c + "/cart/update",
            data: {bagDetailId: f, operationType: "1", productIds: b},
            success: function (h) {
                var g = h.result.result * 1;
                switch (g) {
                    case -1:
                        $("#" + f).parents(".list_content_ul").find(".number_increase").addClass("number_increase_none");
                        $("#" + f).text("商品库存不足,仅剩" + h.result.qty + "件");
                        setTimeout('hideMsg("' + f + '")', 3000);
                        break;
                    case -2:
                        $("#" + f).text("本次限购" + h.result.maxCount + "件");
                        break;
                    default:
                        $("#tab1").html(h.html);
                        $("#globalPromotion").html(h.globalPromotionHtml);
                        resumedCheckedClass();
                        reLoadHeight();
                        hidenButton();
                        break
                }
            }
        })
    }
}

function batchDelete(a) {
    $.ajax({
        type: "POST", url: contextPath + "/cart/batchDelect", data: {productIds: a}, success: function (c) {
            if (c.result == 0) {
                var b = c.html;
                $("#tab1").html(b);
                $("#globalPromotion").html(c.globalPromotionHtml);
                hidenButton()
            }
        }
    })
}

function bagToSettleV3(c) {
    var a = getCheckedProduct();
    if (a == "") {
        $("#selectTips").show().children(".tipsPanel").text("请选择要购买的商品");
        setTimeout(function () {
            $("#selectTips").hide()
        }, 3000);
        return false
    }
    var d = a.split(",");
    if (d.length > 40) {
        $("#selectTips").show().children(".tipsPanel").text("单次结算最多只能选购40件商品");
        setTimeout(function () {
            $("#selectTips").hide()
        }, 3000);
        return false
    }
    var b = $("#contextPath").val();
    $.ajax({
        type: "POST", url: b + "/cart/validate", data: {productIds: a}, success: function (f) {
            if (f.result == -1) {
                $("#selectTips").show().children(".tipsPanel").text(f.msg);
                setTimeout(function () {
                    $("#selectTips").hide()
                }, 3000);
                return false
            }
            var e = f.html;
            $("#tab1").html(e);
            $("#globalPromotion").html(f.globalPromotionHtml);
            hidenButton();
            resumedCheckedClass();
            var g = $("#bagStatus");
            if (undefined == $("#bagStatus").attr("status")) {
                return
            } else {
                if (undefined != g && "1" == $("#bagStatus").attr("status")) {
                    $("#selectTips").show().children(".tipsPanel").text("购物袋中包含已售罄或库存不足商品，请删除或修改数量");
                    setTimeout(function () {
                        $("#selectTips").hide()
                    }, 3000)
                } else {
                    $("#productIds").val(a);
                    $("#from1").attr("action", c);
                    $("#from1").submit()
                }
            }
        }
    })
}

$(function () {
    hidenButton();
    resumedCheckedClass();
    $(document).on("click", ".cart_chk", function () {
        var d = $(this).parents(".shoppingCartContent").attr("id");
        var e = "";
        if (d == "tab1") {
            e = "#tab1"
        } else {
            e = "#tab2"
        }
        var a = $(this).children(".checkItem");
        if (a.hasClass("checkedItem")) {
            a.removeClass("checkedItem");
            $(e).find(".checkAllBox").children(".checkAll").removeClass("checkedItem");
            $(this).parent(".list_content_ul").prevAll(".packageType").find(".checkAll").removeClass("checkedItem")
        } else {
            a.addClass("checkedItem");
            var g = $(this).parents(".list_content").find(".checkItem").size();
            var f = $(this).parents(".list_content").find(".checkedItem").size();
            var b = $(this).parents(".shoppinglist").find(".checkItem").size();
            var c = $(this).parents(".shoppinglist").find(".cart_chk").children(".checkedItem").size();
            if (g == f) {
                $(this).parent(".list_content_ul").prevAll(".packageType").find(".checkAll").addClass("checkedItem")
            }
            if (b == c) {
                $(e).find(".checkAllBox").children(".checkAll").addClass("checkedItem")
            }
        }
        if (d == "tab1") {
            checkedBagProduct()
        }
        checkedNum(d)
    });
    $(document).on("click", ".packageType", function () {
        var a = $(this).children("span");
        if (a.hasClass("checkedItem")) {
            a.removeClass("checkedItem");
            $(this).parent(".list_content").find(".checkItem").removeClass("checkedItem")
        } else {
            a.addClass("checkedItem");
            $(this).parent(".list_content").find(".checkItem").addClass("checkedItem")
        }
        var b = $(".shoppinglist").find(".packageType").size();
        var c = $(".shoppinglist").find(".packageType").children(".checkedItem").size();
        if (b == c) {
            $("tab1").find(".checkAllBox").children(".checkAll").addClass("checkedItem")
        }
        checkedBagProduct();
        checkedNum("tab1")
    });
    $(document).on("click", ".checkAllBox", function () {
        var a = $(this).parents(".shoppingCartContent").attr("id");
        var b = "";
        if (a == "tab1") {
            b = "#tab1"
        }
        if (a == "tab2") {
            b = "#tab2"
        }
        if ($(b).find(".checkAllBox").children(".checkAll").hasClass("checkedItem")) {
            $(b).find(".checkAll").removeClass("checkedItem");
            if (a == "tab1") {
                checkedBagProduct()
            }
            checkedNum(a)
        } else {
            if ($(b).find(".checkText").hasClass("check_none")) {
                return false
            }
            $(b).find(".checkAll").addClass("checkedItem");
            if (a == "tab1") {
                checkedBagProduct()
            }
            checkedNum(a)
        }
    });
    $(document).on("click", ".btn_edit", function () {
        if (waitingsubmit2) {
            return false
        }
        waitingsubmit2 = true;
        var f = $(this).data("parentid");
        var d = $(this).parents(".list_content_ul").data("event");
        var b = $(this).next(".edit_popup").attr("id");
        var a = getSizeColorGroup(f, d);
        var g = $(this).parent(".list_content_infobox").outerHeight();
        var e = $(this).parent(".list_content_infobox").find(".list_content_size").data("size");
        var c = $(this).parent(".list_content_infobox").find(".list_content_color").data("parentid");
        $(".edit_popup").hide();
        $(".btn_edit").removeClass("btn_edit_selected");
        $(".list_content_infobox ").removeClass("selected_infobox");
        $(this).next(".edit_popup").html(a);
        $(this).addClass("btn_edit_selected");
        $(this).parents(".list_content_infobox").addClass("selected_infobox");
        $("#" + b).show();
        $("#" + b).css("top", g * 1 + 3);
        $("#" + b).find(".choose_size_ul2 li a").each(function () {
            var h = $(this).text().trim();
            if (e == h) {
                $(this).addClass("selected_product")
            }
        });
        $("#" + b).find(".choose_color_ul2 li a").each(function () {
            var h = $(this).data("id");
            if (c == h) {
                $(this).addClass("selected_product")
            }
        })
    });
    $(document).on("click", ".sizebox_content .close3_btn", function () {
        var a = $(this).parents(".size_popup").attr("id");
        $("#" + a).hide();
        $("#" + a).prev(".btn_edit").removeClass("btn_edit_selected");
        $("#" + a).parents(".list_content_infobox").removeClass("selected_infobox");
        $("#" + a).find(".addInfo").text("")
    });
    $(document).on("click", ".choose_color_ul2 a", function () {
        if ($(this).hasClass("selected_product") || $(this).hasClass("product_size_none")) {
            return false
        }
        $(".choose_color_ul2 a").removeClass("selected_product");
        $(this).addClass("selected_product");
        $(this).parents(".size_popup").find(".addInfo").text("");
        var c = $(this).data("id");
        var b = $(this).data("eventid");
        var a = $(this).parents(".size_popup").attr("id");
        showProductSizeInStowe(c, b, a)
    });
    $(document).on("click", ".choose_size_ul2 a", function () {
        if ($(this).hasClass("selected_product") || $(this).hasClass("product_size_none")) {
            return false
        }
        $(".choose_size_ul2 a").removeClass("selected_product");
        $(this).addClass("selected_product");
        $(this).parents(".size_popup").find(".addInfo").text("")
    });
    $(document).on("mouseover", ".choose_size_ul2 a", function () {
        if ($(this).hasClass("product_size_none")) {
            return false
        }
        $(this).next(".pop_up").children(".pop_up_box3").show()
    });
    $(document).on("mouseout", ".choose_size_ul2 a", function () {
        $(this).next(".pop_up").children(".pop_up_box3").hide()
    });
    $(document).on("click", ".addCartBtn", function () {
        var j = $(this).parents(".size_popup").attr("id");
        var h = null;
        var g = $(this).parents(".list_content_ul").data("itemid");
        var d = $("#" + j).find(".choose_color_ul2").size();
        var e = $("#" + j).find(".choose_size_ul2").size();
        var c = $("#" + j).find(".choose_color_ul2 li a.selected_product");
        var b = $("#" + j).find(".choose_size_ul2 li a.selected_product");
        var f = c.size();
        var a = b.size();
        if (d > 0 && f == 0) {
            $("#" + j).find(".addInfo").text("请选择颜色");
            return false
        }
        if (e > 0 && a == 0) {
            $("#" + j).find(".addInfo").text("请选择尺寸");
            return false
        }
        if (e > 0) {
            $("#" + j).find(".choose_size_ul2 li a").each(function () {
                if ($(this).hasClass("selected_product")) {
                    h = $(this).data("id")
                }
            })
        } else {
            $("#" + j).find(".choose_color_ul2 li a").each(function () {
                if ($(this).hasClass("selected_product")) {
                    h = $(this).data("id")
                }
            })
        }
        var i;
        if (h == g || h == "" || h == undefined || h == null) {
            i = false
        } else {
            if (waitingsubmit) {
                return false
            }
            waitingsubmit = true;
            var i = editProduct(h, g)
        }
        $("#" + j).find(".addInfo").text("");
        if (i) {
            $("#" + j).prevAll(".sku_info").children(".list_content_color").text("颜色 : " + c.text());
            $("#" + j).prevAll(".sku_info").children(".list_content_size").text("尺寸 : " + b.text())
        }
        $("#" + j).hide();
        $("#" + j).prev(".btn_edit").removeClass("btn_edit_selected");
        $("#" + j).parents(".list_content_infobox").removeClass("selected_infobox")
    });
    reLoadHeight();
    $(window).scroll(function () {
        reLoadHeight()
    });
    $(document).on("click", "#soldOut", function () {
        productItemIds = findSoldOutProduct();
        $("#cartPopup").show();
        $("#cartPopup").children(".tipsInfo").text("确认清空全部售罄商品吗？")
    });
    $(document).on("click", "#cartPopup .close3_btn", function () {
        $(this).parent("#cartPopup").hide()
    });
    $(document).on("click", ".cancelBtn", function () {
        $(this).parents("#cartPopup").hide()
    });
    $(document).on("click", ".deleteAll", function () {
        $("#cartPopup").hide();
        deleteItemId()
    });
    $(document).on("click", "#deleteItem", function () {
        var a = getCheckedProduct();
        if (a != "") {
            $("#cartPopup").show();
            productItemIds = a;
            $("#cartPopup").children(".tipsInfo").text("确认要删除所有选中的商品吗？")
        } else {
            $("#selectTips").show();
            $("#selectTips").children(".tipsPanel").text("您还未选择任何商品。");
            setTimeout(function () {
                $("#selectTips").hide()
            }, 3000)
        }
    });
    $(".clearInvalid").on("click", function () {
        $("#invalidPopup").show()
    });
    $("#invalidPopup").on("click", ".close3_btn", function () {
        $("#invalidPopup").hide()
    });
    $("#invalidPopup").on("click", ".cancelBtn", function () {
        $("#invalidPopup").hide()
    });
    $("#invalidPopup").on("click", ".wish_deleteAll", function () {
        delInvalidProduct()
    })
});

function reLoadHeight() {
    var c = $(document).scrollTop();
    var a = $(window).height();
    var b = $(document).height() + 100;
    if (c <= (b - a - 310)) {
        $(".payBox").addClass("payBox_bottom")
    } else {
        $(".payBox").removeClass("payBox_bottom")
    }
}

function deleteItemId() {
    if (productItemIds != "") {
        batchDelete(productItemIds)
    }
}

function deleteChecked() {
    var a = getCheckedProduct()
}

function resumedCheckedClass() {
    $("#tab1").find(".list_content").each(function () {
        var c = $(this).find(".maskPanel").size();
        var e = $(this).find(".checkItem").size();
        var d = $(this).find(".checkedItem").size();
        if (e == d) {
            $(this).find(".packageType").children(".checkAll").addClass("checkedItem")
        }
    });
    var a = $("#tab1").find(".checkItem").size();
    var b = $("#tab1").find(".cart_chk").children(".checkedItem").size();
    if (a == b) {
        $("#tab1").find(".checkAllBox").children(".checkAll").addClass("checkedItem")
    }
    $("#checkedNum").html(b)
}

function checkedNum(b) {
    if (b == "tab1") {
        var a = $("#tab1").find(".cart_chk").children(".checkedItem").size();
        $("#checkedNum").html(a)
    } else {
        var a = $("#tab2").find(".cart_chk").children(".checkedItem").size();
        $("#wishCheckedNum").html(a)
    }
}

function findSoldOutProduct() {
    var a = "";
    $("#tab1").find(".maskPanel").each(function () {
        a += $(this).parents(".list_content_left").parents(".list_content_ul").data("itemid") + ","
    });
    return a
}

function delSoldOutProduct() {
    var a = findSoldOutProduct();
    batchDelete(a)
}

function hidenButton() {
    $("#tab1").find(".list_content").each(function () {
        var f = $(this).find(".maskPanel").size();
        var h = $(this).find(".gift_img").size();
        var g = $(this).find(".list_content_ul").size();
        if ((f + h) == g) {
            $(this).find(".checkAll").remove()
        }
    });
    var d = $("#tab2").find(".list_content_ul").size();
    var a = $("#tab2").find(".maskPanel").size();
    var b = $("#tab1").find(".list_content_ul").size();
    var c = $("#tab1").find(".maskPanel").size();
    var e = $("#tab1").find(".gift_img").size();
    if ((c + e) == b) {
        $("#tab1").find(".checkAllBox").css("cursor", "default");
        $("#tab1").find(".checkAllBox").find(".checkAll").css("cursor", "default");
        $("#tab1").find(".checkAllBox").children(".checkText").addClass("check_none");
        $("#tab1").find(".checkAll").removeClass("checkedItem")
    }
    if (a == d) {
        $("#tab2").find(".checkAllBox").css("cursor", "default");
        $("#tab2").find(".checkAllBox").find(".checkAll").css("cursor", "default");
        $("#tab2").find(".checkAllBox").children(".checkText").addClass("check_none");
        $("#tab2").find(".checkAll").removeClass("checkedItem")
    }
    if (c == 0) {
        $("#soldOut").remove()
    }
}

function editProduct(c, b) {
    var a = getCheckedProduct();
    $.ajax({
        type: "POST",
        url: contextPath + "/cart/change",
        data: {productIds: a, newItemId: c, oldItemId: b},
        error: function () {
            waitingsubmit = false
        },
        success: function (e) {
            if (e.result > 0) {
                var d = e.html;
                $("#tab1").html(d);
                $("#globalPromotion").html(e.globalPromotionHtml);
                hidenButton();
                resumedCheckedClass();
                waitingsubmit = false;
                return true
            } else {
                $("#selectTips").show().children(".tipsPanel").text("修改商品失败！");
                setTimeout(function () {
                    $("#selectTips").hide()
                }, 3000);
                waitingsubmit = false;
                return false
            }
        }
    })
}

function getSizeColorGroup(c, a) {
    var b = "";
    $.ajax({
        type: "post",
        datatype: "json",
        data: {proid: c, eventid: a, source: "cart"},
        async: false,
        url: contextPath + "/wishList/toChooseWindowNew",
        success: function (d) {
            if (d.status != "error") {
                b = d
            }
            waitingsubmit2 = false
        }
    });
    return b
}

var request = {};

function showProductSizeInStowe(c, b, a) {
    if (!jQuery.isEmptyObject(request)) {
        request.abort()
    }
    request = $.ajax({
        type: "post",
        datatype: "json",
        url: loginbaseUrl + "/productDetail/toGetSizeProductInfo",
        success: function (g) {
            var e = 1;
            var k = g.SizeInfo;
            var f = g.isShowChineseCode;
            var h = "";
            for (var d = 0; d < k.length; d++) {
                if (k[d].product_type !== "Configurable") {
                    if (k[d].pbProductStock.stock_qty > 0) {
                        if (e === 1) {
                            var j = k[d].chinese_code;
                            if (f && j != null && j != "" && typeof(j) != "undefined") {
                                h += "<li><a data-id=" + k[d].id + ">" + k[d].chinese_code + "</a>"
                            } else {
                                h += "<li><a data-id=" + k[d].id + ">" + k[d].product_size + "</a>"
                            }
                            if (k[d].chinese_code.length > 0 || k[d].specifications.length > 0) {
                                h += '<div class="pop_up"><div class="pop_up_box3"><div class="box_top"><div class="top_img"></div></div><div class="box_content"><ul>';
                                if (f) {
                                    if (k[d].product_size.length > 0) {
                                        if (k[d].size_country.length > 0) {
                                            h += "<li><b>对应" + k[d].size_country + "：</b>"
                                        } else {
                                            h += "<li><b>对应尺码：</b>"
                                        }
                                        h += k[d].product_size + "</li>";
                                        if (k[d].specifications.length > 0) {
                                            h += "<li><b>规格/号型：</b>" + k[d].specifications + "</li>"
                                        }
                                    }
                                } else {
                                    if (k[d].chinese_code.length > 0 && k[d].specifications.length > 0) {
                                        h += "<li>对应中国码：<b>" + k[d].chinese_code + "</b></li>"
                                    } else {
                                        if (k[d].chinese_code.length > 0) {
                                            h += "对应中国码：<b>" + k[d].chinese_code + "</b></li>"
                                        } else {
                                            if (k[d].specifications.length > 0) {
                                                h += "<li>规格/号型：<b>" + k[d].specifications + "</b></li>"
                                            }
                                        }
                                    }
                                }
                                h += "<li>【详请参考尺寸测量信息】</li></ul></div></div></div>"
                            }
                            h += "</li>";
                            e = 2
                        } else {
                            var j = k[d].chinese_code;
                            if (f && j != null && j != "" && typeof(j) != "undefined") {
                                h += "<li><a data-id=" + k[d].id + ">" + k[d].chinese_code + "</a>"
                            } else {
                                h += "<li><a data-id=" + k[d].id + ">" + k[d].product_size + "</a>"
                            }
                            if (k[d].chinese_code.length > 0 || k[d].specifications.length > 0) {
                                h += '<div class="pop_up"><div class="pop_up_box3"><div class="box_top"><div class="top_img"></div></div><div class="box_content"><ul>';
                                if (f) {
                                    if (k[d].product_size.length > 0) {
                                        if (k[d].size_country.length > 0) {
                                            h += "<li><b>对应" + k[d].size_country + "：</b>"
                                        } else {
                                            h += "<li><b>对应尺码：</b>"
                                        }
                                        h += k[d].product_size + "</li>";
                                        if (k[d].specifications.length > 0) {
                                            h += "<li><b>规格/号型：</b>" + k[d].specifications + "</li>"
                                        }
                                    }
                                } else {
                                    if (k[d].chinese_code.length > 0 && k[d].specifications.length > 0) {
                                        h += "<li>对应中国码：<b>" + k[d].chinese_code + "</b></li>"
                                    } else {
                                        if (k[d].chinese_code.length > 0) {
                                            h += "对应中国码：<b>" + k[d].chinese_code + "</b></li>"
                                        } else {
                                            if (k[d].specifications.length > 0) {
                                                h += "<li>规格/号型：<b>" + k[d].specifications + "</b></li>"
                                            }
                                        }
                                    }
                                }
                                h += "<li>【详请参考尺寸测量信息】</li></ul></div></div></div>"
                            }
                            h += "</li>"
                        }
                    } else {
                        if (k[d].pbProductStock.stock_qty == 0) {
                            if (f) {
                                h += "<li><a class='product_size_none' data-id=" + k[d].id + ">" + k[d].chinese_code + "</a>"
                            } else {
                                h += "<li><a class='product_size_none' data-id=" + k[d].id + ">" + k[d].product_size + "</a>"
                            }
                            if (k[d].chinese_code.length > 0 || k[d].specifications.length > 0) {
                                h += '<div class="pop_up"><div class="pop_up_box3"><div class="box_top"><div class="top_img"></div></div><div class="box_content"><ul>';
                                if (f) {
                                    if (k[d].product_size.length > 0) {
                                        if (k[d].size_country.length > 0) {
                                            h += "<li><b>对应" + k[d].size_country + "：</b>"
                                        } else {
                                            h += "<li><b>对应尺码：</b>"
                                        }
                                        h += k[d].product_size + "</li>";
                                        if (k[d].specifications.length > 0) {
                                            h += "<li><b>规格/号型：</b>" + k[d].specifications + "</li>"
                                        }
                                    }
                                } else {
                                    if (k[d].chinese_code.length > 0 && k[d].specifications.length > 0) {
                                        h += "<li>对应中国码：<b>" + k[d].chinese_code + "</b></li>"
                                    } else {
                                        if (k[d].chinese_code.length > 0) {
                                            h += "对应中国码：<b>" + k[d].chinese_code + "</b></li>"
                                        } else {
                                            if (k[d].specifications.length > 0) {
                                                h += "<li>规格/号型：<b>" + k[d].specifications + "</b></li>"
                                            }
                                        }
                                    }
                                }
                                h += "<li>【详请参考尺寸测量信息】</li></ul></div></div></div>"
                            }
                            h += "</li>"
                        }
                    }
                }
            }
            $("#" + a).find(".chooseSizeBox ul").empty();
            $("#" + a).find(".chooseSizeBox ul").append(h)
        },
        error: function () {
            str_result = "fail"
        },
        data: {proid: c, eventid: b}
    })
}

function delInvalidProduct() {
    var b = "";
    var a = "";
    $("#tab3 .list_content").each(function () {
        var c = $(this).data("itemtype");
        if (c == "1") {
            a += $(this).data("productid") + ","
        } else {
            b += $(this).data("productid") + ","
        }
    });
    if (b != "") {
        batchDelete(b)
    }
    if (a != "") {
        batchDeleteWish(a)
    }
    $("#tab3").find(".shoppinglist").html("<p class='shoppingNothing'>活动结束的商品会显示在此</p>")
}

function submitCouponV3(b) {
    var c = $("input:radio[name=selectCoupon]:checked").val();
    var d = $("#inputCoupon").val();
    if (("" == d || "" == $.trim(d)) && c == undefined) {
        $("#selectTips").show().children(".tipsPanel").text("请选择优惠券或输入优惠券号码");
        setTimeout(function () {
            $("#selectTips").hide()
        }, 3000);
        $("#inputCoupon").val("");
        return
    }
    if (d != "") {
        c = ""
    }
    var a = getCheckedProduct();
    if (a != "") {
        $(b).text("提交中...");
        $.ajax({
            type: "POST",
            dataType: "json",
            url: contextPath + "/shoppingBag/useCouponV3",
            data: {couponCode: d, codeType: "2", couponId: c},
            success: function (f) {
                var e = f.result;
                if (e < 0) {
                    $("#selectTips").show().children(".tipsPanel").text(f.msg);
                    setTimeout(function () {
                        $("#selectTips").hide()
                    }, 3000);
                    $(b).text("提交")
                } else {
                    selectedProducts(a)
                }
            }
        })
    }
}

$("#btn_cancelCoupon").live("click", function () {
    var a = getCheckedProduct();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: contextPath + "/shoppingBag/cancelCouponV3",
        data: {productIds: a},
        success: function (b) {
            selectedProducts(a)
        }
    })
});
$(document).on("click", ".close4_btn", function () {
    $(".crossBtn").removeClass("checkedItem");
    $(".check-normal").addClass("checkedItem");
    $("#overseaPopUp").hide()
});
$(document).on("click", "#overseaPopUp .goToBag", function () {
    $(".crossBtn").removeClass("checkedItem");
    $(".check-normal").addClass("checkedItem");
    $("#overseaPopUp").hide()
});
$(document).on("click", ".crossBtn", function () {
    if ($(this).hasClass("checkedItem")) {
        return false
    } else {
        $(".crossBtn").removeClass("checkedItem");
        $(this).addClass("checkedItem")
    }
});

function isCrossBorderCheckout() {
    var b = 0;
    var a = 0;
    $("#tab1").find(".checkItem").each(function () {
        if ($(this).hasClass("checkedItem")) {
            if ($(this).parents(".list_content_ul").data("crossborder")) {
                b++
            } else {
                a++
            }
        }
    });
    if (b > 0 && a > 0) {
        return "choose"
    } else {
        if (b > 0 && a == 0) {
            return "crossborder"
        } else {
            return "normal"
        }
    }
}

function chooseCheckoutType() {
    var c = 0;
    if ($(".check-cross").hasClass("checkedItem")) {
        c = 1
    }
    var b = $("#contextPath").val();
    var a = b + "/checkout";
    var d = false;
    if (c == 1) {
        d = true;
        a = b + "/checkout/cross/border"
    }
    $("#tab1").find(".checkItem").each(function () {
        if ($(this).hasClass("checkedItem")) {
            if ($(this).parents(".list_content_ul").data("crossborder") == !d) {
                $(this).removeClass("checkedItem")
            }
        }
    });
    selectedProducts(getCheckedProduct());
    bagToSettleV3(a)
}

function checkCheckoutType() {
    var b = $("#contextPath").val();
    var c = isCrossBorderCheckout();
    var a = b + "/checkout";
    reLoadHeight();
    if (c == "normal") {
        bagToSettleV3(a)
    } else {
        if (c == "crossborder") {
            a = b + "/checkout/cross/border";
            bagToSettleV3(a)
        } else {
            $("#overseaPopUp").show()
        }
    }
};