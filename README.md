# hradla
Logic network simulator that runs in your browser.

## install
You will need [npm](https://www.npmjs.com/) and [gcc](https://gcc.gnu.org/) (or some other C++ compiler) to build this project. (C++ compiler is required because the current implementation of [gulp-sass](https://github.com/dlmanning/gulp-sass) uses [node-sass](https://github.com/sass/node-sass) which
is dependent on [LibSass](https://github.com/sass/libsass).)

Use `npm install` to install dependencies, than `npm run gulp` to build the project.

If you have [gulp](https://github.com/gulpjs/gulp) (version 4.0.0 or higher) installed globally on your system,
you can run `gulp` instead of `npm run gulp`.

In one command:
```bash
npm install && npm run gulp
```
or, if you have gulp (version 4.0.0 or higher) installed globally on your system
```bash
npm install && gulp
```

## download compiled code
You also can download the [already compiled version](https://github.com/janjaromirhorak/hradla/releases/latest) of the latest release.

## live version
[https://hradla.janjaromirhorak.cz/](https://hradla.janjaromirhorak.cz/)

## czech documentation
[docs/md/developer.md](docs/md/developer.md)
