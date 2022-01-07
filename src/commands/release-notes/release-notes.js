const createReleaseNotes = require('./createReleaseNotes');

module.exports = [
  'release-notes [path]',
  'return release notes',
  (yargs) => {
    return yargs
      .positional('path', {
        describe: 'file path to save release notes',
        default: '.'
      })
  },(argv) => {
    createReleaseNotes(argv.path);
    // console.log('hello');
  }
];