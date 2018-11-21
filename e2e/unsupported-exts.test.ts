import { runCopyrightizen } from "./runCopyrghtizen";
import { copyReferenceDirectory } from './utils'
import { compare } from 'dir-compare';

describe('Unsupported extensions tests', () => {
  test('it should not change anything', async () => {
    const { tmpDir, refDir } = await copyReferenceDirectory('unsupported-exts')
    await runCopyrightizen(tmpDir);

    const compareResult = await compare(refDir, tmpDir, { compareContent: true, noDiffSet: true })

    expect(compareResult.same).toEqual(true)
    expect(compareResult).toMatchSnapshot()
  })
})
