import { EOL, removeOldCopyrightWithinYAML } from './util';

function render(source: string, template: string) {
  const desiredComment = template.split('\n').map(line => `# ${line}`.trimRight()).join(EOL) + EOL + EOL

  source = removeOldCopyrightWithinYAML(source)

  return desiredComment + source.trimLeft()
}

export { render }
