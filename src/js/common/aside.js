var userinfoStr = localStorage.getItem('userinfo');
var userinfo = JSON.parse(userinfoStr);
$('.aside img').attr('src', userinfo.tc_avatar);
$('.aside h4').text(userinfo.tc_name);

$(".navs a").on("click",function(){
    $(this).next("ul").slideToggle();
});

var path = location.pathname;
$(".navs a").removeClass("active");
$('.navs a[href="' + path + '"]').addClass('active').parents('ul').show();