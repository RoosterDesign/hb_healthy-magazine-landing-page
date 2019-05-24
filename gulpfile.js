'use strict';
 
const 
    gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    replace = require('gulp-replace'),
    fs = require('fs');


// SCSS

sass.compiler = require('node-sass');

gulp.task('sass', function () {

    const plugins = [
        require('autoprefixer')({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        require("css-mqpacker")({sort: true})
    ];

    return gulp.src('./src/css/*.scss')
        .pipe(plumber())
        .pipe( sass({outputStyle: 'expanded'}).on('error', sass.logError) )
        .pipe(postcss(plugins))
        
        .pipe( gulp.dest('./dist/css') );
});

gulp.task('scripts', function() {
    return gulp.src('./src/js/*.js')
        .pipe(plumber())
        .pipe(babel())
        .pipe(uglify({
            mangle: false,
            compress: false,
            output: { beautify: true }
           }))
        .pipe( gulp.dest('./dist/js') );
    });

gulp.task('inject', function() {
    gulp.src('./*.html')
    .pipe(replace(/<link href="styles.css"[^>]*>/, function(s) {
        var style = fs.readFileSync('./dist/css/styles.css', 'utf8');
        return '<style>\n' + style + '\n</style>';
    }))
    .pipe(replace(/<script src="scripts.js"[^>]*>/, function(s) {
        var script = fs.readFileSync('./dist/js/scripts.js');
        return '<script>\n' + script + '\n</script>';
    }))
    .pipe(gulp.dest('./dist/html'));
    });

// Watch/Default Tasks
gulp.task('watch', function () {
    gulp.watch('./src/js/*.js', ['scripts']);
    gulp.watch('./src/css/**/*.scss', ['sass']);
    gulp.watch('./dist/js/*.js', ['inject']);
    gulp.watch('./dist/css/*.css', ['inject']);
});

gulp.task('default', ['watch', 'sass', 'scripts', 'inject']);