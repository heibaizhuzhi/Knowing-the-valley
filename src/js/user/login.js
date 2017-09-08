// $("#login-form").ajaxForm({
// 	success:function(data){
// 		if (data.code ==200) {
// 			alert("登陆成功");
// 		}else{
// 			alert("登陆失败")
// 		}
// 	}
// 	error:function(){
// 		alert("登陆失败");
// 	}
// });	

$('#login-form').ajaxForm({
    success: function(data) {
        if(data.code == 200) {
            alert('登陆成功');
        }else {
            alert('登陆失败');
        }
    },
    error: function() {
        alert('登陆失败');
    }
});