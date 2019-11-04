import inquirer from 'inquirer';
import chalk from 'chalk';

const promptForMissingOptions = async (options?: any) => {
 
  let templateAnswers = {
    template: 'server'
  };
  if (!options.template) {
    templateAnswers = await inquirer.prompt([{
      type: 'list',
      name: 'template',
      message: 'Which project template to use ?',
      choices: ['Client', 'Server'],
      default: 'Server'
    }]);
  }
  
  const questions = [];
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

  if (!options.path) {
    questions.push({
      type: 'input',
      name: 'path',
      message: `Project path (default ${chalk.italic.redBright.bold('./' + (templateAnswers.template || '').toLowerCase())})`,
      default: (templateAnswers.template || 'server').toLowerCase(),
    });
  }

  if (!options.install) {
    questions.push({
      type: 'confirm',
      name: 'install',
      message: 'Install dependencies in the project ?',
      default: true,
    });
  }

  if (!options.start) {
    questions.push({
      type: 'confirm',
      name: 'start',
      message: 'Start dev mode ?',
      default: true,
    });
  }
 
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || templateAnswers.template,
    author: options.author || answers.author,
    path: options.path || answers.path,
    federation: options.federation || answers.federation,
    install: options.install || answers.install,
    start: options.starDev || answers.start
  };
}

export default promptForMissingOptions;
