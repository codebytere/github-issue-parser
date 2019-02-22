const {expect} = require('chai')
const fs = require('fs')
const githubIssueParser = require('../index.js')

describe('github-issue-parser', () => {
  it('parses headers from markdown files', () => {
    const headerText = fs.readFileSync('./test/fixtures/issue-only-header.md', 'utf8')
    const jsonBlob = githubIssueParser(headerText)

    expect(jsonBlob).to.be.an('object')

    const keys = Object.keys(jsonBlob)
    expect(keys).to.have.a.lengthOf(3)
    expect(keys).to.deep.equal([
      'Expected Behavior',
      'Actual Behavior',
      'To Reproduce'
    ])

    expect(jsonBlob['Expected Behavior'])
      .to.have.a.property('raw')
      .that.is.equal('some good behavior')

    expect(jsonBlob['Actual Behavior'])
      .to.have.a.property('raw')
      .that.is.equal('some bad behavior')

    expect(jsonBlob['To Reproduce'])
      .to.have.a.property('raw')
      .that.is.equal('some repro stuff here')
  })

  it('parses empty headers from markdown files', () => {
    const headerText = fs.readFileSync('./test/fixtures/issue-only-header-empty.md', 'utf8')
    const jsonBlob = githubIssueParser(headerText)

    expect(jsonBlob).to.be.an('object')

    const keys = Object.keys(jsonBlob)
    expect(keys).to.have.a.lengthOf(3)
    expect(keys).to.deep.equal([
      'Expected Behavior',
      'Actual Behavior',
      'To Reproduce'
    ])

    expect(jsonBlob['Expected Behavior'])
      .to.have.a.property('raw')
      .that.is.equal('')

    expect(jsonBlob['Actual Behavior'])
      .to.have.a.property('raw')
      .that.is.equal('')

    expect(jsonBlob['To Reproduce'])
      .to.have.a.property('raw')
      .that.is.equal('')
  })

  it('parses list items from markdown files', () => {
    const headerText = fs.readFileSync('./test/fixtures/issue-only-list.md', 'utf8')
    const jsonBlob = githubIssueParser(headerText)

    expect(jsonBlob).to.be.an('object')

    const keys = Object.keys(jsonBlob)
    expect(keys).to.have.a.lengthOf(3)
    expect(keys).to.deep.equal([
      'Electron Version:',
      'Operating System:',
      'Last known working Electron version:'
    ])

    expect(jsonBlob['Electron Version:'])
      .to.have.a.property('raw')
      .that.is.equal('1.3.3')

    expect(jsonBlob['Operating System:'])
      .to.have.a.property('raw')
      .that.is.equal('Windows')

    expect(jsonBlob['Last known working Electron version:'])
      .to.have.a.property('raw')
      .that.is.equal('1.2.2')
  })

  it('parses empty list items from markdown files', () => {
    const headerText = fs.readFileSync('./test/fixtures/issue-only-list-empty.md', 'utf8')
    const jsonBlob = githubIssueParser(headerText)

    expect(jsonBlob).to.be.an('object')

    const keys = Object.keys(jsonBlob)
    expect(keys).to.have.a.lengthOf(3)
    expect(keys).to.deep.equal([
      'Electron Version:',
      'Operating System:',
      'Last known working Electron version:'
    ])

    expect(jsonBlob['Electron Version:'])
      .to.have.a.property('raw')
      .that.is.equal('')

    expect(jsonBlob['Operating System:'])
      .to.have.a.property('raw')
      .that.is.equal('')

    expect(jsonBlob['Last known working Electron version:'])
      .to.have.a.property('raw')
      .that.is.equal('')
  })
})