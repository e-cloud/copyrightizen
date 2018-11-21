import * as cosmiconfig from 'cosmiconfig'
import * as _ from 'lodash'
import * as path from 'path'
import * as Joi from 'joi'
import * as yargs from 'yargs'
import { defaultConfig } from '../default-config'
import { run } from './runner'
import { ConfigurationModel } from '../config.model.js';
import { validateConfig } from './validate-config';

function launchCli(argv: string[], cwd?: string) {
  return yargs(argv, cwd)
    .options({
      config: {
        description: 'Use the specific configuration file',
        type: 'string',
        normalize: true,
      },
      'detect-rule': {
        description: 'regexp expression to detect copyright',
        type: 'string',
        coerce(input: string) {
          let regex
          try {
            regex = stringToRegexp(input)
          } catch (e) {
            throw new TypeError('Error: Invalid input for "--detect-rule". It should be valid regexp like "/test/i".')
          }

          return regex
        },
      },
      paths: {
        description: 'a list of glob string to match desired files',
        type: 'array',
      },
      'license-text': {
        description: 'the license/copyright notice',
        type: 'string',
        conflicts: ['license-template-url'],
      },
      'license-template-url': {
        description: 'the address for license template file',
        type: 'string',
        normalize: true,
      },
      'update-strategy': {
        description: 'the update strategy when existing copyright is detected in matched source file',
        choices: ['update', 'skip'],
      },
      'follow-gitignore': {
        description: 'exclude the files listed as excluded in .gitignore',
        type: 'boolean',
      },
    })
    .example('$0 --config crn.spec.json', '')
    .example('$0 --detect-rule /@license/i', '')
    .example('$0 --license-text "@license whatever you want"', '')
    .example('$0 --license-template-url config/license.tpl', '')
    .help()
    .alias('h', 'help')
    .strict()
}

export async function launch(argv: string[], cwd?: string) {
  const cmdApp = launchCli(argv, cwd)
  const cmdOptions = cmdApp.argv
  const pkgJSON = require(path.resolve(__dirname, '../../package.json'))
  const explorer = cosmiconfig(pkgJSON.name)

  let fileConfigResult: cosmiconfig.CosmiconfigResult = null

  // todo: validate the file config content
  if (cmdOptions.config) {
    try {
      fileConfigResult = await explorer.load(cmdOptions.config)
    } catch (e) {
      throw e
    }
  } else {
    fileConfigResult = await explorer.search()
  }

  const fileConfig = fileConfigResult ? ensureValidDetectRules(_.cloneDeep(fileConfigResult.config)) : null

  if (fileConfig) {
    const result = validateConfig(fileConfig);

    if (result.error) {
      throw new TypeError(buildFriendlyErrors(result.error));
    }
  }

  const cmdConfig = {
    files: cmdOptions._.map((val: string) => path.resolve(val)),
    detectRule: cmdOptions.detectRule,
    licenseText: cmdOptions.licenseText,
    licenseTemplateUrl: cmdOptions.licenseTemplateUrl,
    paths: cmdOptions.paths,
    updateStrategy: cmdOptions.updateStrategy,
  }

  const mergedConfig = mergeConfig(defaultConfig, cmdConfig, fileConfig)

  return run(mergedConfig)
}

function ensureValidDetectRules(config: Partial<ConfigurationModel>) {
  if (config.detectRule && _.isString(config.detectRule)) {
    try {
      config.detectRule = stringToRegexp(config.detectRule)
    } catch (e) {
      throw new TypeError('Invalid value for global detectRule in provide config file')
    }
  }


  if (config.scopes) {
    config.scopes.forEach(scope => {
      if (scope.detectRule && _.isString(scope.detectRule)) {
        try {
          scope.detectRule = stringToRegexp(scope.detectRule)
        } catch (e) {
          throw new TypeError(`Invalid value for detectRule of scope ${scope.name} in provide config file`)
        }
      }
    })
  }


  return config
}

function stringToRegexp(regexStr: string) {
  const match = regexStr.match(new RegExp('^/(.*?)/([gimy]*)$'))!
  const regex = new RegExp(match[1], match[2])

  return regex
}

function mergeConfig(defaultConf: any, cmdConf: any, fileConf: any) {
  return _.mergeWith({}, defaultConf, fileConf, cmdConf, function customer(val, srcVal, key) {
    if (key === 'extensionAlias') {
      return Object.assign({}, val, srcVal)
    }

    if (Array.isArray(srcVal)) {
      return srcVal
    }
  })
}

function buildFriendlyErrors(error: Joi.ValidationError) {
  const messages: string[] = [`${error.details.length} error(s) are found from config file/object:`]

  return error.details.reduce((out, detail) => {
    switch (detail.type) {
      case 'any.required':
        out.push(` - ${detail.message} at ${buildPropertyPath(detail.path.slice(0, detail.path.length - 1))}`)
        break;
      case 'object.xor':
      case 'object.missing':
        out.push(' - ' + detail.message.replace('value', buildPropertyPath(detail.path)))
        break;
      case 'object.without':
        const pos = 'global scope'
        out.push(' - ' + detail.message + ' at ' + pos)
        break;
    }

    return out
  }, messages).join('\n')
}

function buildPropertyPath(path: (string | number)[]) {
  return path.reduce((out, cur, index) => {
    if (index > 0) {
      if (typeof cur === 'string') {
        out.push('.' + cur)
      } else {
        out.push(`[${cur}]`)
      }
    } else {
      out.push(cur.toString())
    }

    return out
  }, [] as string[]).join('')
}
