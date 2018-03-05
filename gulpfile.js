"use strict";

const
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    htmlmin = require('gulp-html-minifier'),
    htmlReplace = require('gulp-html-replace'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'),
    zip = require('gulp-zip'),
    tar = require('gulp-tar'),
    gzip = require('gulp-gzip'),
    markdown = require('gulp-markdown'),
    template = require('gulp-template-html'),
    insert = require('gulp-insert'),
    replace = require('gulp-replace'),
    changed = require('gulp-changed'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    babel = require('babelify'),
    filter = require('gulp-filter'),
    gulpif = require('gulp-if');

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

const
    out = 'dist',
    outCss = out + '/css',
    outJs = out + '/js',
    outImg = out + '/img',
    outDocs = out + '/docs',

    packaged = out + '/archives',

    src = 'src',
    srcCss = src + '/scss',
    srcJs = src + '/es6',

    srcDocs = 'docs',
    srcMd = srcDocs + '/md',

    lib = 'lib',

    docs = 'docs',
    docsOut = out + '/docs',
    docsCss = docsOut + '/css'

let production = false

gulp.task('production', (done) => {
        production = true
        done() // required to signal async completion
})

// compile and minimize sass
gulp.task('styles', () => {
    return gulp.src(srcCss + '/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulpif(production, rename({suffix: '.min'})))
        .pipe(gulpif(production, cssnano()))
        .pipe(gulp.dest(outCss))
});

// compile and minimize es6
gulp.task('scripts', () => {
    const jsFilter = filter('**/*.js', {restore: true});

    const startpoint = 'main.js'
    const startpointPath = srcJs + '/' + startpoint

    return browserify(startpointPath, { debug: true })
        .transform(babel.configure({
            presets: ['babel-preset-env'].map(require.resolve)
        }))
        .bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source(startpoint))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulpif(production, jsFilter))
        .pipe(gulpif(production, rename({suffix: '.min'})))
        .pipe(gulpif(production, uglify()))
        .pipe(gulp.dest(outJs))
});

gulp.task('lib-lity-js', () => {
    const outLoc = outJs + '/lib'

    return gulp.src(lib + '/lity/*.js')
        .pipe(changed(outLoc))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(outLoc));
});

gulp.task('lib-lity-css', () => {
    const outLoc = outCss + '/lib'

    return gulp.src(lib + '/lity/*.css')
        .pipe(changed(outLoc))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(outLoc));
});

gulp.task('lib-other-js', () => {
    const outLoc = outJs + '/lib'

    return gulp.src(lib + '/other-js/*.js')
        .pipe(changed(outLoc))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(outLoc));
});

gulp.task('lib-lity', gulp.parallel('lib-lity-js', 'lib-lity-css'));

// copies all libraries
gulp.task('libraries', gulp.parallel('lib-lity', 'lib-other-js'));

// minimies the html file
gulp.task('html', () => {
    let entryPoint = 'main.js'
    let styleSheet = 'style.css'

    if (production) {
        entryPoint = 'main.min.js'
        styleSheet = 'style.min.css'
    }

    let replace = {
        title: config.title,
        // inject the Google Analytics Gtag code, if the analytics id is specified in the config file
        gtag: config.analytics ? getAnalyticsCode(analytics) : '',
        // set the correct css and js file names
        entryPoint: `<script src="js/${entryPoint}"></script>`,
        styleSheet: `<link href="css/${styleSheet}" rel="stylesheet">`
    }

    return gulp.src('index.html')
        .pipe(changed(out))
        .pipe(htmlReplace(replace))
        .pipe(gulpif(production, htmlmin({collapseWhitespace: true, removeComments: true})))
        .pipe(gulp.dest(out));
});

// copies images
gulp.task('images', () => {
    return gulp.src('img/*/*.svg')
        .pipe(changed(outImg))
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
        .pipe(changed(docsCss))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulpif(production, rename({suffix: '.min'})))
        .pipe(gulpif(production, cssnano()))
        .pipe(gulp.dest(docsCss));
});

// compile the html pages for docs from the md files
gulp.task('docs-html', () => {
    return gulp.src(srcDocs + '/md/*.md')
        .pipe(markdown())
        .pipe(rename(path => {
            path.extname = ".html"
        }))
        .pipe(replace('.md', '.html'))
        // wrap the generated html between <!-- build:md --> tags to mark it for the template plugin
        .pipe(insert.prepend('<!-- build:md -->'))
        .pipe(insert.append('<!-- /build:md -->'))
        // put the generated file into a predefined template
        .pipe(template(srcDocs + '/index.html'))
        .pipe(gulpif(production, htmlmin({collapseWhitespace: true, removeComments: true})))
        .pipe(gulp.dest(outDocs))
})

gulp.task('docs', gulp.parallel('docs-html', 'docs-styles'));

///// create archives
// create a zip archive
gulp.task('zip', () => {
    return gulp.src(out + '/**/*')
        .pipe(changed(packaged))
        .pipe(zip('hradla-' + packageData.version + '.zip'))
        .pipe(gulp.dest(packaged))
})

// create a tarball
gulp.task('tarball', () => {
    return gulp.src(out + '/**/*')
        .pipe(changed(packaged))
        .pipe(tar('hradla-' + packageData.version + '.tar'))
        .pipe(gzip())
        .pipe(gulp.dest(packaged));
})

// create the zip archive and the tarball
gulp.task('package', gulp.parallel('zip', 'tarball'))


///// main scripts
// build the whole project

gulp.task('build-all', gulp.series('clean', gulp.parallel('scripts', 'styles', 'libraries', 'html', 'images', 'docs')))
gulp.task('build-prod', gulp.series('production', 'build-all', 'package'))

gulp.task('build-dev', gulp.series('build-all'))

gulp.task('default', gulp.series('build-prod'));

///// watches

gulp.task('watch-scripts', () => {
    return watch(srcJs + '/**', gulp.series('scripts'))
});

gulp.task('watch-styles', () => {
   return watch(srcCss + '/**', gulp.series('styles'))
});

gulp.task('watch', gulp.parallel('watch-scripts', 'watch-styles'));
