import browserSync from "browser-sync";
import gulp from "gulp";
import del from "del";
import pug from "gulp-pug";
import coreSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import concat from "gulp-concat";
import uglify from "gulp-uglify-es";
import imagemin from "gulp-imagemin";
import cache from "gulp-cache";
import gcmq from "gulp-group-css-media-queries";
import cleanCSS from "gulp-clean-css";
const sass = gulpSass(coreSass);
export const browserSyncFunc = () => {
    browserSync({
        server: {
            baseDir: "docs",
        },
        open: true,
        browser: "chrome",
        port: 3000
    });
}
export const html = () => {
    return gulp
    .src([
        "src/pug/*.pug"
    ])
    .pipe(pug({
        //pretty: true
    }))
    .pipe(gulp.dest("docs"))
    .pipe(browserSync.reload({
        stream: true
    }));
}
export const css = () => {
    return gulp
    .src([
        "src/sass/*.css",
        "src/sass/*.sass"
    ])
    .pipe(sass(
        {
            outputStyle: 'compressed'
        }
    )
    .on("error", sass.logError))
    .pipe(autoprefixer(["last 15 versions"], {cascade: true}))
    .pipe(gcmq("styles.css"))
    .pipe(concat("styles.css"))
    .pipe(cleanCSS({
        compatibility: 'ie8'
    }))
    .pipe(gulp.dest("docs/css"))
    .pipe(browserSync.reload({
        stream: true
    }));
}
export const js = () => {
    return gulp
    .src([
        "src/js/**/*.js"
    ])
    .pipe(uglify.default())
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("docs/js"))
    .pipe(browserSync.reload({
        stream: true
    }));
}
export const files = () => {
    return gulp.src([
        "src/*.*"
    ], {dot: true})
    .pipe(gulp.dest("docs"))
    .pipe(browserSync.reload({
        stream: true
    }));
}
export const fonts = () => {
    return gulp.src([
        "src/fonts/**/*.*"
    ])
    .pipe(gulp.dest("docs/fonts"))
    .pipe(browserSync.reload({
        stream: true
    }));
}
export const images = () => {
    return gulp.src([
        "src/img/**/*.*"
    ])
    .pipe(cache(imagemin()))
    .pipe(gulp.dest("docs/img"))
    .pipe(browserSync.reload({
        stream: true
    }));
}