import * as yaml from 'yaml'

function render(source: string, template: string) {
  const templateLines = template.split('\n')
  const comment = templateLines.map(line => ` ${line}`.trimRight()).join('\n')

  const doc = yaml.parseDocument(source, {
    keepCstNodes: true,
  })

  doc.commentBefore = comment

  const preout = doc.toString()

  const lastTemplateLine = templateLines[templateLines.length - 1]

  return preout.replace(lastTemplateLine, `${lastTemplateLine}\n`)
}

export { render }
