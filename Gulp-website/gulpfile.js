var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');

//File paths
const SCRIPTS_PATH = 'public/scripts/**/*.js';

//styles
gulp.task('styles', function() {
  console.log('starting styles task');
});

//scripts
gulp.task('scripts', function(cb) {
  console.log('starting scripts task');
  //piping just means passing a file through multiple steps. this step calls uglify and then that files write/save into public/dist folder
  gulp.src(SCRIPTS_PATH).pipe(uglify()).pipe(gulp.dest('public/dist')).pipe(livereload);
  cb();
});

//Images
gulp.task('images', function(cb) {
  console.log('starting images task');
  cb();
});

gulp.task('default', function(cb) {
  console.log('starting default task');
  cb();
});

gulp.task('watch', function(cb) {
  console.log('starting watch task');
  require('./server.js');
  livereload.listen();
  gulp.watch(SCRIPTS_PATH, gulp.series('scripts'));
  cb();
});