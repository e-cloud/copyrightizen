import { runCopyrightizen } from "./runCopyrghtizen";
import { copyReferenceDirectory } from './utils'
import { compare } from 'dir-compare';

describe('Scopes management tests', () => {

  describe('scopes precedence', () => {
    test('it should handle scopes precedence correctly', async () => {
      const { tmpDir, refDir } = await copyReferenceDirectory('scopes-precedence')
      const result = await runCopyrightizen(tmpDir);

      const compareResult = await compare(refDir, tmpDir, { compareContent: true, noDiffSet: true })

      expect(result.status).toEqual(0)
      expect(compareResult.same).toEqual(true)
      expect(compareResult).toMatchSnapshot()
    })
  })

  describe('multiple scopes intersection', () => {
    test('it should handle scopes correctly', async () => {
      const { tmpDir, refDir } = await copyReferenceDirectory('multi-intersected-scopes')
      const result = await runCopyrightizen(tmpDir);

      const compareResult = await compare(refDir, tmpDir, { compareContent: true, noDiffSet: true })

      expect(result.status).toEqual(0)
      expect(compareResult.same).toEqual(true)
      expect(compareResult).toMatchSnapshot()
    })
  })

})
