import { generateBlockCommentContent, EOL, removeOldCopyrightWithinXML } from './util'

function render(source: string, template: string) {
  const desiredComment = `<!--${generateBlockCommentContent(template, '-', false)}-->${EOL + EOL}`

  source = removeOldCopyrightWithinXML(source)

  return desiredComment + source.trimLeft()
}

export { render }
