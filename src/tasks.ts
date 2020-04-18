import path from 'path';
import { URL } from 'url';
import vfs from 'vinyl-fs';
import through2 from 'through2';
import execa from 'execa';
import Listr from 'listr';
import chalk from 'chalk';
// @ts-ignore
import throughFilter from 'through2-filter';

const TEMPLATE_MAP = {
  Server: 'template-server',
  'Client Single SPA': 'template-client-single-spa',
  'Client CRA': 'template-cra',
};

const TEMPLATE_INSTALL = {
  Server: 'install',
  'Client Single SPA': 'install:all',
  'Client CRA': 'install',
};

const TEMPLATE_WATCH = {
  Server: 'watch',
  'Client Single SPA': 'start:all',
  'Client CRA': 'start',
};
const copyTemplateFiles = async (options: any) => {
  // @ts-ignore
  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    `../../${TEMPLATE_MAP[options.template as 'Server']}`,
  );
  const templateDirectory = templateDir;
  function streamPromise(stream: any) {
    return new Promise((resolve, reject) => {
      stream.on('end', () => {
        resolve('end');
      });
      stream.on('finish', () => {
        resolve('finish');
      });
      stream.on('error', (error: any) => {
        reject(error);
      });
    });
  }
  const out = vfs.dest(options.targetDirectory);
  vfs
    .src([
      `${templateDirectory}/**/*`,
      `!${templateDirectory}/mocks/node_modules`,
      `!${templateDirectory}/mocks/node_modules/**/*`,
      `!${templateDirectory}/node_modules`,
      `!${templateDirectory}/node_modules/**/*`,
      `!${templateDirectory}/coverage`,
      `!${templateDirectory}/coverage/**/*`,
    ])
    .pipe(
      through2.obj((file: any, enc: string, next) => {
        if (file.isBuffer()) {
          let src = file.contents.toString().replace(new RegExp('%AUTHOR_NAME%', 'g'), options.author);
          if (options.template !== 'Server') {
            src = src.replace(new RegExp('_SINGLE_SPA_APP_', 'g'), options.clientAppName);
          }
          file.contents = Buffer.from(src);
          next(null, file);
        } else {
          next(null, file);
        }
      }),
    )
    .pipe(out);
  return streamPromise(out);
};

const installDependencies = async (options: any) => {
  const result = await execa('yarn', [TEMPLATE_INSTALL[options.template as 'Server']], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to install dependencies'));
  }
  return;
};

const tasks = (options: any) =>
  new Listr([
    {
      title: `[1-3] Copying templates files into below folder: \n         ${chalk.italic.redBright(
        options.targetDirectory,
      )}`,
      task: async () => copyTemplateFiles(options),
    },
    {
      title: '[2-3] Install dependencies',
      task: async (ctx) => {
        await installDependencies(options);
        ctx.start = true;
        return;
      },
      skip: () => (!options.install ? 'Pass --install to automatically install dependencies' : undefined),
    },
    {
      title: '[3-3] Start development watch',
      task: () => {
        execa('yarn', [TEMPLATE_WATCH[options.template as 'Server']], {
          cwd: options.targetDirectory,
        }).stdout.pipe(process.stdout);
        return;
      },
      enabled: (ctx) => ctx.start === true,
      skip: () => (!options.start ? 'Pass --watch to automatically start dev watch mode' : undefined),
    },
  ]);

export default tasks;
