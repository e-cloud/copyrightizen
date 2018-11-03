import * as cosmiconfig from 'cosmiconfig'
import * as _ from 'lodash'
import * as path from 'path'
import * as yargs from 'yargs'
import * as pkgJSON from '../package.json'
import { defaultConfig } from '../lib/default-config'
import { run } from './runner'

const cmdApp = yargs
  .options({
    config: {
      description: 'Use the specific configuration file',
      type: 'string',
      normalize: true,
    },
    'detect-rule': {
      description: 'regexp expression to detect copyright',
      type: 'string',
      coerce(input) {
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

export async function launch() {
  const cmdOptions = cmdApp.argv
  const explorer = cosmiconfig(pkgJSON.name)

  let fileConfig

  // todo: validate the file config content
  if (cmdOptions.config) {
    fileConfig = await explorer.load(cmdOptions.config).catch(e => {
      console.error(e.message)
      process.exit(1)
    })
  } else {
    fileConfig = await explorer.search()
  }

  const cmdConfig = {
    files: cmdOptions._.map(val => path.resolve(val)),
    detectRule: cmdOptions.detectRule,
    licenseText: cmdOptions.licenseText,
    licenseTemplateUrl: cmdOptions.licenseTemplateUrl,
    paths: cmdOptions.paths,
    updateStrategy: cmdOptions.updateStrategy,
  }

  return run(mergeConfig(defaultConfig, cmdConfig, fileConfig))
}

function stringToRegexp(regexStr: string) {
  const match = regexStr.match(new RegExp('^/(.*?)/([gimy]*)$'))!
  // sanity check here
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
