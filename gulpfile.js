'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    rimraf = require('rimraf');

var path = {
    build: {
        js: 'build/js/'
    },
    dist: {
        js: 'dist/js/'
    },
    src: { //���� ������ ����� ���������
        js: 'src/jcdu.js'//� ������ � �������� ��� ����������� ������ main �����
    },
    watch: { //��� �� ������, �� ���������� ����� ������ �� ����� ���������
        js: 'src/*.js'
    },
    clean: './build/*'
};

gulp.task('js:build', function () {
    gulp.src(path.src.js) //������ ��� main ����
        .pipe(rigger()) //�������� ����� rigger
        //.pipe(uglify()) //������ ��� js
        .pipe(gulp.dest(path.build.js)); //�������� ������� ���� � build
});

gulp.task('js:dist', function () {
    gulp.src(path.src.js) //������ ��� main ����
        .pipe(rigger()) //�������� ����� rigger
        .pipe(uglify()) //������ ��� js
        .pipe(gulp.dest(path.dist.js)); //�������� ������� ���� � build
});

gulp.task('watch', function(){
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['js:build', 'js:dist']);