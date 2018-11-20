from django.db import models

# Create your models here.

class Wheel(models.Model):
    # 图片
    img = models.CharField(max_length=100)
    # 名称
    name = models.CharField(max_length=100)

class Goodslist(models.Model):
    # "id": "product1",
    # "buyer": "买手推荐",
    # "src1": "'/static/img/product1_1.jpg'",
    # "src2": "'/static/img/product1_2.jpg'",
    # "src3": "'/static/img/product1_3.jpg'",
    # "title": "红色荔枝纹拉链手提肩包",
    # "name": "Tory Burch",
    # "price": "￥2,440 ",
    # "original_price": "￥4,880",
    # "index1": "'/static/img/product1_1_s.jpg'",
    # "index2": "'/static/img/product1_2_s.jpg'",
    # "index3": "'/static/img/product1_3_s.jpg'"
    goodsid=models.CharField(max_length=20)
    buyer=models.CharField(max_length=20)
    src1=models.CharField(max_length=100)
    src2=models.CharField(max_length=100)
    src3=models.CharField(max_length=100)
    title=models.CharField(max_length=100)
    name=models.CharField(max_length=100)
    price=models.CharField(max_length=40)
    original_price=models.CharField(max_length=40)
    index1=models.CharField(max_length=100)
    index2=models.CharField(max_length=100)
    index3=models.CharField(max_length=100)


class Goodsdetail(models.Model):
    goodsid = models.CharField(max_length=20)
    buyer = models.CharField(max_length=20)
    src1 = models.CharField(max_length=100)
    src2 = models.CharField(max_length=100)
    src3 = models.CharField(max_length=100)
    src4 = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    original_price = models.DecimalField(max_digits=7, decimal_places=2)
    index1 = models.CharField(max_length=100)
    index2 = models.CharField(max_length=100)
    index3 = models.CharField(max_length=100)
    index4 = models.CharField(max_length=100)


class User(models.Model):
    tel = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=256)


class Cart(models.Model):
    # 用户
    user = models.ForeignKey(User)
    # 商品
    goods = models.ForeignKey(Goodsdetail)
    # 商品数量(选择)
    number = models.IntegerField()
    # 是否选中
    isselect = models.BooleanField(default=True)


# 订单
# 一个用户 对应 多个订单
# 在从表这声明关系
# 状态
# -1 过期
# 1 未付款
# 2 已付款，未发货
# 3 已发货，快递
# 4 已签收，未评价
# 5 已评价
# 6 退款....
class Order(models.Model):
    # 用户
    user = models.ForeignKey(User)
    # 创建时间
    createtime = models.DateTimeField(auto_now_add=True)

    status = models.IntegerField(default=1)
    # 订单号
    identifier = models.CharField(max_length=256)

# 订单商品
# 一个订单 对应 多个商品
# 在从表中声明关系
class OrderGoods(models.Model):
    # 订单
    order = models.ForeignKey(Order)
    # 商品
    goods = models.ForeignKey(Goodsdetail)
    # 个数
    number = models.IntegerField(default=1)

    # 大小
    # 颜色



