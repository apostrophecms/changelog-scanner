# changelog-scanner

A simple command-line tool to fetch all commit messages since a given date across every repository in one or more GitHub organizations.

Perfect for maintainers who need to:
- Generate release notes across multiple repositories
- Audit activity across an organization
- Catch omissions in changelogs before publishing
- Review recent work across your projects

## Installation

```bash
npm install -g @apostrophecms/changelog-scanner
```

## Usage

First, set your GitHub personal access token:

```bash
export GITHUB_ACCESS_TOKEN=your_token_here
```

Then scan one or more organizations:

```bash
changelog-scanner orgname1 orgname2 orgname3 --since=2025-09-01
```

### Example Output

```
⏳ Collecting repos for myorg
⏳ 25 repos found. Checking for more...
⏳ Found 25 repos for myorg
⏳ Checking commits for myorg/my-project
💁🏼‍♀️ myorg/my-project ***
Fixed bug in authentication handler
Jane Developer
jane@example.com
2025-09-15T14:23:45Z

Added support for new API endpoint
...
```

## Options

### `--since=YYYY-MM-DD` (required)

Fetch commits since this date.

```bash
changelog-scanner myorg --since=2025-09-01
```

### `--names` (optional)

Print only the names of repos that have commits in the given period, one per line. Useful for piping into other tools or quickly seeing what changed.

```bash
changelog-scanner myorg --since=2025-09-01 --names
```

### `--sort=<method>` (optional)

Sort repositories by:
- `created` - When the repo was created (default, newest first)
- `updated` - Last updated (newest first)
- `pushed` - Last pushed (newest first)
- `full_name` - Alphabetically (A-Z)

```bash
changelog-scanner myorg --since=2025-09-01 --sort=full_name
```

## Requirements

- Node.js 20 or higher
- A GitHub personal access token with `repo` scope access to the organizations you want to scan
- You can [create a token here](https://github.com/settings/tokens)

## About

Built with ❤️ by the team at [ApostropheCMS](https://github.com/apostrophecms) to streamline our release process. If you find this useful, consider giving [Apostrophe](https://github.com/apostrophecms/apostrophe) a star — it's an open-source CMS that helps teams build powerful Node.js applications.

## License

MIT