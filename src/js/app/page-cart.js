define(function(require){
    var $ = require('jquery');
    var popbox = require('popbox');

    $('.goods label.checkbox').click(function(){
        $(this).toggleClass('active');
        $(this).find('.ico').toggleClass('icon-yuanxingxuanzhongfill icon-yuanxingweixuanzhong');
    });



    $('#checkall').click(function(){
        $(this).toggleClass('active');
        $(this).find('.ico').toggleClass('icon-yuanxingxuanzhongfill icon-yuanxingweixuanzhong');


        if($(this).hasClass('active')){
            $('.goods label.checkbox').addClass('active');
            $('.goods label.checkbox .ico').removeClass('icon-yuanxingweixuanzhong').addClass('icon-yuanxingxuanzhongfill');
        }else{
            $('.goods label.checkbox').removeClass('active');
            $('.goods label.checkbox .ico').addClass('icon-yuanxingweixuanzhong').removeClass('icon-yuanxingxuanzhongfill');
        }
    });


    $('#btn-submit').click(function(){
        var list = [];
        $('.goods label.checkbox.active').each(function(){
            list.push(this.dataset.pid);
        })
        console.log(list);
    });

    $('.btn').click(function(){
        popbox.confirm('你确认要结算么');
    })

});