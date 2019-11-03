import path from 'path';
import { URL } from 'url';
import vfs from 'vinyl-fs';
import through2 from 'through2';
import execa from 'execa';
import listr from 'listr';

const copyTemplateFiles = async (options: any) => {
  // @ts-ignore
  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../template-server'
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
  vfs.src(`${templateDirectory}/**/*`)
  .pipe(through2.obj((file: any, enc: string, next) => {
    if (file.isBuffer()) {
      const src = file.contents.toString().replace(new RegExp('%AUTHOR_NAME%', 'g'), options.author);
      file.contents = Buffer.from(src);
      next(null, file);
    } else {
      next(null, file);
    }
  }))
  .pipe(out);
  return streamPromise(out);
}

const installDependencies = async (options: any) => {
  const result = await execa('yarn', ['install'], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to install dependencies'));
  }
  return;
}

const tasks = (options: any) => new listr([
  {
    title: '[1-3] Copy templates files',
    task: async () => copyTemplateFiles(options),
  },
  {
    title: '[2-3] Install dependencies',
    task: async (ctx) => {
      await installDependencies(options)
      ctx.start = true;
      return;
    },
    skip: () =>
      !options.runInstall
        ? 'Pass --install to automatically install dependencies'
        : undefined,
  },
  {
    title: '[3-3] Start development watch',
    task: () => {
      execa('yarn', ['watch'], {
        cwd: options.targetDirectory,
      });
      return;
    },
    enabled: ctx => ctx.start === true,
    skip: () =>
      !options.startDev
        ? 'Pass --watch to automatically start dev watch mode'
        : undefined,
  },
]);

export default tasks;