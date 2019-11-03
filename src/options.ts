import inquirer from 'inquirer';
import chalk from 'chalk';

const promptForMissingOptions = async (options?: any) => {
 
  const questions = [];
  if (!options.appTemplate) {
    questions.push({
      type: 'list',
      name: 'appTemplate',
      message: 'Which project template to use ?',
      choices: ['Client', 'Server'],
      default: 'Server'
    });
  }

  if (!options.federation) {
    questions.push({
      type: 'confirm',
      name: 'federation',
      message: 'Include Apollo federation gateway ?',
      default: true,
    });
  }

  if (!options.author) {
    questions.push({
      type: 'input',
      name: 'author',
      message: 'Project Author',
      default: 'test.graphql',
    });
  }

  if (!options.subPath) {
    questions.push({
      type: 'input',
      name: 'subPath',
      message: `Project path (default ${chalk.redBright.bold('./test')})`,
      default: 'test',
    });
  }

  if (!options.runInstall) {
    questions.push({
      type: 'confirm',
      name: 'runInstall',
      message: 'Install dependencies in the project ?',
      default: true,
    });
  }

  if (!options.startDev) {
    questions.push({
      type: 'confirm',
      name: 'startDev',
      message: 'Start dev mode ?',
      default: true,
    });
  }
 
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    appTemplate: options.appTemplate || answers.appTemplate,
    author: options.author || answers.author,
    subPath: options.subPath || answers.subPath,
    federation: options.federation || answers.federation,
    runInstall: options.runInstall || answers.runInstall,
    startDev: options.starDev || answers.startDev
  };
}

export default promptForMissingOptions;
