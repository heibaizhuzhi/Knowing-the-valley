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
	gulp.src("src/**/*.html")
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
	// gulp.task("js",function(){
	// 	browserify("src/js/index.js").bundle()
	// 		.pipe(source("index.js"))
	// 		.pipe(buffer())
	// 		.pipe(gulp(gulp.dest("dist/js")));
	// });

gulp.task('js', function() {
    browserify('src/js/index.js').bundle() // 打包index.js
        .pipe(source('index.js'))
        .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task("default",function(){
	gulp.run(["less","html","js"]);

	gulp.watch("src/less/*.js",function(){
		gulp.run("less");
	});

	gulp.watch("src/**/*.html",function(){
		gulp.run("html");
	});

	gulp.watch("src/js/*.js",function(){
		gulp.run("js");
	});
});