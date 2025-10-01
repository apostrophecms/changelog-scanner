A simple tool to list all commit messages since a given date in the default branch of all repos in a github organization or organizations. For those who release npm packages on a regular cadence, this is great for catching omissions in release announcements and changelogs.

## Installation

```
npm install -g @apostrophecms/changelog-scanner
```

## Usage

Make sure `GITHUB_ACCESS_TOKEN` is set in your environment. Then:

```
changelog-scanner orgname1 orgname2 orgname3... --since=2025-09-01
```

### Additional options

- **Use the `--sort` flag to select another sort order for repos.** Can be one of `created`, `updated`, `pushed`, `full_name`. Defaults to `created`. Order is ascending for `full_name` and descending for all others. [Reference](https://docs.github.com/en/rest/reference/repos#list-organization-repositories)