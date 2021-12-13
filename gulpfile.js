const gulp = require('gulp')
const NgBuild = require('ng-build')

const registry = new NgBuild(this, {
  entryFile: 'src/index.ts',
  jest: {
    testURL: 'https://www.example.com?ctk=blah',
    coverageThreshold: {
      global: {
        statements: 80,
        branches: 63,
        lines: 80,
        functions: 87
      }
    }
  }
})

gulp.registry(registry)
gulp.task('ci:lint', gulp.series(['lint']))
gulp.task('ci:test', gulp.series(['test']))
