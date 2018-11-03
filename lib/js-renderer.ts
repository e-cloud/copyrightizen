import { generateBlockCommentContent, EOL, sharedInnerRender } from './util'
import { blockCommentRegexp } from '../lib/util';

export function render(source: string, template: string, cpRegExp: RegExp) {
  const desiredComment = `/*${generateBlockCommentContent(template)}*/${EOL + EOL}`

  return sharedInnerRender(desiredComment, source, blockCommentRegexp, cpRegExp)
}
