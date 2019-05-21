//Set up all of your variables as gulp packages!
// This should be the first thing you do in this gulp file!

var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nest = require('postcss-nested');
var cssImport = require('postcss-import');
//it is possible to just require in methods of certain packages.
// like the code below!
var browserSync = require('browser-sync').create();



gulp.task('default', function(){
	console.log("hurray! gulp is here!")
});

gulp.task('html', function(){
	console.log("Image something useful happening to your html here");
});

gulp.task('styles', function(){
	//This is how you pipe things in gulp! Think of it as a filtering system!
	// gulp.src('filename').pipe(gulp.dest('filename'))
	return gulp.src('./app/assets/styles/styles.css')
		 .pipe(postcss([cssImport, nest, autoprefixer, cssvars]))
		.pipe(gulp.dest('./app/temp/styles'));
});


gulp.task('watch', function() {
	//The code below is how you use browser-sync!
	//This will load our webpage when you run gulp watch in the 
	//command line!
	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}

	});
	//The code './app/index.html' means in the directory you're in now, go to a folder called 'app' to watch
	// index.html, then start the task 'html'.
	watch('./app/index.html', function(){
		//This was some example dummy task to exhibit how gulp watch
		//functions
		//// gulp.start('html');
		//THIS CODE, using browserSync, actually reloads out page
		//EVERYTIME A CHANGE IS MADE IN OUR HTML!
		 browserSync.reload();
	});

	//this code means WATCH ANY EXISTING OR FUTURE CSS FILES
	watch('./app/assets/styles/**/*.css', function(){
		//This used to be the code we used to run the 'styles' task 
		////gulp.start('styles');
		//but instead, if we make the styles task a dependency of the
		//css-Inject task, we can set things up a little differently
		gulp.start('css-Inject');

	})
});

//What this task is saying:
//Run css-Inject when a change is made to our css files, but before you reload,
//make sure to take care of any DEPENDENCY task before you reload, in this 
//case it is our 'styles' task because it is what is in between the square
//brackets!
gulp.task('css-Inject', ['styles'], function(){
	return gulp.src('./app/temp/styles/styles.css')
	.pipe(browserSync.stream());
});