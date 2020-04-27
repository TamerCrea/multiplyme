const gulp = require("gulp");
const rename = require("gulp-rename");
const browserify = require("browserify");

gulp.task("browserify", function () {
  return gulp.src("./src/multiply-me.js")
    .pipe(browserify())
    .pipe(rename("main.js"))
    .pipe(gulp.dest("./public_html/js"));
});

gulp.task("default", async function () {
  return console.log("funcionadoooooooooooooo!!");
});
