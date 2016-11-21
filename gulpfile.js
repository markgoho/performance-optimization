'use strict';

var gulp        = require('gulp'),
	concat		= require('gulp-concat'),
	uglify      = require('gulp-uglify'),
	rename      = require('gulp-rename'),
	sass        = require('gulp-sass'),
    maps        = require('gulp-sourcemaps'),
    autoprefix	= require('gulp-autoprefixer'),
    del 		= require('del'),
    csso		= require('gulp-csso');

gulp.task("concatScripts", function() {
	return gulp.src([
			 'js/fastclick.js',
			 'js/foundation.js',
			 'js/foundation.equalizer.js',
			 'js/foundation.reveal.js'
		   ])
		   .pipe(maps.init())
		   .pipe(concat('app.js'))
		   .pipe(maps.write('./'))
		   .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", function() {
	return gulp.src("js/app.js")
			   .pipe(uglify())
		       .pipe(rename('app.min.js'))
		       .pipe(gulp.dest('js'));
});

gulp.task('minifyCSS', function() {
	return gulp.src('css/styles.css')
			   .pipe(csso())
			   .pipe(rename('styles.min.css'))
			   .pipe(gulp.dest('css'));
});

gulp.task("deploy", ['concatScripts', 'minifyScripts', 'compileSass'], function() {
	return gulp.src(['css/main.css', 'js/app.min.js', 'index.html', 'img/**', 'fonts/**'], { base: './'})
			   .pipe(gulp.dest('dist'));
});

gulp.task("default", ['deploy']);