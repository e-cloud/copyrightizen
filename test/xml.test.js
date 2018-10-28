const { getSourceFile, getBaselineFile, getTemplate } = require('./util');
const { render } = require('../lib/xml-renderer');

describe('html/xml tests', () => {
    test('should append copyright to the simple basic html file', async () => {
        await assertRenderEqual('html/basic.html', 'basic.txt')
    })

    test('should append copyright to the simple basic xml file', async () => {
      await assertRenderEqual('xml/basic.xml', 'basic.txt')
    })
})

async function assertRenderEqual(sourcePath, tplPath) {
    const source = await getSourceFile(sourcePath);
    const baseline = await getBaselineFile(sourcePath);
    const template = await getTemplate(tplPath);

    expect(render(source, template)).toEqual(baseline);
}
