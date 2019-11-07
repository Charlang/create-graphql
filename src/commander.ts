import program from 'commander';

program
  .version('0.1.0')
  .option('-t, --template', 'Which project template to use ?', 'Server')
  .option('-f, --federation', 'Include Apollo federation gateway ?', true)
  .option('-a, --author', 'Project Author', 'test.graphql')
  .option('-p, --path', 'Project sub path')
  .option('-cn, --clientAppName', 'Client SPA name, will be use as path also')
  .option('-i, --install', 'Install dependencies in the project ?')
  .option('-s, --start', 'Start dev mode ?');

program
  .on('--help', function(){
    console.log('')
    console.log('Examples:');
    console.log('  $ custom-help --help');
    console.log('  $ custom-help -h');
  });

export default program;
