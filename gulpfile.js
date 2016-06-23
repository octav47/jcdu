'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    rename = require('gulp-rename'),
    rimraf = require('rimraf');

var path = {
    build: {
        js: 'build/js/'
    },
    dist: {
        js: 'dist/js/'
    },
    src: { //Пути откуда брать исходники
        js: 'src/jcdu.js',//В стилях и скриптах нам понадобятся только main файлы
        simplyJs: 'src/jcdu.simply.js'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        js: 'src/*.js'
    },
    clean: './build/*'
};

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        //.pipe(uglify()) //Сожмем наш js
        .pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build
});

//gulp.task('js:buildSimply', function () {
//    gulp.src(path.src.simplyJs) //Найдем наш main файл
//        .pipe(rigger()) //Прогоним через rigger
//        //.pipe(uglify()) //Сожмем наш js
//        .pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build
//});

gulp.task('js:dist', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(uglify()) //Сожмем наш js
        .pipe(rename('jcdu.min.js'))
        .pipe(gulp.dest(path.dist.js)); //Выплюнем готовый файл в build
});

//gulp.task('js:distSimply', function () {
//    gulp.src(path.src.simplyJs) //Найдем наш main файл
//        .pipe(rigger()) //Прогоним через rigger
//        .pipe(uglify()) //Сожмем наш js
//        .pipe(gulp.dest(path.dist.js)); //Выплюнем готовый файл в build
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
//gulp.task('defaultSimply', ['js:buildSimply', 'js:distSimply']);