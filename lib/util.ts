import { RENDER_STATUS, RenderStatus, RenderResult } from "./common.model";

export const EOL = '\n'

export function generateBlockCommentContent(text: string, lineChar = '*', needTopChar = true) {
  return `${needTopChar ? lineChar : ''}${EOL}${text
    .trim()
    .split(EOL)
    .map(line => ` ${lineChar} ${line}`.trimRight())
    .join(EOL)}${EOL} `
}

export function sharedInnerRender(desiredComment: string, source: string, commentRegexp: RegExp, cpRegExp: RegExp): RenderResult {
  const updatedSource = removeOldCopyright(source, commentRegexp, cpRegExp)

  let status: RenderStatus = RENDER_STATUS.append

  if (updatedSource !== source && !source.trimLeft().startsWith(desiredComment)) {
    status = 'update'
  }

  const final = desiredComment + updatedSource.trimLeft()

  if (final.trim() === source.trim()) {
    status = 'identical'
  }

  return { content: final, status }
}

export function removeOldCopyright(source: string, commentRegexp: RegExp, cpRegExp: RegExp) {
  if (cpRegExp.test(source)) {
    let matches
    const existingVersions = []
    const input = source.trim()
    // tslint:disable-next-line:no-conditional-assignment
    while (matches = commentRegexp.exec(input)) {
      // find out the copyright comment
      if (cpRegExp.test(matches[0])) {
        existingVersions.push(matches[0])
      }
    }

    // remove all existing copyrights
    existingVersions.forEach(item => source = source.replace(item, EOL + EOL))
  }

  return source
}

export const xmlCommentRegexp = /\s*<!--([\s\S]*?)-->\s*/g

export const blockCommentRegexp = /\s*\/\*\*\s*\n([\S\s]*?)\*\/\s*/g

export const yamlMultilineCommentRegexp = /\s*(#\s*[^\n]+\n){2,}\s*/g
