// gulpfile.js
// Feb-15
// Contributors:
// 	Luis Matute
// 	Erick Salinas

"use strict";

// Dependencies =================================
	var gulp = require('gulp'),
		connect = require('gulp-connect'),
		watch = require('gulp-watch'),
		sass = require('gulp-ruby-sass'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		notify = require('gulp-notify'),
		minifyHTML = require('gulp-minify-html'),
		pngquant = require('imagemin-pngquant'),
		imagemin = require('gulp-imagemin'),
		browserify = require('gulp-browserify'),
		concat = require('gulp-concat'),
		copy = require('gulp-copy');

// Webserver Tasks ==============================
	gulp.task('webserver', function () {
		var opt = {
			root: './app/',
			livereload: true,
			port: 80,
			host: 'thisplay.dev'
		};
		connect.server(opt);
	});

// LiveReload Task ==============================
	gulp.task('livereload', function() {
		var files = ['./app/dist/assets/css/**/*.css','./app/dist/assets/js/**/*.js','./app/dist/**/*.html'];
		return gulp
			.src(files)
			.pipe(watch(files))
			.pipe(connect.reload());
	});

// Views Task ===================================
	gulp.task('views', function() {
		var opts = {};
		gulp
			.src('./app/src/index.html')
			.pipe(minifyHTML(opts))
			.pipe(gulp.dest('./app/dist/'));
		return gulp
			.src('./app/src/views/**/*')
			.pipe(minifyHTML(opts))
			.pipe(gulp.dest('./app/dist/views/'))
			.pipe(connect.reload());
	});

// Images Task ==================================
	gulp.task('imagemin', function() {
		return gulp.src('./app/src/assets/img/**/*')
				.pipe(imagemin({
					progressive: true,
					svgoPlugins: [{removeViewBox: false}],
					use: [pngquant()]
				}))
				.pipe(gulp.dest('./app/dist/assets/img/'));
	});

// SASS Task ====================================
	gulp.task('sass', function() {
		var opt = { trace: true };
		return sass('./app/src/assets/sass/master.scss', opt)
			.pipe(gulp.dest('app/dist/assets/css/'))
			.pipe(notify('Styles Task Completed'))
	});

// JS Task ======================================
	gulp.task('lint', function() {
		return gulp
			.src(['./app/src/assets/**/*.js','!**/*/libs/**/*'])
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
	});

// Copy extra files
	gulp.task('fonts' ,function() {
		return gulp.src('./app/src/assets/fonts/**/*')
				.pipe(gulp.dest('./app/dist/assets/fonts/'));
	});
	gulp.task('copy' ,function() {
		return gulp.src('./app/dist/assets/css/**/*')
				.pipe(gulp.dest('./app/src/assets/css/'));
	});

// Browserify Task ==============================
	gulp.task('browserify', function() {
		// Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
		return gulp
			.src(['./app/src/assets/js/main.js'])
			.pipe(browserify({
				insertGlobals: true,
				debug: false
			}))
			// Bundle to a single file
			// .pipe(uglify())
			.pipe(concat('bundle.js'))
			// Output it to our app/dist folder
			.pipe(gulp.dest('./app/dist/assets/js/'))
			.pipe(notify('Broserify Task Completed'));;
	});

// Watch Task ===================================
	gulp.task('watch', function() {
		gulp.watch(['./app/src/assets/js/**/*.js'],['lint','browserify']);
		gulp.watch('./app/src/assets/sass/**/*.scss',['sass','copy']);
		// gulp.watch('./app/src/assets/img/**/*',['imagemin']);
		gulp.watch('./app/src/assets/fonts/**/*',['fonts']);
		gulp.watch('./app/src/**/*.html',['views']);
	});

// Main Tasks ===================================
	gulp.task('default', ['dev','watch']);
	gulp.task('dev', ['views', 'sass', 'lint', 'browserify', 'livereload', 'webserver']);