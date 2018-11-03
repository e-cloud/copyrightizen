import { assertRenderEqual } from './util'
import { render } from '../lib/xml-renderer'

describe('html/xml tests', () => {
  describe('for basic bare file', () => {
    test('should append copyright to the target html file', async () => {
      await assertRenderEqual(render, 'html/basic.html', 'basic.txt', 'append')
    })

    test('should append copyright to the target xml file', async () => {
      await assertRenderEqual(render, 'xml/basic.xml', 'basic.txt', 'append')
    })
  })

  describe('with normal top comment', () => {
    test('should append copyright to the target html file', async () => {
      await assertRenderEqual(render, 'html/with-normal-top-comment.html', 'basic.txt', 'append')
    })
  })

  describe('with top different copyright', () => {
    test('should append copyright and replace/remove existing copyright(s)', async () => {
      await assertRenderEqual(render, 'html/with-top-copyright.html', 'basic.txt', 'update')
    })
  })

  describe('with inner copyright', () => {
    test('should append copyright and remove existing copyright(s)', async () => {
      await assertRenderEqual(render, 'html/with-inner-copyright.html', 'basic.txt', 'update')
    })
  })

  describe('with same copyright', () => {
    test('should change nothing', async () => {
      await assertRenderEqual(render, 'html/with-same-copyright.html', 'basic.txt', 'identical')
    })
  })
})
