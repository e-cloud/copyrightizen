function generateBlockCommentContent(text, lineChar = '*', needTopChar = true) {
    return `${needTopChar ? lineChar : ''}\n${text.trim().split('\n').map(line => (` ${lineChar} ${line}`).trimRight()).join('\n')}\n `
}

module.exports = {
    generateBlockCommentContent
}
