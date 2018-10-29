import * as path from 'path'
import { readFile } from 'fs-extra'

export function getSourceFile(subPath: string) {
  return readFile(path.resolve(__dirname, '__sources__', subPath), 'utf8')
}

export function getBaselineFile(subPath: string) {
  return readFile(path.resolve(__dirname, '__baselines__', subPath), 'utf8')
}

export function getTemplate(subPath: string) {
  return readFile(path.resolve(__dirname, 'templates', subPath), 'utf8')
}

export interface RenderFunc {
  (source: string, template: string): string
}

export async function assertRenderEqual(render: RenderFunc, sourcePath: string, tplPath: string, assertNoChange = false) {
  const source = await getSourceFile(sourcePath)
  const baseline = await getBaselineFile(sourcePath)
  const template = await getTemplate(tplPath)

  const result = render(source, template)

  if (assertNoChange) {
    expect(result).toEqual(source)
  }

  expect(result).toEqual(baseline)
}
