'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    rename = require('gulp-rename'),
    rimraf = require('rimraf'),
    jsdoc = require('gulp-jsdoc');

var path = {
    build: {
        js: 'build/js/'
    },
    dist: {
        js: 'dist/js/'
    },
    src: { //���� ������ ����� ���������
        js: 'src/jcdu.js',//� ������ � �������� ��� ����������� ������ main �����
        simplyJs: 'src/jcdu.simply.js',
        allFiles: 'src/jcdu.js'
    },
    doc: './jsdoc',
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

//gulp.task('js:buildSimply', function () {
//    gulp.src(path.src.simplyJs) //������ ��� main ����
//        .pipe(rigger()) //�������� ����� rigger
//        //.pipe(uglify()) //������ ��� js
//        .pipe(gulp.dest(path.build.js)); //�������� ������� ���� � build
//});

gulp.task('js:dist', function () {
    gulp.src(path.src.js) //������ ��� main ����
        .pipe(rigger()) //�������� ����� rigger
        .pipe(uglify()) //������ ��� js
        .pipe(rename('jcdu.min.js'))
        .pipe(gulp.dest(path.dist.js)); //�������� ������� ���� � build
});

gulp.task('js:doc', function () {
    rimraf(path.doc + '/*', function () {
        gulp.src(path.build.js + 'jcdu.js')
            .pipe(jsdoc(path.doc));
    });
});

//gulp.task('js:distSimply', function () {
//    gulp.src(path.src.simplyJs) //������ ��� main ����
//        .pipe(rigger()) //�������� ����� rigger
//        .pipe(uglify()) //������ ��� js
//        .pipe(gulp.dest(path.dist.js)); //�������� ������� ���� � build
//});

gulp.task('watch', function () {
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['js:build', 'js:dist']);
gulp.task('build and doc', ['js:build', 'js:doc']);
//gulp.task('defaultSimply', ['js:buildSimply', 'js:distSimply']);