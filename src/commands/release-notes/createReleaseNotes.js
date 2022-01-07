const getIssuesInRelease = require('./getIssuesInRelease');
const markdownTable = require('./markdownTable');
const pageHeader = require('./pageHeader');
const { getServices, filterServicesForRelease } = require('../../getServices');


function createReleaseNotes() {
  Promise.all([
    getIssuesInRelease(),
    getServices()
  ]).then(([issues, services]) => {
    let releaseNotes = '';
    const issueTable = [
      ['Type', 'Issue Key', 'Summary']
    ];
    issues.forEach((issue) => {
      issueTable.push([
        issue.fields.issuetype.name,
        issue.key,
        issue.fields.summary
      ])
    });
    const table = markdownTable(issueTable);
    const header = pageHeader('0.6.543', 9450);
    releaseNotes += header;
    releaseNotes += '\n';
    releaseNotes += table;
    releaseNotes += '\n## Released Services\n';
    filterServicesForRelease(services).forEach((service) => {
      releaseNotes += `${service.name} ${service.qa.version}\n`;
    });
    releaseNotes +='\n## Release Manifest\n';
    const generatedManifest = {
      services: [],
      static: []
    };
    services.forEach((service) => {
      if (service.name !== 'doolittle/reader') {
        generatedManifest.services.push(
          `${service.name}:${service.qa.fullVersion}`
        );
      } else {
        generatedManifest.static.push(
          service.qa.fullVersion
        );
      }
    });
    releaseNotes += '```\n';
    releaseNotes += JSON.stringify(generatedManifest, null, 4);
    releaseNotes += '\n```';
    console.log(releaseNotes);
  });
}

module.exports = createReleaseNotes;
