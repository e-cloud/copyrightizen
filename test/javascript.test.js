const { getSourceFile, getBaselineFile, getTemplate } = require('./util');
const { render } = require('../lib/js-renderer');

describe('javascript tests', () => {
    test('should append copyright to the simple basic js file', async () => {
        await assertRenderEqual('js/basic.js', 'basic.txt')
    })
})

async function assertRenderEqual(sourcePath, tplPath) {
    const source = await getSourceFile(sourcePath);
    const baseline = await getBaselineFile(sourcePath);
    const template = await getTemplate(tplPath);

    expect(render(source, template)).toEqual(baseline);
}
