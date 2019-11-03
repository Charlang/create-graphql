import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import tasks from './tasks';
import promptForMissingOptions from './options';

export const main = async () => {
  clear();
  console.log(
    chalk.green(
      figlet.textSync('create-graphql')
    )
  );
  console.log(
    chalk.green.bold('\n ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ \n')
  );
  const options: any = await promptForMissingOptions({});
  options.targetDirectory = options.subPath === './' ? process.cwd() : `${process.cwd()}/${options.subPath}`;
  await tasks(options).run();
  console.log(`\n 🚀 💯 ✅ 🎊 🎉 ${chalk.green.bold('DONE')} Project ready at ${options.subPath} folder.\n`);
};

export default main;
