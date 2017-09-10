var gulp = require("gulp");//加载gulp

var htmlmin = require("gulp-htmlmin");//加载HTML的插件

var uglify = require("gulp-uglify");//加载js的插件

var  cleanCss = require("gulp-clean-css");//加载css的插件

var concat = require("gulp-concat"); //加载组合插件

var rename = require("gulp-rename");//加载修改文件名插件

var less = require("gulp-less");//加载编译less插件

var browserify = require('browserify');//加载browserify

var source = require('vinyl-source-stream'); // 这个包可以把普通的数据流转为vinyl对象文件格式

var buffer = require('vinyl-buffer'); // 这个是把vinyl对象文件中的数据转为buffer方式存储

var htmlReplace = require('gulp-html-replace');

//1.编译less，编译后的结果进行压缩
gulp.task("less",function(){
	gulp.src("src/less/*.less")
		.pipe(less())
		.pipe(cleanCss())
		// .pipe(rename({
		// 	suffix:".min"
		// }))
		.pipe(gulp.dest("dist/css"));
});


// 2.压缩html
gulp.task("html",function(){
    gulp.src(["src/**/*.html",'index.html'])
        .pipe(htmlReplace({
            style: gulp.src('src/html/common/style.html'),
            aside: gulp.src('src/html/common/aside.html'),
            header: gulp.src('src/html/common/header.html')
        }))
		.pipe(htmlmin({
			collapseWhitespace:true,// 去掉空白字符
			minifyJs:true,//压缩页面JS
			minifyCSS:true,//压缩页面CSS
			removeComments:true//清除HTML注释
		}))
		.pipe(gulp.dest("dist"));
});

// 压缩js
// gulp.task("js",function(){
// 	gulp.src("src/js/**/*.js")
// 		.pipe(uglify())
// 		.pipe(rename({
// 			suffix:".min"
// 		}))
// 		.pipe(gulp.dest("dist/js"));

// });

// 编写一个打包工具
// gulp.task('js', function() {
//     browserify('src/js/index.js').bundle() // 打包index.js
//         .pipe(source('index.js'))
//         .pipe(buffer())
//         // .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

// 配置要打包的第三包路径
var jsLibs = [
    'node_modules/art-template/lib/template-web.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/jquery-form/dist/jquery.form.min.js'
];
// 合并所有的第三方包为一个js
gulp.task('jsLib', function() {
    gulp.src(jsLibs)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('dist/js'));
});

var jsModules = [
    // 首页
    'src/js/index.js',
    // 用户
    'src/js/user/login.js',
    'src/js/user/repass.js',
    'src/js/user/profile.js',
    // 讲师
    'src/js/teacher/add.js',
    'src/js/teacher/edit.js',
    'src/js/teacher/list.js',
    // 课程
    'src/js/course/add.js',
    'src/js/course/edit1.js',
    'src/js/course/edit2.js',
    'src/js/course/edit3.js',
    'src/js/course/list.js',
    // 学科分类
    'src/js/category/add.js',
    'src/js/category/edit.js',
    'src/js/category/list.js'
];

// gulp.task("js",function(){
// 	jsModules.forEach(function(jsPath) {
// 		var pathArr = jsPath.split("/");
// 		var jsName =pathArr.pop();
// 		pathArr.shift();
// 		browserify(jsPath,{debug:true}).bundle()
// 			.pipe(source(jsName))
// 			.pipe(buffer)
// 			.pipe(gulp.dest("dist/"+pathArr.join("/")));
// 	});
// });

gulp.task('js', function() {
    jsModules.forEach(function(jsPath) {
        var pathArr = jsPath.split('/'); // jsPath变成['src', 'js', 'user', 'login.js']
        var jsName = pathArr.pop(); // 取出login.js，数组变成['src', 'js', 'user']
        pathArr.shift(); // 取出src，数组变成['js', 'user']
        browserify(jsPath, { debug: true }).bundle() // 打包index.js
            .pipe(source(jsName))
            .pipe(buffer())
            // .pipe(uglify())
            .pipe(gulp.dest('dist/' + pathArr.join('/'))); // 数组变成'js/user'
    });
});

// 添加统一打包的任务
gulp.task('build', function() {
    gulp.run(['html', 'less', 'jsLib', 'js']);
});

gulp.task("default",function(){

	gulp.run("build");

	gulp.run(["less","html","js"]);

	gulp.watch("src/less/*.js",function(){
		gulp.run("less");
	});

	gulp.watch(["src/**/*.html","index.html"],function(){
		gulp.run("html");
	});

	gulp.watch("src/js/*.js",function(){
		gulp.run("js");
	});
});