#! /usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const releaseNotes = require('../src/commands/release-notes/release-notes');
const diffEnv = require('../src/commands/diff-env/diff-env');

const argv = yargs(hideBin(process.argv))
  .command(...diffEnv)
  .command(...releaseNotes)
  .argv;
