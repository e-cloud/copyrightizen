import { getSourceFile, getBaselineFile, getTemplate } from './util'
import { render } from '../lib/js-renderer'

describe('javascript tests', () => {
  test('should append copyright to the simple basic js file', async () => {
    await assertRenderEqual('js/basic.js', 'basic.txt')
  })
})

async function assertRenderEqual(sourcePath: string, tplPath: string) {
  const source = await getSourceFile(sourcePath)
  const baseline = await getBaselineFile(sourcePath)
  const template = await getTemplate(tplPath)

  expect(render(source, template)).toEqual(baseline)
}
