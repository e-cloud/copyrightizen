const { getSourceFile, getBaselineFile, getTemplate } = require('./util');
const { render } = require('../lib/css-renderer');

describe('css/scss/sass/less tests', () => {
    test('should append copyright to the simple basic css file', async () => {
        await assertRenderEqual('css/basic.css', 'basic.txt');
    });

    test('should append copyright to the simple basic scss file', async () => {
        await assertRenderEqual('scss/basic.scss', 'basic.txt', 'scss');
    });

    // failing because of https://github.com/tonyganch/gonzales-pe/pull/214#issuecomment-433608537
    test('should append copyright to the simple basic sass file', async () => {
        await assertRenderEqual('sass/basic.sass', 'basic.txt', 'sass');
    });

    test('should append copyright to the simple basic less file', async () => {
        await assertRenderEqual('less/basic.less', 'basic.txt', 'less');
    });
})

async function assertRenderEqual(sourcePath, tplPath, syntax) {
    const source = await getSourceFile(sourcePath);
    const baseline = await getBaselineFile(sourcePath);
    const template = await getTemplate(tplPath);

    expect(render(source, template, syntax)).toEqual(baseline);
}
