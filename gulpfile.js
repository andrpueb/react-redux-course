let gulp = require('gulp');
let sass = require('gulp-sass');
let rename = require('gulp-rename');
let concat = require('gulp-concat');
let minify = require('gulp-minify-css');
let validator = require('gulp-html');
let inject = require('gulp-inject');
let webserver = require('gulp-webserver');

let paths = {
  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcCSS: 'src/**/*.css',
  srcSCSS: 'src/**/*.scss',
  srcJS: 'src/**/*.js',
  tmp: 'tmp',
  tmpIndex: 'tmp/index.html',
  tmpCSS: 'tmp/**/*.css',
  tmpJS: 'tmp/**/*.js',
  dist: 'dist',
  distIndex: 'dist/index.html',
  distCSS: 'dist/**/*.css',
  distJS: 'dist/**/*.js'
};

//Primero se evalúan los documentos scss

gulp.task('sass', function(){
  return gulp.src(paths.srcSCSS)
    .pipe(sass())
    .pipe(gulp.dest('src/'))
});

gulp.task('html', function () {
  return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmp));
});

gulp.task('css', function () {
  return gulp.src(paths.srcCSS).pipe(gulp.dest(paths.tmp));
});

gulp.task('js', function () {
  return gulp.src(paths.srcJS).pipe(gulp.dest(paths.tmp));
});


//el task copy ejecuta sass, html, css, js, primero sass para que convierta los documentos en css porque después css va a mover el documento a temp
gulp.task('copy',['sass','html', 'css', 'js']);


//se ejecuta inject pero primero 'copy'
gulp.task('inject', ['copy'], function () {
  var css = gulp.src(paths.tmpCSS);
  var js = gulp.src(paths.tmpJS);
  return gulp.src(paths.tmpIndex)
    .pipe(inject( css, { relative:true } ))
    .pipe(inject( js, { relative:true } ))
    .pipe(gulp.dest(paths.tmp));
});


//Se ejecuta serve pero primero 'inject'
gulp.task('serve', ['inject'], function () {
  return gulp.src(paths.tmp)
    .pipe(webserver({
      port: 3000,
      livereload: true
    }));
});

gulp.task('watch', ['serve'], function () {
  gulp.watch(paths.src, ['inject']);
});

gulp.task('default', ['watch']);