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

gulp.task("concatJS", function() {
	return gulp.src([
			 'js/fastclick.js',
			 'js/foundation.js',
			 'js/foundation.equalizer.js',
			 'js/foundation.reveal.js',
			 'js/scripts.js'
		   ])
		   .pipe(maps.init())
		   .pipe(concat('app.js'))
		   .pipe(maps.write('./'))
		   .pipe(gulp.dest('js'));
});

gulp.task("concatCSS", function() {
	return gulp.src([
			 'css/normalize.css',
			 'css/foundation.css',
			 'css/basics.css',
			 'css/menu.css',
			 'css/hero.css',
			 'css/photo-grid.css',
			 'css/modals.css',
			 'css/footer.css'
		   ])
		   .pipe(maps.init())
		   .pipe(concat('styles.css'))
		   .pipe(maps.write('./'))
		   .pipe(gulp.dest('css'));
});

gulp.task("watchCSS", function() {
	gulp.watch("css/*.css", ["concatCSS", "minifyCSS"]);
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

gulp.task("deploy", ['concatJS', 'minifyScripts', 'concatCSS', 'minifyCSS'], function() {
	return gulp.src(['css/styles.min.css', 'js/app.min.js', 'index.html', 'img/**'], { base: './'})
			   .pipe(gulp.dest('dist'));
});

gulp.task("default", ['deploy']);