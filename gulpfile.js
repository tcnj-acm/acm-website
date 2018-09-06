/*
 NEW
*/

// File System
const fs = require('fs-extra')
const del = require('del')

// Gulp
const gulp = require('gulp')

// Generic Gulp Plugins
const rename = require('gulp-rename')

// Streams
const through = require('through2')
const merge = require('merge-stream')

// HTML
const htmlmin = require('gulp-htmlmin')

// CSS
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

// JavaScript
const uglify = require('gulp-uglify-es').default

// Images
const imagemin = require('gulp-imagemin')
const jimp = require('jimp')

// Handlebars
const hb = require('gulp-hb')
const hbhelpers = require('handlebars-helpers')

// YAML
const matter = require('gulp-gray-matter')

/*
 * TASKS
 */
const clean = () => del(['dist', 'favicon.json'])

const img = () =>
  merge(
    gulp.src(['src/img/**/*.{gif,jpg,jpeg,png,svg}', '!src/img/people/*.png']),
    gulp.src('src/img/people/*.png')
      .pipe(through.obj((file, enc, cb) =>
        jimp.read(file.contents).then(image => {
          if (image.getWidth() > 1000 && image.getHeight() > 1000) {
            image.resize(1000, 1000)
          }

          return image.getBufferAsync(jimp.MIME_PNG)
        }).then(buffer => {
          file.contents = buffer
          cb(null, file)
        }))
      ).pipe(rename({ dirname: 'people' }))
  ).pipe(imagemin([
    imagemin.gifsicle(),
    imagemin.jpegtran(),
    imagemin.optipng(),
    imagemin.svgo({ plugins: [{ removeTitle: false }] })
  ])).pipe(gulp.dest('dist/img'))

const css = () => gulp.src('src/css/**/*.css').pipe(postcss([autoprefixer, cssnano])).pipe(gulp.dest('dist/css'))
const js = () => gulp.src('src/js/**/*.js').pipe(uglify()).pipe(gulp.dest('dist/js'))
const other = () => gulp.src('src/other/**/*').pipe(gulp.dest('dist/other'))

const html = () => {
  const layout = fs.readFileSync('src/layout/html.hbs')
  const pages = fs.readdirSync('src/layout/pages')
    .map(name => name.substring(0, name.length - ('.hbs'.length)))
    .sort((a, b) => {
      if (a === 'index') {
        return -Infinity
      } else if (b === 'index') {
        return Infinity
      } else {
        return a.localeCompare(b)
      }
    })

  return gulp.src('src/layout/pages/*.hbs')
    .pipe(matter())
    .pipe(hb().helpers(hbhelpers))
    .pipe(through.obj((file, enc, cb) => {
      ['css', 'js'].forEach(ext => {
        file.data[ext] = [];
        ['all', file.basename.substring(0, file.basename.length - ('.hbs'.length))].forEach(basename => {
          if (fs.pathExistsSync(`src/${ext}/${basename}.${ext}`)) {
            file.data[ext].push(`${basename}.${ext}`)
          }
        })
      })
      file.data.content = file.contents.toString()
      file.data.pages = pages
      file.contents = layout
      cb(null, file)
    }))
    .pipe(matter())
    .pipe(hb().helpers(hbhelpers))
    .pipe(rename({
      dirname: '',
      extname: '.html'
    }))
    .pipe(htmlmin({ collapseBooleanAttributes: true }))
    .pipe(gulp.dest('dist'))
}

gulp.task('clean', clean)
gulp.task('default', gulp.series(clean, gulp.parallel(img, css, js, other, html)))
gulp.task('watch', () => {
  gulp.watch('src/img/**/*.{gif,jpg,jpeg,png,svg}', img)
  gulp.watch('src/css/**/*.css', css)
  gulp.watch('src/js/**/*.js', js)
  gulp.watch('src/other/**/*', other)
  gulp.watch('src/layout/**/*.hbs', html)
})
