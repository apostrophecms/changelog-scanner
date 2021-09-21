A simple tool to list all commit messages since a given date in the default branch of all repos in a github organization or organizations. Great for catching omissions in release announcements and changelogs.

## Installation

```
npm install
```

## Configuration

Copy `config.js.example` to `config.js` and edit it. See the provided comments.

## Usage

```
node app --since=2020-06-01
```

### Additional options

- **Use the `--sort` flag to select another sort order for repos.** Can be one of `created`, `updated`, `pushed`, `full_name`. Defaults to `created`. Order is ascending for `full_name` and descending for all others. [Reference](https://docs.github.com/en/rest/reference/repos#list-organization-repositories)