import { readFile, writeFile } from 'fs-extra'
import * as _ from 'lodash'
import { Promise } from 'bluebird'
import * as globby from 'globby'
import * as micromatch from 'micromatch'
import * as toAbsGlob from 'to-absolute-glob'
import { ExtensionAliasMap, MergedConfigurationModel, ScopeWithId } from '../lib/config.model'
import { RenderFunc, RENDER_STATUS } from '../lib/common.model'
import { renderMapping } from '../lib/render-mapping'
import { builtInSupportedExts } from '../lib/default-config'

interface ScopeNameAndExt {
  name: string
  ext: string
}

export async function run(config: MergedConfigurationModel) {
  const filesGlobMatchedMap = new Map<string, ScopeNameAndExt>()
  const precedenceScopes = await loadTemplates(excludeNodeModulesForScopes(buildPrecedenceScopes(config)))
  const precedenceScopeMap = precedenceScopes.reduce((result, val) => {
    result.set(val.name, val)
    return result
  }, new Map<string, ScopeWithId>())
  const supportedExtensions = getSupportedExtensions(config.extensionAlias)
  const getRender = buildRenderMapping(config.extensionAlias, renderMapping)

  // handle explicit files from cli
  if (config.files && config.files.length) {
    // find the most matching scope for each file
    // run render for related extension, ignore files with unsupported extension

    // reverse the array is to find out most matched scope greedily
    const reversedPrecedenceScopes = precedenceScopes
      .reverse()
      // here we use to-absolute-glob to constraint the paths of scope inside cwd
      // there could be some slightly different behavior comparing to globby's functionality
      // see the issue https://github.com/sindresorhus/globby/issues/93 for future improvement
      .map(scope => ({ ...scope, paths: scope.paths.map(p => toAbsGlob(p, { cwd: process.cwd() })) }))

    // assign the most matched scope for each file
    config.files.forEach(file => {
      for (const scope of reversedPrecedenceScopes) {
        if (micromatch.some(file, scope.paths, { matchBase: true })) {
          checkExtAndSaveFileScopeMapIfNeed(filesGlobMatchedMap, supportedExtensions, file, scope.name)
          break
        }
      }
    })

    return processFiles(filesGlobMatchedMap, precedenceScopeMap, getRender)
  }

  // if no files, then we handle all files matched with global scope and defined scopes
  const globbedFiles = await Promise.map(precedenceScopes, val =>
    globby(val.paths, { gitignore: config.followGitignore, absolute: true }).then(files => ({ files, name: val.name })),
  )

  // assign the most matched scope for each file
  globbedFiles.forEach(({ files, name }) => {
    files.forEach(file => {
      checkExtAndSaveFileScopeMapIfNeed(filesGlobMatchedMap, supportedExtensions, file, name)
    })
  })

  return processFiles(filesGlobMatchedMap, precedenceScopeMap, getRender)
}

function checkExtAndSaveFileScopeMapIfNeed(
  filesGlobMatchedMap: Map<string, ScopeNameAndExt>,
  supportedExtensions: string[],
  file: string,
  name: string,
) {
  const ext = getExtname(file)
  if (supportedExtensions.includes(getExtname(file))) {
    filesGlobMatchedMap.set(file, { name, ext })
  }
}

/**
 * read those supported file and try to apply copyright append/update logic,
 * and write the changes if necessary
 */
function processFiles(
  fileScopeMap: Map<string, ScopeNameAndExt>,
  precedenceScopeMap: Map<string, ScopeWithId>,
  getRender: (ext: string) => RenderFunc,
) {
  return Promise.map(Array.from(fileScopeMap.entries()), ([file, conf]) => {
    const scope = precedenceScopeMap.get(conf.name)!
    return readFile(file, 'utf8').then(content => {
      const renderResult = getRender(conf.ext)(content, scope.licenseText!, scope.detectRule)

      // if there will be copyright update, and update strategy is skip, do nothing
      if (
        (renderResult.status === RENDER_STATUS.update && scope.updateStrategy === 'skip') ||
        renderResult.status === RENDER_STATUS.identical
      ) {
        return Promise.resolve()
      }

      return writeFile(file, renderResult.content, 'utf8')
    })
  })
}

/**
 * produces a scope list includes the global scope,
 * makes the global scope behave as normal scope with lowest precedence
 */
function buildPrecedenceScopes(config: MergedConfigurationModel) {
  const globalScope: ScopeWithId = _.pick(config, [
    'detectRule',
    'paths',
    'licenseText',
    'licenseTemplateUrl',
    'updateStrategy',
  ]) as any

  globalScope.name = '__DefaultGlobal__'

  return [globalScope].concat(config.scopes || [])
}

/**
 * load the template file for each scope if provided
 */
function loadTemplates(scopes: ScopeWithId[]) {
  return Promise.map(scopes, scope => {
    if (scope.licenseTemplateUrl) {
      return readFile(scope.licenseTemplateUrl, 'utf8').then(content => ({ ...scope, licenseText: content }))
    } else {
      return Promise.resolve(scope)
    }
  })
}

/**
 * ignore files from node_modules for each scope in force
 */
function excludeNodeModulesForScopes(scopes: ScopeWithId[]) {
  return scopes.map(scope => ({ ...scope, paths: _.uniq(scope.paths.concat('!node_modules')) }))
}

function getSupportedExtensions(extensionAlias: ExtensionAliasMap) {
  return Object.keys(extensionAlias).concat(builtInSupportedExts)
}

function getExtname(filename: string) {
  return filename.split('.').pop() || ''
}

/**
 * build a curry function to retrieve render effectively
 */
function buildRenderMapping(extensionAliases: ExtensionAliasMap, renderMapping: { [key: string]: RenderFunc }) {
  const mergedMapping: { [key: string]: RenderFunc } = Object.assign(Object.create(null), renderMapping)

  _.forEach(extensionAliases, (val, key) => {
    mergedMapping[key] = mergedMapping[val]
  })

  return function(ext: string) {
    return mergedMapping[ext]
  }
}
