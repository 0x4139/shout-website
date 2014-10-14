'use strict';
var fs = require('fs');
var gulp = require('gulp');
var csso = require('gulp-csso');
var sass = require('gulp-ruby-sass');
var autoprefixer= require('gulp-autoprefixer');
var minifyHTML = require('gulp-minify-html');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var browserSync = require('browser-sync');
var projectSize = require('gulp-size');
var uglify = require('gulp-uglify');
var cache = require('gulp-cache');
var clean = require('gulp-clean');
var rename = require("gulp-rename");
var replace = require('gulp-replace');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var reload = browserSync.reload;
var AUTOPREFIXER_BROWSERS = [
'ie >= 10',
'ie_mob >= 10',
'ff >= 30',
'chrome >= 34',
'safari >= 7',
'opera >= 23',
'ios >= 7',
'android >= 4.4',
'bb >= 10'
];
gulp.task('default',['sass','js'], function() {
	browserSync({
		notify: false,
		server: {
			baseDir: ['app'],
			middleware: [
			function (req, res, next) {
				if(req.url == '/' || req.url.indexOf('/browser-sync/browser-sync-client')>-1 || fs.existsSync('./app'+req.url)){
					next();
				}
				else{
					req.url ='/index.html';
					next();
				}
			}]
		}
	});
	gulp.watch(['app/**/*.html', '!app/bower_components/**/*.*'],['reload']);
	gulp.watch(['app/scss/**/*.scss','!app/bower_components/**/*.*'],['sass']);
	gulp.watch('app/js/**/*.js',['js'])
});
gulp.task('reload', function () {
	reload();
});
gulp.task('sass', function() {
	gulp.src('app/scss/lisa.scss')
	.pipe(sass({
		style: 'expanded',
		precision: 3,
		sourcemap:true,
		sourcemapPath: '/scss'
	}).on('error', console.error.bind(console)))
	.pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
	.pipe(gulp.dest('./app'))
	.pipe(browserSync.reload({stream:true}));
});
gulp.task('js', function() {
    // Single entry point to browserify
    gulp.src('app/js/lisa.js',{read:false})
        .pipe(browserify({
          insertGlobals : false,
          debug : true,
          transform:['reactify']
        }))
        .pipe(gulp.dest('./app/'))
    	.pipe(browserSync.reload({stream:true}));
});

//deployment stuff

gulp.task('release', function () {
  gulp.src('./app/index.html')
    .pipe(replace('http://fb.me/react-with-addons-0.11.1.js', 'http://fb.me/react-with-addons-0.11.1.min.js'))
    .pipe(minifyHTML())
    .pipe(gulp.dest('./dist'))
    .pipe(projectSize({title: 'html'}));

  gulp.src('app/scss/lisa.scss')
	.pipe(sass({
		style: 'compressed',
		precision: 3,
		sourcemap:false,
		sourcemapPath: '/scss'
	}).on('error', console.error.bind(console)))
	.pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
	.pipe(gulp.dest('./dist'))

  gulp.src(['./src/fonts/**'])
    .pipe(gulp.dest('dist/fonts'))
    .pipe(projectSize({title: 'fonts'}));

  gulp.src("app/js/lisa.js", { read: false })
    .pipe(
    browserify({
        debug: false,
        insertGlobals: false,
        transform: ['reactify']
      }
    ))
    .pipe(uglify())
    .pipe(rename('dna.js'))
    .pipe(gulp.dest("dist/"))
    .pipe(projectSize({title: 'js'}));

  return   gulp.src('./app/img/**/*')
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true,
      use: [pngcrush()]
    })))
    .pipe(gulp.dest('dist/img'))
    .pipe(projectSize({title: 'images'}));

});