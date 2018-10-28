import * as recast from 'recast'
import { generateBlockCommentContent } from './util'

const builders = recast.types.builders

function parse(source: string, parserType = 'babel') {
  return recast.parse(source, {
    parser: require(`recast/parsers/${parserType}`),
  })
}

function print(ast: any) {
  return recast.print(ast, {
    lineTerminator: '\n',
  }).code
}

function appendCopyright(ast: any, crText: string) {
  const comment = builders.commentBlock(generateBlockCommentContent(crText))

  const firstStatement = ast.program.body[0]

  if (firstStatement) {
    firstStatement.comments = firstStatement.leadingComments || []

    firstStatement.comments.unshift(comment)
  }

  return ast
}

function render(source: string, template: string, parserType?: 'babel' | 'typescript') {
  const ast = parse(source, parserType)

  const alteredAst = appendCopyright(ast, template)

  return addBlankLineBetweenCopyrightAndCode(print(alteredAst))
}

function addBlankLineBetweenCopyrightAndCode(fileString: string) {
  return fileString.replace(/\*\/$/m, '*/\n')
}

export { render }
