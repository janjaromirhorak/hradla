"use strict";

const gulp = require('gulp');

// system for lazy loading modules, because the gulp starting time has become quite slow with all the modules
class Modules {
    constructor() {
        this.loaded = {};

        this.moduleNames = new Map();

        this.get = (module) => {
            if (!(module in this.loaded)) {
                const packageName = this.moduleNames.get(module);
                if(!packageName) {
                    console.error(`Module ${module} is not registered in modules.`);
                } else {
                    try {
                        this.loaded[module] = require(packageName);
                    } catch (error) {
                        if (error.code === 'MODULE_NOT_FOUND') {
                            console.error(`Package ${packageName} for module ${module} has not been found. Is it installed?`);
                        } else {
                            throw error;
                        }
                    }
                }
            }
            return this.loaded[module];
        }
    }

    addModule(moduleName, packageName) {
        this.moduleNames.set(moduleName, packageName);
    }

    addModules(obj) {
        for (const module in obj) {
            this.addModule(module, obj[module]);
        }
    }
}

let modules = new Modules();
modules.addModules({
    autoprefixer: 'gulp-autoprefixer',
    cssnano: 'gulp-cssnano',
    uglify: 'gulp-uglify',
    rename: 'gulp-rename',
    del: 'del',
    file: 'gulp-file',
    htmlmin: 'gulp-html-minifier',
    watch: 'gulp-watch',
    imagemin: 'gulp-imagemin',
    zip: 'gulp-zip',
    tar: 'gulp-tar',
    gzip: 'gulp-gzip',
    markdown: 'gulp-markdown',
    template: 'gulp-template-html',
    insert: 'gulp-insert',
    replace: 'gulp-replace',
    changed: 'gulp-changed',
    sourcemaps: 'gulp-sourcemaps',
    source: 'vinyl-source-stream',
    buffer: 'vinyl-buffer',
    browserify: 'browserify',
    babel: 'babelify',
    filter: 'gulp-filter',
    gulpif: 'gulp-if',
    jsdoc: 'gulp-jsdoc3',
    sass: 'gulp-sass'
});

const config = require('./config.json')
const packageData = require('./package.json')

let getAnalyticsCode = (analyticsId) => {
    let str = `<script async src="https://www.googletagmanager.com/gtag/js?id=${analyticsId}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)};
        gtag('js', new Date());
        gtag('config', '${analyticsId}');
    </script>`;
    if (production) {
        str = str.replace(/(?:\r\n|\r|\n)/g, ' '); // replace line breaks with spaces
        str = str.replace(/ +/g, ' '); // concatenate multiple spaces into one
    }
    return str;
}

const
    out = 'dist',
    outCss = out + '/css',
    outJs = out + '/js',
    outImg = out + '/img',
    outDocs = out + '/docs',
    outJsDoc = outDocs + '/gen',

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
    const
        sass = modules.get('sass'),
        autoprefixer = modules.get('autoprefixer'),
        gulpif = modules.get('gulpif'),
        rename = modules.get('rename'),
        cssnano = modules.get('cssnano');

    return gulp.src(srcCss + '/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulpif(production, rename({suffix: '.min'})))
        .pipe(gulpif(production, cssnano()))
        .pipe(gulp.dest(outCss))
});

// compile and minimize es6
gulp.task('scripts', () => {
    const
        filter = modules.get('filter'),
        browserify = modules.get('browserify'),
        babel = modules.get('babel'),
        source = modules.get('source'),
        buffer = modules.get('buffer'),
        sourcemaps = modules.get('sourcemaps'),
        gulpif = modules.get('gulpif'),
        rename = modules.get('rename'),
        uglify = modules.get('uglify');

    const jsFilter = filter('**/*.js', {restore: true});

    const startpoint = 'main.js'
    const startpointPath = srcJs + '/' + startpoint

    return browserify(startpointPath, { debug: true })
        .transform(babel.configure({
            presets: ['babel-preset-env'].map(require.resolve)
        }))
        .bundle()
        .on('error', (err) => { console.error(err); this.emit('end'); })
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
    const
        changed = modules.get('changed'),
        uglify = modules.get('uglify'),
        rename = modules.get('rename');

    const outLoc = outJs + '/lib'

    return gulp.src(lib + '/lity/*.js')
        .pipe(changed(outLoc))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(outLoc));
});

gulp.task('lib-lity-css', () => {
    const
        changed = modules.get('changed'),
        cssnano = modules.get('cssnano'),
        rename = modules.get('rename');

    const outLoc = outCss + '/lib'

    return gulp.src(lib + '/lity/*.css')
        .pipe(changed(outLoc))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(outLoc));
});

gulp.task('lib-other-js', () => {
    const
        changed = modules.get('changed'),
        uglify = modules.get('uglify'),
        rename = modules.get('rename');

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

// generates the html file
gulp.task('html', () => {
    const
        file = modules.get('file'),
        insert = modules.get('insert'),
        gulpif = modules.get('gulpif'),
        template = modules.get('template'),
        htmlmin = modules.get('htmlmin');

    const entryPoint = production ? "main.min.js" : "main.js";
    const styleSheet = production ? "style.min.css" : "style.css";

    return file('index.html', '', {src: true})
        .pipe(insert.append('<!-- build:title -->'))
        .pipe(insert.append(config.title))
        .pipe(insert.append('<!-- /build:title -->'))

        .pipe(insert.append('<!-- build:styles -->'))
        .pipe(insert.append(`<link href="css/${styleSheet}" rel="stylesheet">`))
        .pipe(insert.append('<!-- /build:styles -->'))

        .pipe(insert.append('<!-- build:scripts -->'))
        .pipe(insert.append(`<script src="js/${entryPoint}"></script>`))
        .pipe(insert.append('<!-- /build:scripts -->'))

        .pipe(insert.append('<!-- build:analytics -->'))
        .pipe(gulpif(config.analytics !== false, insert.append(getAnalyticsCode(config.analytics))))
        .pipe(gulpif(config.analytics === false, insert.append(' ')))
        .pipe(insert.append('<!-- /build:analytics -->'))

        .pipe(template('index-template.html'))
        .pipe(gulpif(production, htmlmin({collapseWhitespace: true, removeComments: true})))

        .pipe(gulp.dest(out));
});

// copies images
gulp.task('images', () => {
    const
        changed = modules.get('changed'),
        imagemin = modules.get('imagemin');

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
    const del = modules.get('del');
    return del(out);
});

// compile the html pages for docs from the md files
gulp.task('docs', () => {
    const
        markdown = modules.get('markdown'),
        rename = modules.get('rename'),
        replace = modules.get('replace'),
        insert = modules.get('insert'),
        template = modules.get('template'),
        gulpif = modules.get('gulpif'),
        htmlmin = modules.get('htmlmin');

    let styleSheet = 'docs.css'
    if (production) {
        styleSheet = 'docs.min.css'
    }

    const snippets = {
        styleSheet: `<link href="../css/${styleSheet}" rel="stylesheet">`
    }

    return gulp.src(srcDocs + '/md/*.md')
        .pipe(markdown())
        .pipe(rename(path => {
            path.extname = ".html"
        }))
        .pipe(replace('.md', '.html'))
        // wrap the generated html between <!-- build:md --> tags to mark it for the template plugin
        .pipe(insert.prepend('<!-- build:md -->'))
        .pipe(insert.append('<!-- /build:md -->'))
        // add color examples after the colors described in the markdown
        .pipe(replace(/<!-- color (.*) -->/g, (match) => {
            const colorName = match.replace(/<!-- color | -->/g, '')
            return `<i class="color ${colorName}"></i>`
        }))
        // add links to the stylesheets
        .pipe(insert.append('<!-- build:styleSheet -->'))
        .pipe(insert.append(snippets.styleSheet))
        .pipe(insert.append('<!-- /build:styleSheet -->'))
        // put the generated file into a predefined template
        .pipe(template(srcDocs + '/index.html'))
        .pipe(gulpif(production, htmlmin({collapseWhitespace: true, removeComments: true})))
        .pipe(gulp.dest(outDocs))
})

gulp.task('doc', () => {
    const jsdoc = modules.get('jsdoc');

    const customCss = production ? "jsdoc.min.css" : "jsdoc.css";
    const jsdocConfig = {
        opts: {
            destination: outJsDoc,
            encoding: "utf8",
            private: true,
            recurse: true,
            template: "node_modules/tui-jsdoc-template"
        },
        templates: {
            name: "Hradla",
            footerText: config.title,
            logo: {
                url: "../../img/gate/xor.svg",
                width: "40px",
                height: "20px"
                // link: "../../"
            },
            css: [
                `../../css/${customCss}`,
            ]
        },
        plugins: [
            "plugins/markdown"
        ]
    }
    return gulp.src(['README.md', './' + srcJs + '/**/*.js'], {read: false})
        .pipe(jsdoc(jsdocConfig));
});

///// create archives
// create a zip archive
gulp.task('zip', () => {
    const
        changed = modules.get('changed'),
        zip = modules.get('zip');

    return gulp.src(out + '/**/*')
        .pipe(changed(packaged))
        .pipe(zip('hradla-' + packageData.version + '.zip'))
        .pipe(gulp.dest(packaged))
})

// create a tarball
gulp.task('tarball', () => {
    const
        changed = modules.get('changed'),
        tar = modules.get('tar'),
        gzip = modules.get('gzip');

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
    const watch = modules.get('watch');

    return watch(srcJs + '/**', gulp.series('scripts'))
});

gulp.task('watch-styles', () => {
    const watch = modules.get('watch');

    return watch(srcCss + '/**', gulp.series('styles'))
});

gulp.task('watch', gulp.parallel('watch-scripts', 'watch-styles'));
