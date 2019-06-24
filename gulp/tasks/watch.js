
//Set up all of your variables as gulp packages!
// This should be the first thing you do in this gulp file!

var gulp = require('gulp');
var watch = require('gulp-watch');

//it is possible to just require in methods of certain packages.
// like the code below!
var browserSync = require('browser-sync').create();

gulp.task('watch', function() {
	//The code below is how you use browser-sync!
	//This will load our webpage when you run gulp watch in the 
	//command line!
	//
	//This is how you initialize browser-sync
	browserSync.init({
		notify: false,
		//this is where you tell browser-sync where your file lives
		server: {baseDir: "app"}

	});
	//The code './app/index.html' means in the directory you're in now, go to a folder called 'app' to watch
	// index.html, then start the task 'html'.
	watch('./app/index.html', function(){

		//This was some example dummy task to exhibit how gulp watch
		//functions
		//// gulp.start('html');

		//THIS CODE, using browser-sync, actually reloads the page
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