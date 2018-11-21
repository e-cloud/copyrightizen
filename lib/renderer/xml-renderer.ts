import { generateBlockCommentContent, EOL, sharedInnerRender, xmlCommentRegexp } from '../util'

export function render(source: string, template: string, cpRegExp: RegExp) {
  const desiredComment = `<!--${generateBlockCommentContent(template, '-', false)}-->${EOL + EOL}`

  return sharedInnerRender(desiredComment, source, xmlCommentRegexp, cpRegExp)
}
