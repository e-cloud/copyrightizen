const gonzales = require('gonzales-pe');

const { generateBlockCommentContent } = require('./util')

function render(source, template, syntax = 'css') {
    const parseTree = gonzales.parse(source, {
        syntax
    });

    const commentNode = gonzales.createNode({ syntax, type: 'multilineComment', content: generateBlockCommentContent(template) })
    const blankLineNode = gonzales.createNode({
        type: 'space',
        content: '\n\n'
    })
    parseTree.insert(0, blankLineNode)
    parseTree.insert(0, commentNode)


    return parseTree.toString()
}

module.exports = {
    render
}
