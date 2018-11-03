import { assertRenderEqual } from './util'
import { render } from '../lib/js-renderer'

describe('javascript tests', () => {
  describe('for basic bare file', () => {
    test('should append copyright to the target js', async () => {
      await assertRenderEqual(render, 'js/basic.js', 'basic.txt', 'append')
    })
  })

  describe('with normal top comment', () => {
    test('should append copyright to the target js', async () => {
      await assertRenderEqual(render, 'js/with-normal-top-comment.js', 'basic.txt', 'append')
    })
  })

  describe('with top different copyright', () => {
    test('should append copyright and replace/remove existing copyright(s)', async () => {
      await assertRenderEqual(render, 'js/with-top-copyright.js', 'basic.txt', 'update')
    })
  })

  describe('with same copyright', () => {
    test('should change nothing', async () => {
      await assertRenderEqual(render, 'js/with-same-copyright.js', 'basic.txt', 'identical')
    })
  })
})
