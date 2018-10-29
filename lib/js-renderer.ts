import { generateBlockCommentContent, removeOldCopyrightWithinBlockComment, EOL } from './util'

function render(source: string, template: string) {
  const desiredComment = `/*${generateBlockCommentContent(template)}*/${EOL + EOL}`

  source = removeOldCopyrightWithinBlockComment(source)

  return desiredComment + source.trimLeft()
}

export { render }
