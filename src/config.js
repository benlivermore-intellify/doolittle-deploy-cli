const homedir = require('os').homedir();
const config = require(`${homedir}/.doolittle-deploy/config.json`);

module.exports = config;
