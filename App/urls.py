from django.conf.urls import url

from App import views

urlpatterns = [

    url(r'^$', views.index, name='index'),
    url(r'^index2/$', views.index2, name='index2'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.login, name='login'),
    url(r'^goods/(\w+)/$', views.goods, name='goods'),
    url(r'^cart/$', views.cart, name='cart'),
    url(r'^quit/$', views.quit, name='quit'),
    url(r'^checkin/$', views.checkin, name='checkin'),
    # url(r'^checkon/$', views.checkon, name='checkon'),
    url(r'^addcart/$', views.addcart, name='addcart'),  # 添加商品操作
    url(r'^subcart/$', views.subcart, name='subcart'),  # 删减商品操作
    url(r'^changecartstatus/$', views.changecartstatus, name='changecartstatus'),  # 修改选中状态
    url(r'^changecartselect/$', views.changecartselect, name='changecartselect'),  # 全选/取消全选

    url(r'^generateorder/$', views.generateorder, name='generateorder'),  # 下单
    url(r'^orderinfo/(\d+)/$', views.orderinfo, name='orderinfo'),

    url(r'^pay/$', views.pay, name='pay'),  # 支付
    url(r'^notifyurl/$', views.notifyurl, name='notifyurl'),  # 支付完成后的通知
    url(r'^returnurl/$', views.returnurl, name='returnurl'),  # 支付完成后的跳转

]