# hradla
Logic network simulator that runs in your browser.

## install
You will need [yarn](https://yarnpkg.com/) and [gcc](https://gcc.gnu.org/) (or some other C++ compiler) to build this project. (C++ compiler is required because the current implementation of [gulp-sass](https://github.com/dlmanning/gulp-sass) uses [node-sass](https://github.com/sass/node-sass) which
is dependent on [LibSass](https://github.com/sass/libsass), that requires a~C++ compiler.)

Use `yarn install` to install dependencies, than `yarn gulp` to build the production version of the project.
The project will be built into the `/dist` directory.

In one command:
```bash
yarn install && yarn gulp
```

To build a development version of the project run `yarn gulp build-dev`.

If you have [gulp](https://github.com/gulpjs/gulp) (version 4.0.0 or higher) installed globally on your system,
you can run `gulp` instead of `yarn gulp`.

## download compiled code
You also can download the [already compiled version](https://github.com/janjaromirhorak/hradla/releases/latest) of the latest release.

## live version
[https://janjaromirhorak.github.io/hradla/](https://janjaromirhorak.github.io/hradla/)

## live documentation
[https://janjaromirhorak.github.io/hradla/docs/gen/](https://janjaromirhorak.github.io/hradla/docs/gen/)
