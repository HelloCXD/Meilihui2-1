import random
import time

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from App.alipay import alipay_axf
from App.models import User, Wheel, Goodsdetail, Cart, Order, OrderGoods


# 首页１
def index(request):
    tel = request.COOKIES.get('tel')
    users = User.objects.filter(tel=tel)
    wheels = Wheel.objects.all()
    # print(wheels)

    if users.exists():
        user = users.first()
        return render(request, 'index.html', context={'tel': user.tel, 'wheels': wheels})

    else:
        return render(request, 'index.html', context={'wheels': wheels})





# 首页２
def index2(request):
    tel = request.COOKIES.get('tel')
    users = User.objects.filter(tel=tel)
    goods = Goodsdetail.objects.all()

    # print(goods)
    if users.exists():
        user = users.first()
        # print(1)
        return render(request, 'index2.html', context={'tel': user.tel, 'goods':goods,})

    else:
        # print(2)
        return render(request, 'index2.html', context={'goods':goods})


# 注册
def register(request):
    # print(1)
    if request.method == "GET":
        return render(request, 'register.html')
    elif request.method == "POST":
        # print(2)
        # 获取数据
        user = User()
        user.tel = request.POST.get('tel')
        user.password = request.POST.get('password')
        # print(user.tel, user.password)
        # 保存数据
        user.save()

        response = redirect('App:index')
        # 设置令牌
        response.set_cookie('tel', user.tel)


        return response

# 登录
def login(request):
    if request.method == 'GET':

        return render(request, 'login.html')
    elif request.method == 'POST':
        # 获取数据
        tel = request.POST.get('tel')
        password = request.POST.get('password')

        try:
            user= User.objects.filter(tel=tel).first()

            if user.password != password:
                return render(request, 'login.html', context={'error': '密码错误'})
            else:
                response=redirect('App:index')
                response.set_cookie('tel', user.tel)
                return response

        except:
            return render(request, 'login.html', context={'error': '电话错误，请重新输入'})

# 退出
def quit(request):
    response = redirect('App:index')
    #　删除令牌
    response.delete_cookie('tel')

    return response

# 商品列表
def goods(request, goodsid):
    goods = Goodsdetail.objects.get(goodsid=goodsid)
    goodsid =goods.goodsid
    tel = request.COOKIES.get('tel')



    # print(goodsid)
    # print(goods)
    # print(tel)
    if tel:
        user = User.objects.get(tel=tel)
        # print(tel)
        carts = Cart.objects.filter(user=user).filter(goods=goods)
        # print(carts)
        cart = carts.first()
        if cart:

            print(2)
            data = {
                'tel': tel,
                'number': cart.number,
                'goods': goods
            }

            return render(request, 'goods.html', context=data)
        else:
            return render(request, 'goods.html', context={'goods': goods, 'tel':tel})
    else:
        return render(request, 'goods.html', context={'goods': goods})


# 购物车
def cart(request):
    tel = request.COOKIES.get('tel')
    user = User.objects.get(tel=tel)
    carts = Cart.objects.filter(user=user)
    print(tel)
    print(user)
    print(carts)

    return render(request, 'cart.html', context={'tel': user.tel, 'carts': carts})




def checkin(request):
    tel= request.GET.get('tel')
    # print(tel)
    responseData = {
        'msg': '电话可用',
        'status': 1
    }

    tels = User.objects.filter(tel=tel)
    if tels:
        # print(tels)
        responseData['msg'] = '电话已被注册'
        responseData['status'] = -1
        return JsonResponse(responseData)
    else:
        # print('else'+tels)
        return JsonResponse(responseData)


def addcart(request):
    goodsid = request.GET.get('goodsid')
    print(goodsid)
    tel = request.COOKIES.get('tel')

    responseData={
        'msg':'添加购物车成功',
        'status': 1
    }

    if tel:
        # 获取用户信息
        user = User.objects.get(tel=tel)
        # 获取商品信息
        goods = Goodsdetail.objects.get(goodsid=goodsid)

        # 商品已经在购物车，只修改商品个数
        # 商品不存在购物车，新建对象（加入一条新的数据）
        carts = Cart.objects.filter(user=user).filter(goods=goods)
        print(carts)
        if carts.exists(): #　修改数量
            cart = carts.first()
            cart.number = cart.number + 1
            cart.save()
            responseData['number'] = cart.number
        else: # 添加一条新购物车记录
            cart=Cart()
            cart.user= user
            cart.goods = goods
            cart.number = 1
            cart.save()

            responseData['number'] = cart.number
        return JsonResponse(responseData)
    else: # 未登录
        responseData['msg'] = '未登录，请登录后操作'
        responseData['status'] = -1
        return JsonResponse(responseData)


def subcart(request):
    goodsid = request.GET.get('goodsid')
    # print(goodsid)
    user= request.COOKIES.get('tel')

    tel = User.objects.get(tel=user)
    goods= Goodsdetail.objects.get(goodsid=goodsid)


    cart = Cart.objects.filter(user=tel).filter(goods=goods).first()
    cart.number = cart.number -1
    cart.save()

    responseData={
        'msg': '购物车减操作成功',
        'status': 1,
        'number': cart.number
    }



    return JsonResponse(responseData)


def changecartstatus(request):
    cartid = request.GET.get('cartid')
    print(cartid)
    cart = Cart.objects.get(pk=cartid)
    cart.isselect = not cart.isselect
    cart.save()

    responseData={
        'msg': '选中状态改变',
        'status': 1,
        'isselect': cart.isselect
    }
    return JsonResponse(responseData)


def changecartselect(request):
    isselect = request.GET.get('isselect')
    print(isselect)
    if isselect == 'true':
        isselect =True
    else:
        isselect = False

    tel = request.COOKIES.get('tel')
    user = User.objects.get(tel=tel)
    carts = Cart.objects.filter(user=user)
    for cart in carts:
        cart.isselect = isselect
        cart.save()


    return JsonResponse({'msg': '选中状态修改成功', 'status':1})


def generateorder(request):
    tel= request.COOKIES.get('tel')
    user = User.objects.get(tel=tel)

    # 生成订单
    order = Order()
    order.user = user
    order.identifier = str(int(time.time())) + str(random.randrange(10000,100000))
    order.save()

    # 订单商品
    carts = Cart.objects.filter(user=user).filter(isselect=True)
    for cart in carts:
        orderGoods = OrderGoods()
        orderGoods.order = order
        orderGoods.goods = cart.goods
        orderGoods.number = cart.number
        orderGoods.save()

        cart.delete()

    responseData = {
        'msg': '订单生成成功',
        'status': 1,
        'identifier': order.identifier
    }

    return JsonResponse(responseData)


def orderinfo(request, identifier):
    order = Order.objects.get(identifier=identifier)
    return render(request, 'orderinfo.html', context={'order': order})


def pay(request):
    identifier = request.GET.get('identifier')

    # 支付url
    url = alipay_axf.direct_pay(
        subject='测试订单 --- iphone X',    # 订单名称
        out_trade_no=identifier,    # 订单号
        total_amount=9.9,   # 付款金额
        return_url='http://132.232.138.222/meilihui/returnurl/'
    )

    # 拼接支付网关
    alipay_url = 'https://openapi.alipaydev.com/gateway.do?{data}'.format(data=url)

    return JsonResponse({'alipay_url':alipay_url})


def notifyurl(request):
    print(' xxx  订单支付成功，请发货')
    print(request.GET.get('subject'))
    return JsonResponse({'msg':'success'})


def returnurl(request):
    print('xxx 订单支付成功，进行页面跳转')
    return HttpResponse('进行页面跳转，回到meilihui.....')