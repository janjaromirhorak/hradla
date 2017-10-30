"use strict";

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    traceur = require('gulp-traceur-cmdline'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    htmlmin = require('gulp-html-minifier'),
    fs = require('fs'),
    htmlreplace = require('gulp-html-replace');
    runSequence = require('run-sequence'),
    watch = require('gulp-watch');

const configFile = 'config.json';

// get parsed config file
let config = false;
function getConfig() {
    if(!config) {
        config = JSON.parse(fs.readFileSync('./'+configFile));
    }
    return config;
}

function getAnalyticsCode(analyticsId) {
    return "<script async src=\"https://www.googletagmanager.com/gtag/js?id=" + analyticsId +"\"></script>" +
        "<script>\n" +
        "    window.dataLayer = window.dataLayer || [];\n" +
        "    function gtag(){dataLayer.push(arguments)};\n" +
        "    gtag('js', new Date());\n" +
        "\n" +
        "    gtag('config', '" + analyticsId + "');\n" +
        "</script>";
}

const out = 'deploy';
const outCss = out + '/' + 'css';
const outJs = out + '/' + 'js';
const outImg = out + '/' + 'img';

const src = 'src';
const srcCss = src + '/' + 'scss';
const srcJs = src + '/' + 'es6';

const lib = 'lib';
const libCss = lib + '/' + 'css';
const libJs = lib + '/' + 'js';

const docs = 'docs';
const docsOut = out + '/' + 'docs';
const docsCss = docsOut + '/' + 'css';

// compile and minimize sass
gulp.task('styles', () => {
    return gulp.src(srcCss + '/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest(outCss))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest(outCss));
});

// compile and minimize es6
gulp.task('scripts', () => {
    return gulp.src(srcJs + '/main.js')
        .pipe(traceur({modules: 'inline'}))
        .pipe(gulp.dest(outJs))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(outJs))
});

// copy and minimize JS libraries
gulp.task('libraries-js', () => {
    return gulp.src(libJs + '/**/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(outJs + '/lib'))
});

// copy and minimize CSS libraries
gulp.task('libraries-css', () => {
    return gulp.src(libCss + '/**/*.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest(outCss + '/lib'));
});

// copies all libraries
gulp.task('libraries', ['libraries-js', 'libraries-css']);

// minimies the html file
gulp.task('html', () => {
    let conf = getConfig();
    let analytics = conf['analytics'];
    let replace = {
        title: conf['title'],
        gtag: ''
    };

    // inject the Google Analytics Gtag code, if the analytics id is specified in the config file
    if(analytics) {
        replace.gtag = getAnalyticsCode(analytics)
    }

    return gulp.src('index.html')
        .pipe(htmlreplace(replace))
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(out));
});

// copies images
gulp.task('images', () => {
    return gulp.src('img/*/*.svg')
        .pipe(gulp.dest(outImg));
});

// removes the deploy directory
gulp.task('clean', () => {
    return del(out);
});

gulp.task('docs-styles', () => {
    return gulp.src(docs + '/src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest(docsCss))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest(docsCss));
});

gulp.task('docs-backend-copy', () => {
    return gulp.src([docs + '/backend/**/*', docs + '/backend/.htaccess'])
        .pipe(gulp.dest(docsOut));
});

// copy doc's backend files, than inject the page title and gtag into the backend/include/head.inc file
gulp.task('docs-backend', ['docs-backend-copy'], () => {
    let conf = getConfig();
    let analytics = conf['analytics'];
    let replace = {
        title: conf['title'],
        gtag: ''
    };

    // inject the Google Analytics Gtag code, if the analytics id is specified in the config file
    if(analytics) {
        replace.gtag = getAnalyticsCode(analytics)
    }

    return gulp.src(docs + '/backend/include/head.inc')
        .pipe(htmlreplace(replace))
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(docsOut  + '/include'));
});

gulp.task('docs-text', () => {
    return gulp.src(docs + '/text/**/*')
        .pipe(gulp.dest(docsOut + '/text'));
});

// generate docs in the docs/deploy folder, then copy it into the deploy/docs folder
gulp.task('docs', ['docs-styles', 'docs-backend', 'docs-text']);

gulp.task('default', ['scripts', 'styles', 'libraries', 'html', 'images', 'docs']);

gulp.task('empty', () => {});

///// watches

gulp.task('watch-scripts', () => {
    return watch(srcJs + '/**', function () {
        runSequence('scripts');
    });
});

gulp.task('watch-styles', () => {
   return watch(srcCss + '/**', function () {
      runSequence('styles');
   });
});

gulp.task('watch', ['watch-scripts', 'watch-styles']);