const config = require('./config.js');
const request = require('request-promise');
const qs = require('qs');
const argv = require('boring')();
const fs = require('fs');
const results = {};
let team = [];
let allRepos = [];

const since = argv.since;
const sort = argv.sort || 'created'

if (!since || typeof since !== 'string') {
  console.error('Usage: --since=YYYY-MM-DD');
  process.exit(1);
}
go();

async function go() {
  try {
    for (const org of config.orgs) {
      console.log('⏳ Collecting repos for', org)
      let page = 1;
      while (true) {
        const params = {
          page,
          sort
        };
        const url = `https://api.github.com/orgs/${org}/repos?${qs.stringify(params)}`;

        const repos = await request(url, {
          json: true,
          headers: {
            'User-Agent': 'changelog-scanner',
            'Authorization': `token ${config.token}`
          },
        });

        if (!Array.isArray(repos)) {
          console.error('Error retrieving repos:', repos);
          return;
        }

        allRepos = allRepos.concat(repos.map(repo => `${org}/${repo.name}`));
        if (!repos.length) {
          break;
        }
        console.log(`⏳ ${repos.length} repos found. Checking for more...`)
        page++;
      }

      console.log(`⏳ Found ${allRepos.length} repos for ${org}`)
    }

    for (const repo of allRepos) {
      console.log(`⏳ Checking commits for ${repo}`)
      let page = 1;
      let allCommits = [];
      while (true) {
        const params = {
          page,
          since,
          'Authorization': `token ${config.token}`
        };
        const url = `https://api.github.com/repos/${repo}/commits?${qs.stringify(params)}`;
        const commits = await request(url, {
          json: true,
          headers: {
            'User-Agent': 'changelog-scanner',
            'Authorization': `token ${config.token}`
          },
        });
        allCommits = allCommits.concat(commits);
        if (!commits.length) {
          break;
        }
        page++;
      }
      if (allCommits.length) {
        console.log(`💁🏼‍♀️ ${repo} ***`);
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

