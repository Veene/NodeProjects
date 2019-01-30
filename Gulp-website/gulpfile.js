var gulp = require('gulp');
var uglify = require('gulp-uglify');

//styles
gulp.task('styles', function() {
  console.log('starting styles task');
});

//scripts
gulp.task('scripts', function(cb) {
  console.log('starting scripts task');
  //piping just means passing a file through multiple steps. this step calls uglify and then that files write/save into public/dist folder
  gulp.src('public/scripts/*.js').pipe(uglify()).pipe(gulp.dest('public/dist'));
  cb()
});

//Images
gulp.task('images', function(cb) {
  console.log('starting images task');
  cb()
});

gulp.task('default', function(cb) {
  console.log('starting default task');
  cb()
});