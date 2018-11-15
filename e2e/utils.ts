import * as fs from 'fs-extra'
import * as path from 'path'

const tmpDir = 'tmp'
const sourcesDir = 'fixtures'
const referencesDir = 'reference-output'

export async function copyReferenceDirectory(targetDir: string) {
  const targetTmpDir = path.resolve(__dirname, tmpDir, targetDir)
  const sourceDir = path.resolve(__dirname, sourcesDir, targetDir)
  const refDir = path.resolve(__dirname, referencesDir, targetDir)

  return fs.emptyDir(targetTmpDir).then(() => fs.copy(sourceDir, targetTmpDir)).then(() => ({tmpDir: targetTmpDir, refDir}))
}
