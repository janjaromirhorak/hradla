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
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'),
    zip = require('gulp-zip'),
    tar = require('gulp-tar'),
    gzip = require('gulp-gzip'),
    markdown = require('gulp-markdown'),
    template = require('gulp-template-html'),
    insert = require('gulp-insert'),
    replace = require('gulp-replace');

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
const outDocs = out + '/' + 'docs';
const outDocsGenerated = outDocs + '/html_generated'

const packaged = 'packaged';

const src = 'src';
const srcCss = src + '/' + 'scss';
const srcJs = src + '/' + 'es6';

const srcDocs = 'docs';
const srcMd = srcDocs + '/' + 'md';

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

gulp.task('lib-lity', gulp.parallel('lib-lity-js', 'lib-lity-css'));

// copies all libraries
gulp.task('libraries', gulp.parallel('lib-lity', 'lib-other-js'));

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

gulp.task('docs-md', () => {
    // convert all md files into html
    return gulp.src(srcDocs + '/md/*.md')
        .pipe(markdown())
        .pipe(rename(path => {
            path.extname = ".html"
        }))
        .pipe(replace('.md', '.html'))
        .pipe(insert.prepend('<!-- build:md -->'))
        .pipe(insert.append('<!-- /build:md -->'))
        .pipe(gulp.dest(outDocsGenerated))
})

gulp.task('docs-template', () => {
    return gulp.src(outDocsGenerated + '/*')
        .pipe(template(srcDocs + '/index.html'))
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(outDocs))
})

gulp.task('docs-clean', () => {
    return del(outDocsGenerated)
})

gulp.task('docs-html', gulp.series('docs-md', 'docs-template', 'docs-clean'))

gulp.task('docs', gulp.parallel('docs-html', 'docs-styles'));

gulp.task('default', gulp.parallel('scripts', 'styles', 'libraries', 'html', 'images', 'docs'));

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
gulp.task('package', gulp.parallel('zip', 'tarball'))


///// watches

gulp.task('watch-scripts', () => {
    return watch(srcJs + '/**', gulp.series('scripts'))
});

gulp.task('watch-styles', () => {
   return watch(srcCss + '/**', gulp.series('styles'))
});

gulp.task('watch', gulp.parallel('watch-scripts', 'watch-styles'));
