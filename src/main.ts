import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import tasks from './tasks';
import promptForMissingOptions from './inquirer';
import program from './commander';

export const main = async () => {
  clear();
  console.log(
    chalk.green(
      figlet.textSync('create-apollo-graphql')
    )
  );
  console.log(
    chalk.green.bold('\n ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ 🍀 ☘️ \n')
  );
  const args = program.parse(process.argv).opts();
  const options: any = await promptForMissingOptions(args);
  options.targetDirectory = options.path === './' ? process.cwd() : `${process.cwd()}/${options.path}`;
  await tasks(options).run();
  console.log(`\n 🚀 💯 ✅ 🎊 🎉 ${chalk.green.bold('DONE')} Project ready at ${chalk.green(options.targetDirectory)} folder.\n`);
};

export default main;
