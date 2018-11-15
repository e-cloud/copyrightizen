import { runCopyrightizen } from "./runCopyrghtizen";
import { copyReferenceDirectory } from './utils'
import { compare } from 'dir-compare';

describe('Config precedence tests', () => {
  test('should append default copyright notice without any user config', async () => {
    const { tmpDir, refDir } = await copyReferenceDirectory('config-precedence/without-config')
    const result = await runCopyrightizen(tmpDir);

    const compareResult = await compare(refDir, tmpDir, { compareContent: true, noDiffSet: true })

    expect(result.status).toEqual(0)
    expect(compareResult.same).toEqual(true)
    expect(compareResult).toMatchSnapshot()
  })

  test('should use license text from cli and strategy from config file', async () => {
    const { tmpDir, refDir } = await copyReferenceDirectory('config-precedence/with-cli-and-file-config')
    const result = await runCopyrightizen(tmpDir, [
      '--license-text',
      '"Copyright (c) Humans on Jupiter"'
    ]);

    const compareResult = await compare(refDir, tmpDir, { compareContent: true, noDiffSet: true })

    expect(result.status).toEqual(0)
    expect(compareResult.same).toEqual(true)
    expect(compareResult).toMatchSnapshot()
  })

  test('should use license text from cli and strategy from package config', async () => {
    const { tmpDir, refDir } = await copyReferenceDirectory('config-precedence/with-cli-and-file-config')
    const result = await runCopyrightizen(tmpDir, [
      '--license-text',
      '"Copyright (c) Humans on Jupiter"'
    ]);

    const compareResult = await compare(refDir, tmpDir, { compareContent: true, noDiffSet: true })

    expect(result.status).toEqual(0)
    expect(compareResult.same).toEqual(true)
    expect(compareResult).toMatchSnapshot()
  })
})
