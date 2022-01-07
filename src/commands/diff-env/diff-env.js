const { getServices, filterServicesForRelease } = require('../../getServices');
const chalk = require('chalk');
const ora = require('ora');

const validEnvs = ['dev', 'qa', 'prod'];

function isValidEnv(env) {
  return validEnvs.indexOf(env) !== -1;
}

module.exports = [
  'diff-env [env1] [env2]',
  `diff two environments' services from ${validEnvs.join(', ')}`,
  (yargs) => {
    return yargs
      .positional('env1', {
        describe: 'original env',
        default: 'prod'
      })
      .positional('env2', {
        describe: 'env to diff with original',
        default: 'qa'
      })
      .option('verbose', {
        describe: 'include unchanged services in diff',
        default: false
      });
  },(argv) => {
    console.log(`Diffing ${argv.env1} with ${argv.env2}`);
    const spinner = ora('Loading...').start();
    if (!isValidEnv(argv.env1) || !isValidEnv(argv.env2)) {
      console.log(`Invalid environment name specified. Please use one of ${validEnvs.join(', ')}`);
      return;
    }
    getServices().then((services) => {
      spinner.stop()
      services.forEach((service) => {
        const env1Version = service[argv.env1].fullVersion;
        const env2Version = service[argv.env2].fullVersion;
        const name = service.name;
        const verbose = argv['verbose'];

        const diffPhrase = `${name} ${env1Version} --> ${env2Version}`;
        if (env1Version !== env2Version) {
          console.log(chalk.green(diffPhrase));
        } else if (verbose) {
          console.log(chalk.gray(diffPhrase));
        }
      });
    })
  }
]