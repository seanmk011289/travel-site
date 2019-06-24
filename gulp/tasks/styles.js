//Set up all of your variables as gulp packages!
// This should be the first thing you do in this gulp file!

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nest = require('postcss-nested');
var cssImport = require('postcss-import');
var mixins = require('postcss-mixins');

gulp.task('styles', function(){
	//This is how you pipe things in gulp! Think of it as a filtering system!
	// gulp.src('filename').pipe(gulp.dest('filename'))
	return gulp.src('./app/assets/styles/styles.css')
		 .pipe(postcss([cssImport, mixins, nest, autoprefixer, cssvars]))
		 //THe next line is an error handling method!
		 .on('error', function(errorInfo){
		 	console.log(errorInfo.toString());
		 	this.emit('end');
		 })
		.pipe(gulp.dest('./app/temp/styles'));
});