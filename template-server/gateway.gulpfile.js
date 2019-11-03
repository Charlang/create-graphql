const { src, dest, series, watch } = require('gulp');
const ts = require('gulp-typescript');
const { spawn } = require('child_process');

const tsProject = ts.createProject('tsconfig.json');
/**
 * Build using tsc
 * @return {WritableStream} pipe to dist folder.
 */
function build() {
  const tsRlt = tsProject.src().pipe(tsProject());
  return tsRlt.js.pipe(dest('dist'));
}

// Spawn node process
let gatewayApp = null;
/**
 * Restart node server process, kill if exist
 * @return {Promise} restart node server.
 */
function reStartGatewayServer() {
  return new Promise(async (resolve) => {
    if (gatewayApp) {
      gatewayApp.kill();
    }
    const env = Object.create(process.env);
    env.NODE_ENV = 'local';
    gatewayApp = spawn('node', ['./dist/gateway.js'], {
      stdio: 'inherit',
      env,
    });
    gatewayApp.on('close', (code) => {
      if (code === 8) {
        console.log('Error detected, fix then retry');
      }
    });
    resolve();
  });
}

// Kill process on exit
process.on('exit', () => {
  if (gatewayApp) {
    gatewayApp.kill();
  }
});

/**
 * Copy schema file
 * @return {WritableStream} pipe to dist folder.
 */
function copySchema() {
  return src('src/**/*.graphql').pipe(dest('dist'));
}

// Gulp watch src file changes
/**
 * Watch changes of ts and json files
 * @param {cb} cb back function
 */
function watchChange(cb) {
  watch(
    ['./src/**/*.ts', './src/**/*.graphql', './config/*.env', './src/**/*.json', './*.json'],
    {
      ignored: [],
    },
    series(build, copySchema, reStartGatewayServer),
  );
  cb();
}

exports.copySchema = copySchema;
exports.default = series(build, copySchema, reStartGatewayServer, watchChange);
