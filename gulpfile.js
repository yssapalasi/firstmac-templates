var gulp               = require('gulp'),
    gutil              = require('gulp-util'),
    deploy             = require("gulp-gh-pages"),
    ejs                = require('gulp-ejs'),
    livereload         = require('gulp-livereload'),
    express            = require('express'),
    argv               = require('yargs').argv,
    app                = express();

var MetalSmith         = require('metalsmith'),
    autoprefixer       = require('metalsmith-autoprefixer'),
    collection         = require('metalsmith-collections'),
    handlebars         = require('handlebars'),
    ignore             = require('metalsmith-ignore'),
    sass               = require('metalsmith-sass'),
    templates          = require('metalsmith-templates'),
    q                  = require('q'),
    _                  = require('lodash');

var tmp                = './.tmp';
var prod               = './build';
var env                = argv.type || 'development';
var base = {
  production: '',
  development: 'http://localhost:4000'
}

handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

function url(){
  return function addUrl(files, metalsmith, done){
    for (var file in files) {
      files[file].url = '/' + file;
    }
    done();
  };
}

function tree() {
  return function tree(files, metalsmith, done){
    for (var file in files) {
      (function () {
        var path = file.split('/');
        var siblings = [];
        path.pop();

        for (var possibleSibling in files) {
          var possibleSiblingPath = possibleSibling.split('/');
          possibleSiblingPath.pop();

          if ((file !== possibleSibling) && _.isEqual(path, possibleSiblingPath)) {
            siblings.push(files[possibleSibling]);
          }
        }

        return files[file].siblings = siblings;
      })(file, files);
    }
    done();
  }
}


gulp.task('smith', function () {
  var defered = q.defer();

  MetalSmith(__dirname)
    .use(url())
    .use(tree())
    .use(collection({
      templates: 'templates/**/index.html'
    }))
    .use(ignore('**/_*.scss'))
    .use(sass({
      outputStyle: "expanded"
    }))
    .use(autoprefixer())
    .use(templates({
      engine: 'handlebars',
      directory: 'layouts'
    }))
    .destination(tmp)
    .build(function () {
      return defered.resolve.call(defered, arguments);
    });

  return defered.promise;
});

gulp.task('build', ['smith'], function () {
  return gulp.src(tmp + '/templates/**/*.html', { base: './.tmp/templates' })
    .pipe(ejs({ baseUrl: base[env] }).on('error', gutil.log))
    .pipe(gulp.dest(tmp + '/templates'));
});

gulp.task('build-production', ['smith'], function () {
  return gulp.src(tmp + '/**/*', { base: './.tmp' })
    .pipe(ejs({ baseUrl: base['production'] }).on('error', gutil.log))
    .pipe(gulp.dest(prod));
});

gulp.task('watch', function() {
  var server = livereload();

  var reload = function(file) {
    server.changed(file.path);
  };

  gulp.watch('./src/**/*.*', ['build']);
  gulp.watch(tmp + '/**/*.*').on('change', reload);
});

gulp.task('serve', ['build', 'watch'], function () {
  return app
    .use(express.static(tmp))
    .listen(4000, function () {
      console.log('Express Server listening on 4000');
    });
});

gulp.task('publish', ['build-production'], function () {
  return gulp.src("./build/**/*")
    .pipe(deploy());
});

gulp.task('default', ['serve']);
