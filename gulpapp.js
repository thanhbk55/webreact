var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  uglify = require('gulp-uglify'),
  streamify = require('gulp-streamify'),
  watchify = require('watchify'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber');

module.exports = function(gulp) {
  var path = {
    MINIFIED_VER: './reactjs-app.min.js',
    DEST: './',
    ENTRY_POINT: './app.jsx'
  };

  var bundle = browserify(path.ENTRY_POINT, {
    extensions: ['.jsx'],
    transform: ['babelify'],
    cache: {},
    packageCache: {}
  });

  function compile(bundle) {
    bundle = bundle.bundle().on('error', function(e){console.log(e)});
    bundle
      .pipe(plumber())
      .pipe(source(path.MINIFIED_VER))
      // .pipe(streamify(uglify({file: path.MINIFIED_VER})))
      .pipe(gulp.dest(path.DEST))
      .pipe(notify('Compile <%= file.relative%> completed'));
  }

  gulp.task('default', function(){
    compile(bundle);
  })

  gulp.task('watch-app', function(){
    watcher = watchify(bundle);
    watcher.on('update', function() {
      compile(bundle);
    });
    compile(bundle);
  })
}
