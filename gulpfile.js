const gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    traceur = require('gulp-traceur-cmdline'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    htmlmin = require('gulp-html-minifier');

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
const docsOut = docs + '/' + 'deploy';
const docsCss = docsOut + '/' + 'css';

// compile and minimize sass
gulp.task('styles', () => {
    return sass(srcCss + '/style.scss', {style: 'expanded'})
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
    return gulp.src('index.html')
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
    return sass(docs + '/src/scss/style.scss', {style: 'expanded'})
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest(docsCss))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest(docsCss));
});

gulp.task('docs-backend', () => {
    return gulp.src([docs + '/backend/**/*', docs + '/backend/.htaccess'])
        .pipe(gulp.dest(docsOut));
});

gulp.task('docs-text', () => {
    return gulp.src(docs + '/text/**/*')
        .pipe(gulp.dest(docsOut + '/text'));
});

gulp.task('docs-clean', () => {
    return del(docsOut);
});

gulp.task('docs', ['docs-styles', 'docs-backend', 'docs-text']);

gulp.task('default', ['scripts', 'styles', 'libraries', 'html', 'images']);