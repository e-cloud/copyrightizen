import { getSourceFile, getBaselineFile, getTemplate } from './util'
import { render } from '../lib/js-renderer'

describe('typescript tests', () => {
  test('should append copyright to the simple basic ts file', async () => {
    await assertRenderEqual('typescript/basic.ts', 'basic.txt')
  })
})

async function assertRenderEqual(sourcePath: string, tplPath: string) {
  const source = await getSourceFile(sourcePath)
  const baseline = await getBaselineFile(sourcePath)
  const template = await getTemplate(tplPath)

  expect(render(source, template, 'typescript')).toEqual(baseline)
}
