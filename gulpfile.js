'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var rimraf = require('gulp-rimraf');
var merge = require('merge2');
var sequence = require('run-sequence');

var paths = {
  source: "source/",
  output: "dist/",
  spec: "spec/"
}

gulp.task('clean', function () {
  return gulp.src([paths.output], { read: false })
    .pipe(rimraf());
});

gulp.task('compile:commonjs', function () {
  var project = ts.createProject('tsconfig.json', {
    typescript: require('typescript'),
    module:"commonjs"
  });

  var tsResult = gulp.src([paths.source + '**/*.ts', "typings/*.d.ts"])
    .pipe(project());

  return merge([
    tsResult.dts.pipe(gulp.dest(paths.output)),
    tsResult.js.pipe(gulp.dest(paths.output))
  ]);
});

gulp.task('compile:amd', function () {
  var project = ts.createProject('tsconfig.json', {
    typescript: require('typescript'),
    module: "amd"
  });

  var tsResult = gulp.src([paths.source + '**/*.ts', "typings/*.d.ts"])
    .pipe(project());

  return merge([
    tsResult.dts.pipe(gulp.dest(paths.output)),
    tsResult.js.pipe(gulp.dest(paths.output + "amd"))
  ]);
});

gulp.task('compile', function (done) {
  return sequence('clean', ['compile:commonjs', 'compile:amd'])
});

