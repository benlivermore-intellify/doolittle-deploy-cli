const fetch = require('node-fetch');

function filterServicesForRelease(allServices) {
  return allServices.filter((service) => {
    return service.qa.fullVersion !== service.prod.fullVersion;
  });
}

function getServices() {
  return new Promise((resolve) => {

    const devManifest = fetch('https://wna-cms.doolittle-dev.wna.cloud/api/manifest').then((result) => {
      return result.json();
    });

    const qaManifest = fetch('https://wna-cms.doolittle-qa.wna.cloud/api/manifest').then((result) => {
      return result.json();
    });
    
    const prodManifest = fetch('https://wna-cms.doolittle-prod.wna.cloud/api/manifest').then((result) => {
      return result.json();
    });

    function getVersionInfo(manifestEntry) {
      const [name, fullVersion] = manifestEntry.split(':');
      const [version, branch, commit] = fullVersion.split('-');
      return { name, version, branch, commit, fullVersion };
    }
    function getSpinnakerUri(name) {
      const spinnakerName = name.replace('doolittle/', 'doolittle-');
      return `https://spinnaker.ops.wna.cloud/#/applications/${spinnakerName}/executions`;
    }
    
    Promise.all([devManifest, qaManifest,prodManifest]).then(([dev, qa, prod]) => {
      const prodServicesMap = {};
      const devServicesMap = {};
      dev.services.forEach((service) => {
        const info = getVersionInfo(service);
        devServicesMap[info.name] = info;
      });
      prod.services.forEach((service) => {
        const info = getVersionInfo(service);
        prodServicesMap[info.name] = info;
      });
      const allServices = qa.services.map((service) => {
        const qa = getVersionInfo(service);
        return {
          name: qa.name,
          spinnakerUri: getSpinnakerUri(qa.name),
          dev: devServicesMap[qa.name],
          qa,
          prod: prodServicesMap[qa.name]
        };
      });
      const readerName = 'doolittle/reader';
      allServices.push({
        name: readerName,
        dev: {
          name: readerName,
          version: dev.static[0],
          fullVersion: dev.static[0]
        },
        qa: {
          name: readerName,
          version: qa.static[0],
          fullVersion: qa.static[0]
        },
        prod: {
          name: readerName,
          fullVersion: prod.static[0]
        }
      });
      
      resolve(allServices);
    });
  });
}


module.exports = {
  filterServicesForRelease,
  getServices
};
