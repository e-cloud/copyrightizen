import { generateBlockCommentContent } from './util'

const xmlCommentRegexp = /$(<!--([\s\S]*?)-->)/g

function render(source: string, template: string) {
  const comment = `<!--${generateBlockCommentContent(template, '-', false)}-->\n\n`

  const matches = xmlCommentRegexp.exec(source.trim())

  let result

  if (!matches) {
    result = comment + source
  }

  return result
}

export { render }
