import { EOL, sharedInnerRender, yamlMultilineCommentRegexp } from '../util'

export function render(source: string, template: string, cpRegExp: RegExp) {
  const desiredComment =
    template
      .trim()
      .split('\n')
      .map(line => `# ${line}`.trimRight())
      .join(EOL) +
    EOL +
    EOL

  return sharedInnerRender(desiredComment, source, yamlMultilineCommentRegexp, cpRegExp)
}
