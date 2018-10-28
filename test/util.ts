import * as path from 'path'
import { readFile } from 'fs-extra'

function getSourceFile(subPath: string) {
  return readFile(path.resolve(__dirname, '__sources__', subPath), 'utf8')
}

function getBaselineFile(subPath: string) {
  return readFile(path.resolve(__dirname, '__baselines__', subPath), 'utf8')
}

function getTemplate(subPath: string) {
  return readFile(path.resolve(__dirname, 'templates', subPath), 'utf8')
}

export { getSourceFile, getBaselineFile, getTemplate }
