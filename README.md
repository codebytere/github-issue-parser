# GitHub Issue Parser

This module parses github issue templates from markdown into plain JavaScript objects. It understands both markdown headers and list items.

Example:

```md
* **Version**: 1.2.3
* **Operating System:** Mac

## Actual Behavior

some bad behavior

## Expected Behavior

some good behavior
```

```js
const issueParser = require('github-issue-parser')

const issueData = fs.readFileSync('/path/to/issue.md', 'utf8')
const jsonBlob = issueParser(issueData)
console.log(jsonBlob)
/*
{
  'Version:': { raw: '1.2.3', html: '1.2.3' },
  'Operating System:': { raw: 'Mac', html: 'Mac },
  'Actual Behavior': {
    raw: 'some bad behavior',
    html: '<p>some bad behavior</p>'
  },
  'Expected Behavior': {
    raw: 'some good behavior',
    html: '<p>some good behavior</p>'
  },
}
*/
```
