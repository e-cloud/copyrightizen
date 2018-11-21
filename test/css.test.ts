import { assertRenderEqual } from './util'
import { render } from '../lib/renderer/css-renderer'

describe('css/scss/sass/less tests', () => {
  describe('for basic bare file', () => {
    test('should append copyright to the target css', async () => {
      await assertRenderEqual(render, 'css/basic.css', 'basic.txt', 'append')
    })

    test('should append copyright to the target scss', async () => {
      await assertRenderEqual(render, 'scss/basic.scss', 'basic.txt', 'append')
    })

    // failing because of https://github.com/tonyganch/gonzales-pe/pull/214#issuecomment-433608537
    test('should append copyright to the target sass', async () => {
      await assertRenderEqual(render, 'sass/basic.sass', 'basic.txt', 'append')
    })

    test('should append copyright to the target less', async () => {
      await assertRenderEqual(render, 'less/basic.less', 'basic.txt', 'append')
    })
  })

  describe('with normal top comment', () => {
    test('should append copyright to the target css file', async () => {
      await assertRenderEqual(render, 'css/with-normal-top-comment.css', 'basic.txt', 'append')
    })
  })

  describe('with top different copyright', () => {
    test('should append copyright and replace/remove existing copyright(s)', async () => {
      await assertRenderEqual(render, 'css/with-top-copyright.css', 'basic.txt', 'update')
    })
  })

  describe('with same copyright', () => {
    test('should change nothing', async () => {
      await assertRenderEqual(render, 'css/with-same-copyright.css', 'basic.txt', 'identical')
    })
  })
})
