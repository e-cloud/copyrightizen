import { assertRenderEqual } from './util'
import { render } from '../lib/renderer/yaml-renderer'

describe('yaml tests', () => {
  describe('for basic bare file', () => {
    test('should append copyright to the target yaml', async () => {
      await assertRenderEqual(render, 'yaml/basic.yaml', 'basic.txt', 'append')
    })
  })

  describe('with normal top comment', () => {
    test('should append copyright to the target yaml', async () => {
      await assertRenderEqual(render, 'yaml/with-normal-top-comment.yaml', 'basic.txt', 'append')
    })
  })

  describe('with top different copyright', () => {
    test('should append copyright and replace/remove existing copyright(s)', async () => {
      await assertRenderEqual(render, 'yaml/with-top-copyright.yaml', 'basic.txt', 'update')
    })

    test('should append copyright and separate the empty tail comment line', async () => {
      await assertRenderEqual(render, 'yaml/with-top-copyright-and-extra-empty-comment-line.yaml', 'basic.txt', 'update')
    })
  })

  describe('with inner different copyright', () => {
    test('should append copyright and remove existing copyright(s)', async () => {
      await assertRenderEqual(render, 'yaml/with-inner-copyright.yaml', 'basic.txt', 'update')
    })
  })

  describe('with same copyright', () => {
    test('should change nothing', async () => {
      await assertRenderEqual(render, 'yaml/with-same-copyright.yaml', 'basic.txt', 'identical')
    })

    test('should note change copyright but separate the empty tail comment line', async () => {
      await assertRenderEqual(render, 'yaml/with-same-copyright-and-extra-empty-comment-line.yaml', 'basic.txt', 'update')
    })
  })

  describe('with normal comment and different copyright', () => {
    test('should append copyright and remove existing copyright(s)', async () => {
      await assertRenderEqual(render, 'yaml/with-normal-comment-and-copyright.yaml', 'basic.txt', 'update')
    })
  })
})
