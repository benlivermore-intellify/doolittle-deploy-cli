const fetch = require('node-fetch');
const base64 = require('base-64');
const config = require('../../config');
const ILauthStr = `${config.jiraUser}:${config.jiraApikey}`;
const base64AuthStr = base64.encode(ILauthStr);

function getIssuesInRelease() {
  return fetch(`${config.jiraUri}/rest/api/3/search?jql=filter%3D${config.jiraReleaseFilterId}&fields=summary,issuetype,priority`, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + base64AuthStr
    }
  })
  .then((result) => {
    return result.json();
  }).then((data) => {
    return data.issues;
  });
}
module.exports = getIssuesInRelease;
