import * as path from 'path'
import { readFile } from 'fs-extra'
import { RenderFunc, RenderStatus } from '../lib/common.model';

export function getSourceFile(subPath: string) {
  return readFile(path.resolve(__dirname, '__sources__', subPath), 'utf8')
}

export function getBaselineFile(subPath: string) {
  return readFile(path.resolve(__dirname, '__baselines__', subPath), 'utf8')
}

export function getTemplate(subPath: string) {
  return readFile(path.resolve(__dirname, 'templates', subPath), 'utf8')
}

export const copyrightRegexp = /copyright/i

export async function assertRenderEqual(render: RenderFunc, sourcePath: string, tplPath: string, assertStatus: RenderStatus) {
  const source = await getSourceFile(sourcePath)
  const baseline = await getBaselineFile(sourcePath)
  const template = await getTemplate(tplPath)

  const result = render(source, template, copyrightRegexp)

  expect(result.status).toEqual(assertStatus)

  expect(result.content).toEqual(baseline)
}
