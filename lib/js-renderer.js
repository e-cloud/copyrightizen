const recast = require('recast');

const {generateBlockCommentContent} = require('./util')

const builders = recast.types.builders;

function parse(source, parserType = 'babel') {
    return recast.parse(source, {
        parser: require(`recast/parsers/${parserType}`),
    })
}

function print(ast) {
    return recast.print(ast, {
        lineTerminator: '\n'
    }).code
}

function appendCopyright(ast, crText) {
    const comment = builders.commentBlock(generateBlockCommentContent(crText));

    const firstStatement = ast.program.body[0]

    if(firstStatement) {
        firstStatement.comments = firstStatement.leadingComments || []

        firstStatement.comments.unshift(comment)
    }

    return ast
}

function detectCopyright(ast) {
    const leadingComment = ast.comments[0]

    if(leadingComment) {

    }
}

function render(source, template, parserType) {
    const ast = parse(source, parserType)

    const alteredAst = appendCopyright(ast, template)

    return addBlankLineBetweenCopyrightAndCode(print(alteredAst));
}

function addBlankLineBetweenCopyrightAndCode(fileString) {
    return fileString.replace(/\*\/$/m, '*/\n');
}

module.exports = {
    render
};
