import { runCopyrightizen } from "./runCopyrghtizen";
import { copyReferenceDirectory } from './utils'
import { compare } from 'dir-compare';

describe('CLI integration tests', () => {
  test('console printing with --help', async () => {
    const result = await runCopyrightizen('./', [
      '--help',
    ]);

    expect(result.stdout).toMatchSnapshot()
  })

  test('invalid input in combination with `--license-text` and `--license-template-url`', async () => {
    const result = await runCopyrightizen('./', [
      '--license-text',
      '"copyright test"',
      '--license-template-url',
      'licenseTpl.txt'
    ]);

    expect(result.status).toEqual(1)

    expect(result.stderr).toMatchSnapshot()
  })

  test('validation error message should be output when invalid config received', async () => {
    const result = await runCopyrightizen('./fixtures/config-validation');

    expect(result.status).toEqual(1)

    expect(result.stderr).toMatchSnapshot()
  })

  test('it should use license template from `--license-template-url`', async () => {
    const { tmpDir, refDir } = await copyReferenceDirectory('use-license-tpl-file')
    const result = await runCopyrightizen(tmpDir, [
      '--license-template-url',
      'license.txt'
    ]);

    const compareResult = await compare(refDir, tmpDir, { compareContent: true, noDiffSet: true })

    expect(result.status).toEqual(0)
    expect(compareResult.same).toEqual(true)
    expect(compareResult).toMatchSnapshot()
  })
})
