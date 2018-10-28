const { getSourceFile, getBaselineFile, getTemplate } = require('./util');
const { render } = require('../lib/yaml-renderer');

describe('yaml tests', () => {
  // failing because of https://github.com/eemeli/yaml/issues/42
  test('should append copyright to the simple basic yaml file', async () => {
        await assertRenderEqual('yaml/basic.yaml', 'basic.txt')
    })
})

async function assertRenderEqual(sourcePath, tplPath) {
    const source = await getSourceFile(sourcePath);
    const baseline = await getBaselineFile(sourcePath);
    const template = await getTemplate(tplPath);

    expect(render(source, template)).toEqual(baseline);
}
