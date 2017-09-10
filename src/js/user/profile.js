$.ajax({
    url: '/v6/teacher/profile',
    type: 'get',
    success: function(data) {
        if(data.code == 200) {
            console.log("aaaaaa");
            $('.teacher-profile').html(template('teacher-profile-tpl', data.result));
        }
    }
});