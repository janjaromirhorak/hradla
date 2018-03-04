"use strict";

const
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    traceur = require('gulp-traceur-cmdline'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    htmlmin = require('gulp-html-minifier'),
    fs = require('fs'),
    htmlReplace = require('gulp-html-replace'),
    runSequence = require('run-sequence'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'),
    zip = require('gulp-zip'),
    tar = require('gulp-tar'),
    gzip = require('gulp-gzip');

const config = require('./config.json')
const packageData = require('./package.json')

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

const packaged = 'packaged';

const src = 'src';
const srcCss = src + '/' + 'scss';
const srcJs = src + '/' + 'es6';

const lib = 'lib';

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
        .pipe(traceur({modules: 'inline', "source-maps": "inline"}))
        .pipe(gulp.dest(outJs))
        .pipe(rename({suffix: '.min'})) // minified production js
        .pipe(uglify())
        .pipe(gulp.dest(outJs)) // not minified development js with an inline source map
});


gulp.task('lib-lity', ['lib-lity-js', 'lib-lity-css']);

gulp.task('lib-lity-js', () => {
    return gulp.src(lib + '/lity/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(outJs + '/lib'));
});

gulp.task('lib-lity-css', () => {
    return gulp.src(lib + '/lity/*.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(outCss + '/lib'));
});

gulp.task('lib-other-js', () => {
    return gulp.src(lib + '/other-js/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(outJs + '/lib'));
});

// copies all libraries
gulp.task('libraries', ['lib-lity', 'lib-other-js']);

// minimies the html file
gulp.task('html', () => {
    let replace = {
        title: config.title,
        gtag: ''
    }

    // inject the Google Analytics Gtag code, if the analytics id is specified in the config file
    if(config.analytics) {
        replace.gtag = getAnalyticsCode(analytics)
    }

    return gulp.src('index.html')
        .pipe(htmlReplace(replace))
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(out));
});

// copies images
gulp.task('images', () => {
    return gulp.src('img/*/*.svg')
        .pipe(imagemin([
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
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
    let replace = {
        title: config.title,
        gtag: ''
    };

    // inject the Google Analytics Gtag code, if the analytics id is specified in the config file
    if(config.analytics) {
        replace.gtag = getAnalyticsCode(analytics)
    }

    return gulp.src(docs + '/backend/include/head.inc')
        .pipe(htmlReplace(replace))
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

gulp.task('production', () => {
    return runSequence('default', 'package');
})

gulp.task('empty', () => {});

///// packaging

// create a zip archive
gulp.task('zip', () => {
    return gulp.src(out + '/**/*')
        .pipe(zip('hradla-' + packageData.version + '.zip'))
        .pipe(gulp.dest(packaged))
})

// create a tarball
gulp.task('tarball', () => {
    return gulp.src(out + '/**/*')
        .pipe(tar('hradla-' + packageData.version + '.tar'))
        .pipe(gzip())
        .pipe(gulp.dest(packaged));
})

// create the zip archive and the tarball
gulp.task('package', ['zip', 'tarball'])


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
