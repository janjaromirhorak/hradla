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
    gulpif: 'gulp-if',
    jsdoc: 'gulp-jsdoc3',
    sass: 'gulp-sass',
    jsoneditor: 'gulp-json-editor',
    tap: 'gulp-tap',
    eslint: 'gulp-eslint',
    eventStream: 'event-stream'
});

const packageData = require('./package.json')
const config = packageData.config;

const
    out = 'dist',
    outCss = out + '/css',
    outJs = out + '/js',
    outImg = out + '/img',
    outDocs = out + '/docs',
    outFonts = out + '/fonts',

    outJsDocRelative = 'gen',

    outJsDoc = outDocs + '/' + outJsDocRelative,

    packaged = out + '/archives',

    src = 'src',
    srcHtml = src + '/html',
    srcImg = src + '/img',
    srcCss = src + '/scss',
    srcJs = src + '/es6',

    srcDocs = src + '/help',
    srcMd = srcDocs + '/md',

    srcFonts = src + '/fonts',

    docs = 'docs',
    docsOut = out + '/docs',
    docsCss = docsOut + '/css',

    srcLibrary = 'library',
    outLibrary = out + '/library',

    ghPages = 'gh-pages'

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

gulp.task('scripts:lint', () => {
    const eslint = modules.get('eslint');

    return gulp.src(srcJs + '/**/*.js')
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
})

// compile and minimize es6
gulp.task('scripts:build', (done) => {
    const
        browserify = modules.get('browserify'),
        babel = modules.get('babel'),
        source = modules.get('source'),
        buffer = modules.get('buffer'),
        sourcemaps = modules.get('sourcemaps'),
        gulpif = modules.get('gulpif'),
        rename = modules.get('rename'),
        uglify = modules.get('uglify'),
        eventStream = modules.get('eventStream'),
        replace = modules.get('replace');

    const startpoints = ['main.js', 'routeWorker.js']

    let tasks = startpoints.map((startpoint) => {
        return browserify(srcJs + '/' + startpoint, { debug: true })
            .transform(babel.configure({
                presets: ['babel-preset-env'].map(require.resolve)
            }))
            .bundle()
            .on('error', (err) => { console.error(err); this.emit('end'); })
            .pipe(source(startpoint))
            .pipe(buffer())
            .pipe(gulpif(production, replace("[routeWorkerFileName]", "routeWorker.min.js")))
            .pipe(gulpif(!production, replace("[routeWorkerFileName]", "routeWorker.js")))
            .pipe(gulpif(!production, sourcemaps.init({ loadMaps: true })))
            .pipe(gulpif(!production, sourcemaps.write('./')))
            .pipe(gulpif(production, rename({suffix: '.min'})))
            .pipe(gulpif(production, uglify()))
            .pipe(gulp.dest(outJs))
        });

    // create a merged stream
    return eventStream.merge.apply(null, tasks).on('end', done);
});

gulp.task('scripts', gulp.series('scripts:lint', 'scripts:build'));

gulp.task('lib-lity-js', () => {
    const changed = modules.get('changed');

    const outLoc = outJs + '/lib'

    const src = production ? 'lity.min.js' : 'lity.js';

    return gulp.src(`./node_modules/lity/dist/${src}`)
        .pipe(changed(outLoc))
        .pipe(gulp.dest(outLoc));
});

gulp.task('lib-lity-css', () => {
    const changed = modules.get('changed');
    const outLoc = outCss + '/lib'

    const src = production ? 'lity.min.css' : 'lity.css';

    return gulp.src(`./node_modules/lity/dist/${src}`)
        .pipe(changed(outLoc))
        .pipe(gulp.dest(outLoc));
});

gulp.task('lib-lity', gulp.parallel('lib-lity-js', 'lib-lity-css'));

gulp.task('lib-jquery', () => {
    const changed = modules.get('changed');
    const outLoc = outJs + '/lib'

    const src = production ? 'jquery.min.js' : 'jquery.js';

    return gulp.src(`./node_modules/jquery/dist/${src}`)
        .pipe(changed(outLoc))
        .pipe(gulp.dest(outLoc));
});

// copies all libraries
gulp.task('libraries', gulp.parallel('lib-lity', 'lib-jquery'));

// copies the font directory
gulp.task('fonts', () => {
    return gulp.src(srcFonts + '/**/*')
        .pipe(gulp.dest(outFonts));
})

// generates the html file
gulp.task('html', () => {
    const
        file = modules.get('file'),
        insert = modules.get('insert'),
        gulpif = modules.get('gulpif'),
        template = modules.get('template'),
        htmlmin = modules.get('htmlmin');

    const p = production ? ".min" : "";

    return file('index.html', '', {src: true})
        .pipe(insert.append('<!-- build:title -->'))
        .pipe(insert.append(`${config.title} (v${packageData.version})`))
        .pipe(insert.append('<!-- /build:title -->'))

        .pipe(insert.append('<!-- build:styles -->'))
        .pipe(insert.append(`<link href="css/lib/lity${p}.css" rel="stylesheet">`))
        .pipe(insert.append(`<link href="css/style${p}.css" rel="stylesheet">`))
        .pipe(insert.append('<!-- /build:styles -->'))

        .pipe(insert.append('<!-- build:scripts -->'))
        .pipe(insert.append(`<script src="js/lib/jquery${p}.js"></script>`))
        .pipe(insert.append(`<script src="js/lib/lity${p}.js"></script>`))
        .pipe(insert.append(`<script src="js/main${p}.js"></script>`))
        .pipe(insert.append('<!-- /build:scripts -->'))

        .pipe(template(srcHtml + '/index.html'))
        .pipe(gulpif(production, htmlmin({collapseWhitespace: true, removeComments: true})))

        .pipe(gulp.dest(out));
});

// copies images
gulp.task('images', () => {
    const
        changed = modules.get('changed'),
        imagemin = modules.get('imagemin');

    return gulp.src(srcImg + '/**/*.svg')
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
gulp.task('help', () => {
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

    return gulp.src(srcDocs + '/*.md')
        .pipe(markdown())
        .pipe(rename(path => {
            path.extname = ".html"
        }))
        .pipe(replace('.md', '.html'))
        // wrap the generated html between <!-- build:md --> tags to mark it for the template plugin
        .pipe(insert.prepend('<!-- build:md -->'))
        .pipe(insert.append(`<p>For technical documentation please visit <a href="./${outJsDocRelative}/index.html" target="_blank">the docs</a>.</p>`))
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
        .pipe(template(srcHtml + '/help.html'))
        .pipe(gulpif(production, htmlmin({collapseWhitespace: true, removeComments: true})))
        .pipe(gulp.dest(outDocs))
})

gulp.task('jsdoc:generate', (done) => {
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
            footerText: `${config.title} (v${packageData.version})`,
            logo: {
                url: "../../img/svg/gate/xor.svg",
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
        .pipe(jsdoc(jsdocConfig, done));
});

gulp.task('jsdoc:clean', () => {
    const del = modules.get('del')
    return del(outJsDoc)
})

gulp.task('jsdoc', gulp.series('jsdoc:clean', 'jsdoc:generate'));

gulp.task('docs', gulp.parallel('help', 'jsdoc'));

// create network library
// Copy all files to outJson but get their file names and 'name' fields
// and save them to the 'networks' array. Then serialize this field and save is as JSON
gulp.task('library', () => {
    const
        jsoneditor = modules.get('jsoneditor'),
        file = modules.get('file'),
        insert = modules.get('insert'),
        tap = modules.get('tap');

    let currentFileName;

    let networks = [];

    return gulp.src(srcLibrary + '/*.json')
        .pipe(tap(function(file, t) {
            // get the file name
            currentFileName = file.path.split('/').pop().replace('.json', '');
        }))
        .pipe(jsoneditor((json) => {
            // add info about this network to the networks array
            networks.push({
                name: json.name, // name of the network parsed from the network JSON file
                file: currentFileName, // file name acquired using tap
                hasNetwork: json.boxes !== undefined, // true if the network has a gate layout defined
                hasTable: json.blackbox !== undefined // true if the network has a truth table defined
            });

            return json; // pass the network JSON through without changes
        }))
        .pipe(gulp.dest(outLibrary)) // save the networks in the output directory without changes
        .on('end', () => {
            // create the network list file from the networks array and save it
            return file('networkList.json', '', {src: true})
                .pipe(insert.append(JSON.stringify({networks})))
                .pipe(gulp.dest(outLibrary));
        });
})


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

gulp.task('gh-pages-copy', () => {
    return gulp.src(out + '/**/*').pipe(gulp.dest(ghPages));
})

// create the zip archive and the tarball
gulp.task('package', gulp.parallel('zip', 'tarball'))


///// main scripts
// build the whole project

gulp.task('build-all', gulp.series('clean', gulp.parallel('scripts', 'styles', 'library', 'libraries', 'html', 'images', 'fonts', 'docs')))
gulp.task('build-prod', gulp.series('production', 'build-all', 'package'))
gulp.task('gh-pages', gulp.series('production', 'build-all', 'gh-pages-copy'))

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
