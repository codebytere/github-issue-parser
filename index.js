const remark = require('remark')
const html = require('remark-html')

function githubIssueParser (txt) {
  if (typeof txt !== 'string') throw new Error('input should be a markdown string')
  const trim = val => {
    val = val.replace(/^(\s*:\s*|\s*)/, '')
    return val.replace(/(\n+$)/, '')
  }

  const toHtml = remark().use(html)
  const lexer = remark()
  let tokens = lexer.parse(txt).children
  const result = {}
  let key = ''

  tokens = tokens.filter(token => token.type !== 'html')
  tokens.forEach(token => {
    if (token.type === 'heading') {
      key = token.children[0].value
      result[key] = []
      return
    }

    if (token.type === 'list') {
      const listKeys = token.children
      listKeys.forEach(listItem => {
        key = listItem.children[0].children[0].children[0].value
        result[key] = []
        if (listItem.children[0].hasOwnProperty('children')) {
          console.log(listItem.children[0].children)
          if (listItem.children[0].children.length > 1) {
            result[key].push(listItem.children[0].children[1])
          } else {
            // push an empty filler node if no data provided
            result[key].push({
              type: 'text',
              value: '',
              position: {}
            })
          }
        }
      })
      return
    }

    if (!key) return
    result[key].push(token)
  })

  Object.keys(result).forEach(key => {
    const tree = {
      type: 'root',
      children: result[key]
    }

    result[key] = {
      raw: trim(lexer.stringify(tree)),
      html: trim(toHtml.stringify(tree))
    }
  })

  return result
}

module.exports = githubIssueParser
