const config = require('./config.js');
const request = require('request-promise');
const qs = require('qs');
const argv = require('boring')();
const fs = require('fs');
const results = {};
let team = [];
let allRepos = [];

const since = argv.since;
if (!since) {
  console.error('Usage: --since=YYYY-MM-DD');
  process.exit(1);
}
go();

async function go() {
  try {
    for (const org of config.orgs) {
      let page = 1;
      while (true) {
        const params = {
          page,
          access_token: config.token
        };
        const url = `https://api.github.com/orgs/${org}/repos?${qs.stringify(params)}`;
        const repos = await request(url, { 
          json: true,
          headers: {
            'User-Agent': 'changelog-scanner'
          },
        });
        allRepos = allRepos.concat(repos.map(repo => `${org}/${repo.name}`));
        if (!repos.length) {
          break;
        }
        page++;
      }
    }
    for (const repo of allRepos) {
      let page = 1;
      let allCommits = [];
      while (true) { 
        const params = {
          page,
          since,
          access_token: config.token
        };
        const url = `https://api.github.com/repos/${repo}/commits?${qs.stringify(params)}`;
        const commits = await request(url, { 
          json: true,
          headers: {
            'User-Agent': 'changelog-scanner'
          },
        });
        allCommits = allCommits.concat(commits);
        if (!commits.length) {
          break;
        }
        page++;
      }
      if (allCommits.length) {
        console.log(`*** ${repo}`);
        for (const commit of allCommits) {
          console.log(commit.commit.message);
          console.log(commit.commit.committer.name);
          console.log(commit.commit.committer.email);
          console.log(commit.commit.committer.date);
          console.log();
        }
      }
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

