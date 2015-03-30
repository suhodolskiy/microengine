var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	jsmin = require('gulp-jsmin'),
	react = require('gulp-react');

// scss
	gulp.task('scss', function () {
		gulp.src('./scss/main.scss')
		.pipe(sass({ includePaths: ['./scss'], errLogToConsole: true }))
		.pipe(autoprefixer('last 10 version'))
		.pipe(minifyCSS())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('../assets/css/'))
	});

// js
	gulp.task('js', function () {
	    gulp.src('./js/script.js')
	    .pipe(jsmin())
	    .pipe(rename({suffix: '.min'}))
	    .pipe(gulp.dest('../assets/js/'))
	});

// react - jsx
	gulp.task('react', function () {
	    gulp.src('./react/react.jsx')
	    .pipe(react())
	    .pipe(gulp.dest('../assets/js/'))
	});
	
// wath
	gulp.task('watch',function(){
		gulp.watch(['./scss/*','./scss/*/*','./scss/*/*/*'],['scss']),
		gulp.watch('./js/*',['js']),
		gulp.watch('./react/*',['react'])
	});

gulp.task('default',['watch', 'scss', 'js', 'react']);