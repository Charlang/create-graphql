import program from 'commander';

program
  .version('0.1.0')
  .option('-t, --template', 'Which project template to use ?', 'Server')
  .option('-f, --federation', 'Include Apollo federation gateway ?', true)
  .option('-a, --author', 'Project Author', 'test.graphql')
  .option('-p, --path [path]', 'Project sub path')
  .option('-cn, --clientAppName', 'Client SPA name, will be use as path also')
  .option('-i, --install', 'Install dependencies in the project ?')
  .option('-s, --start', 'Start dev mode ?');

program
  .on('--help', function(){
    console.log('')
    console.log('Examples:');
    console.log('  $ npx create-apollo-gql --help');
    console.log('  $ npx create-apollo-gql -h');
    console.log('  $ npx create-apollo-gql -t Server -p server');
    console.log('  $ npx create-apollo-gql -t Client -p ./ -cn someapp');
  });

export default program;
