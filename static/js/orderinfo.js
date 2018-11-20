$(function () {

    console.log('点击')
    $('#pay').click(function () {
        console.log('支付')

        var identifier = $(this).attr('identifier')
        
        $.get('/meilihui/pay/', {'identifier':identifier},function (response) {
            console.log(response['alipay_url'])
            window.open(response['alipay_url'], target='_self')
        })
    })
})