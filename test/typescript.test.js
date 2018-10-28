const { getSourceFile, getBaselineFile, getTemplate } = require('./util');
const { render } = require('../lib/js-renderer');

describe('typescript tests', () => {
    test('should append copyright to the simple basic ts file', async () => {
        await assertRenderEqual('typescript/basic.ts', 'basic.txt')
    })
})

async function assertRenderEqual(sourcePath, tplPath) {
    const source = await getSourceFile(sourcePath);
    const baseline = await getBaselineFile(sourcePath);
    const template = await getTemplate(tplPath);

    expect(render(source, template, 'typescript')).toEqual(baseline);
}
