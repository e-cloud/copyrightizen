import { runCopyrightizen, execCopyrightizen } from "./runCopyrghtizen";
import { copyReferenceDirectory } from './utils'
import { compare } from 'dir-compare';

describe('CLI integration tests', () => {
  test('console printing with --help', async () => {
    const result = await execCopyrightizen('./', [
      '--help',
    ]);

    expect(result.stdout).toMatchSnapshot()
  })

  test('invalid input in combination with `--license-text` and `--license-template-url`', async () => {
    const result = await execCopyrightizen('./', [
      '--license-text',
      '"copyright test"',
      '--license-template-url',
      'licenseTpl.txt'
    ]);

    expect(result.status).toEqual(1)

    expect(result.stderr).toMatchSnapshot()
  })

  describe('invalid input for `--detect-rule`', function () {
    test('with value as `copyright`', async () => {
      const originExit = process.exit
      const originLogErr = console.error
      const mockedExit: any = jest.fn(() => {throw new Error('exit')})
      process.exit = mockedExit
      console.error = () => false

      try {
        await runCopyrightizen('./', [
          '--detect-rule',
          'copyright'
        ]);
      } catch (e) {
        expect(mockedExit).toHaveBeenCalledWith(1)
        expect(e.message).toEqual('exit')
      }

      process.exit = originExit
      console.error = originLogErr
    })

    test('with value as `copyright`', async () => {
      const originExit = process.exit
      const originLogErr = console.error
      const mockedExit: any = jest.fn(() => {throw new Error('exit')})
      process.exit = mockedExit
      console.error = () => false

      try {
        await runCopyrightizen('./', [
          '--detect-rule',
          '^Copyright'
        ]);
      } catch (e) {
        expect(mockedExit).toHaveBeenCalledWith(1)
        expect(e.message).toEqual('exit')
      }

      process.exit = originExit
      console.error = originLogErr
    })
  })

  test('invalid path for `--config`', async () => {
    try {
      await runCopyrightizen('./', [
        '--config',
        'copyright.tpl'
      ]);
    } catch (e) {
      expect(e.message).toContain('ENOENT: no such file or directory')
    }
  })

  test('it should only process with specified files', async () => {
    const { tmpDir, refDir } = await copyReferenceDirectory('specified-files')
    await runCopyrightizen(tmpDir, [
      'should-be-updated.js'
    ]);

    const compareResult = await compare(refDir, tmpDir, { compareContent: true, noDiffSet: true })

    expect(compareResult.same).toEqual(true)
    expect(compareResult).toMatchSnapshot()
  })

  test('it should use license template from `--license-template-url`', async () => {
    const { tmpDir, refDir } = await copyReferenceDirectory('use-license-tpl-file')
    await runCopyrightizen(tmpDir, [
      '--license-template-url',
      'license.txt'
    ]);

    const compareResult = await compare(refDir, tmpDir, { compareContent: true, noDiffSet: true })

    expect(compareResult.same).toEqual(true)
    expect(compareResult).toMatchSnapshot()
  })

  test('validation error message should be output when invalid config received', async () => {
    try {
      await runCopyrightizen('./fixtures/config-validation');
    } catch (e) {
      expect(e.message).toMatchSnapshot()
    }
  })
})
