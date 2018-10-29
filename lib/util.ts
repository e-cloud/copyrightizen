export const EOL = '\n'

export function generateBlockCommentContent(text: string, lineChar = '*', needTopChar = true) {
  return `${needTopChar ? lineChar : ''}${EOL}${text
    .trim()
    .split(EOL)
    .map(line => ` ${lineChar} ${line}`.trimRight())
    .join(EOL)}${EOL} `
}

export function removeOldCopyrightWithinBlockComment(source: string) {
  return removeOldCopyright(source, blockCommentRegexp)
}

export function removeOldCopyrightWithinXML(source: string) {
  return removeOldCopyright(source, xmlCommentRegexp)
}

export function removeOldCopyrightWithinYAML(source: string) {
  return removeOldCopyright(source, yamlMultilineCommentRegexp)
}

export function removeOldCopyright(source: string, commentRegexp: RegExp, cpRegExp = copyrightRegexp) {
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

export const copyrightRegexp = /copyright/i

export const xmlCommentRegexp = /\s*<!--([\s\S]*?)-->\s*/g

export const blockCommentRegexp = /\s*\/\*\*\s*\n([\S\s]*?)\*\/\s*/g

export const yamlMultilineCommentRegexp = /\s*(#\s*[^\n]+\n){2,}\s*/g
