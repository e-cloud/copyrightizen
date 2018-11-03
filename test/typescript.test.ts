import { assertRenderEqual } from './util'
import { render } from '../lib/js-renderer'

describe('typescript tests', () => {
  test('should append copyright to the simple basic ts file', async () => {
    await assertRenderEqual(render, 'typescript/basic.ts', 'basic.txt', 'append')
  })

  // skip the tests same as javascript
})
