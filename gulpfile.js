'use strict';
// generated on 2016-04-28 using generator-ui-component 0.3.0
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    gnf = require('gulp-npm-files');

gulp.task('styles', function() {
    return gulp.src('src/styles/**/*.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            outputStyle: 'nested',
            includePaths: ['.'],
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe($.postcss([
            require('autoprefixer')({
                browsers: ['last 5 versions', 'android >= 2.1', '> 1%']
            })
        ]))
        .pipe($.sourcemaps.write())
        .pipe($.size({
            title: 'styles'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('styles-min', ['styles'], function() {
    return gulp.src('dist/**/*.css')
        .pipe($.postcss([
            require('cssnano')({
                autoprefixer: false
            })
        ]))
        .pipe($.rename({
            suffix: ".min",
        }))
        .pipe($.size({
            title: 'styles-min'
        }))
        .pipe(gulp.dest('dist'))
        .pipe($.gzip())
        .pipe($.size({
            title: 'styles-min gzipped'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.concat('component.js'))
        .pipe($.size({
            title: 'scripts'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('js-min', ['js'], function() {
    return gulp.src('dist/**/*.js')
        .pipe($.uglify())
        .pipe($.rename({
            suffix: ".min",
        }))
        .pipe($.size({
            title: 'scripts-min'
        }))
        .pipe(gulp.dest('dist'))
        .pipe($.gzip())
        .pipe($.size({
            title: 'scripts-min gzipped'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe($.imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{
                cleanupIDs: false
            }]
        }))
        .pipe($.size({
            title: 'images'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['dist','.dist-demo']));

gulp.task('watch', function() {
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['js']);
    gulp.watch('src/images/**/*', ['images']);
});

gulp.task('serve', ['default'], function() {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['./','dist']
        }
    });

    gulp.watch([
        '*.html',
        'dist/**/*'
    ]).on('change', reload);

    gulp.start('watch');
});

gulp.task('default', ['clean'], function() {
    gulp.start('copyNpmDependenciesOnly');
    gulp.start(['styles', 'js', 'images']);
});

gulp.task('build', function() {
    gulp.start('default');
});

gulp.task('dist', ['build'], function() {
    gulp.start(['styles-min', 'js-min']);
});

gulp.task('copy-dist', function() {
    return gulp.src([
        'dist/**/*'
        ])
        .pipe(gulp.dest('.dist-demo/dist'));
});

gulp.task('copy-html', function() {
    return gulp.src('index.html')
        .pipe(gulp.dest('.dist-demo'));
});

gulp.task('deploy',['copy-dist','copy-html'], function () {
    return gulp.src('.dist-demo/**/*')
        .pipe($.ghPages({
            force: true
    }));
});

// https://www.npmjs.com/package/gulp-npm-files
// gnf = require('gulp-npm-files')
//
// Copy dependencies to build/node_modules/ 
gulp.task('copyNpmDependenciesOnly', function() {
  gulp.src(gnf(), {base:'./'}).pipe(gulp.dest('dist'));
});
