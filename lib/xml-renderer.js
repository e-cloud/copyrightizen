const xmlCommentRegexp = /$(<!--([\s\S]*?)-->)/g;

const xmlCommentContentRegexp = /<!--([\s\S]*?)-->/g;

const { generateBlockCommentContent } = require('./util');

function render(source, template) {
  const comment = `<!--${generateBlockCommentContent(template, '-', false)}-->\n\n`

  const matches = xmlCommentRegexp.exec(source.trim())

  let result

  if (!matches) {
    result = comment + source
  }

  return result
}

module.exports = {
  render
}
