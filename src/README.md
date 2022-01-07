# Doolittle Deploy CLI
The Deploy CLI is a way to more easily release doolittle services. 

## Setup

1. Run `npm install -g` to install doolittle-deploy.
1. In your home directory, create a .doolittle-deploy folder `mkdir ~/.doolittle-deploy`
1. Now create a config.json file inside that directory that looks like
```
{
  "jiraUser": "ben@weldnorthanalytics.com",
  "jiraApikey": "fmL9RcFAKEKEYetuR4322",
  "jiraUri": "https://wn-doolittle.atlassian.net",
  "jiraReleaseFilterId": 10009
}
```
but replace the jiraUser and jiraApikey with ones specific to your JIRA user.

1. To test, run `doolittle-deploy release-notes` and you should see generated release notes.


## Commands
To run a command in the terminal, do `doolittle-deploy [command] [command params]`
It consists of the following commands:

### diff-env
```
doolittle-deploy diff-env prod qa
```

### release-notes
```
doolittle-deploy release-notes
```

### checklist

### deploy
