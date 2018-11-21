# Copyrightizen

<p align="center">
  <a href="https://travis-ci.org/e-cloud/copyrightizen?branch=master">
    <img src="https://travis-ci.org/e-cloud/copyrightizen.svg?branch=master" alt="Travis Status" />
  </a>

  <a href="https://ci.appveyor.com/project/e-cloud/copyrightizen">
    <img src="https://ci.appveyor.com/api/projects/status/tty990xgi2qlxdir?svg=true" alt="Build status" />
  </a>
  
  <a href="https://codeclimate.com/github/e-cloud/copyrightizen/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/397db13e4122f26e736e/test_coverage" alt="CodeClimate Test Coverage" />
  </a>

  <a href="https://www.npmjs.com/package/@e-cloud/copyrightizen">
    <img src="https://img.shields.io/npm/v/@e-cloud/copyrightizen.svg" alt="Version" />
  </a>

  <a href="https://www.npmjs.com/package/@e-cloud/copyrightizen">
    <img src="https://img.shields.io/npm/l/@e-cloud/copyrightizen.svg" alt="License" />
  </a>

  <a href="https://codeclimate.com/github/e-cloud/copyrightizen/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/397db13e4122f26e736e/maintainability" alt="Maintainability" />
  </a>

  <br>
</p>

this module is a tool to append/update copyright/license notice in target source files, based on scope management.

## Usage

For installation, run

```bash
npm install copyrightizen -g
```

to run copyrightizen against some file with glob patterns, run

```bash
copyrightizen --paths src/*.ts
```

to run copyrightizen with config file, just run

```bash
copyrightizen [--config custom.config.js]
```

## Features

* [x] configuration file to control various features
* [x] scope management (similar to Intellij IDE's scope concept)
* [x] custom copyright text or custom file template
  * [ ] support dynamic template
* [x] update strategy to control update or skip update the existing license
* [x] custom Regexp rule to match custom copyright format
* [x] full functionality supported in command line
  * [x] seamless support for multi files input from command line (useful for tools like [lint-staged](https://github.com/okonet/lint-staged))

## Configuration

### Config File

thanks to [cosmiconfig](https://github.com/davidtheclark/cosmiconfig), Copyrightizen support a bunch of config variants:

- a `copyrightizen` property in `package.json`
- a `.copyrightizenrc` file in JSON or YAML format
- a `.copyrightizenrc.json` file
- a `.copyrightizenrc.yaml`, `.copyrightizenrc.yml`, or `.copyrightizenrc.js` file
- a `copyrightizen.config.js` file exporting a JS object

A sample content of the config should look like this:

```json
//.copyrightizenrc
{
  "licenseText": "Copyright (c) Humans on Mars",
  "updateStrategy": "update",
  "scopes": [
    {
      "name": "scopeA",
      "paths": ["*.ts*"],
      "licenseText": "Copyright (c) Humans on Moon",
      "updateStrategy": "update",
    },
  ]
}
```

**NOTE: For the detail constraints of the supported configurations, see [the JSON schema](./config.schema.json).**

NOTE: Configuration uses [globby](https://github.com/sindresorhus/globby) for glob matching, it support glob features what globby supports

### Options Precedence order

From lowest to highest

0. default global Options
1. global Options from config file(if config is enabled and a config file is found)
2. command line global options
3. related scope options if available

### Scopes Precedence order

the order of scopes within config file matters.

The global scope (aka default config) has the lowest priority.
The later a scope is defined in the scopes list, the higher priority it has.

## Command Line Help Message

```
Options:
  --version               Show version number                          [boolean]
  --config                Use the specific configuration file           [string]
  --detect-rule           regexp expression to detect copyright         [string]
  --paths                 a list of glob string to match desired files   [array]
  --license-text          the license/copyright notice                  [string]
  --license-template-url  the address for license template file         [string]
  --update-strategy       the update strategy when existing copyright is
                          detected in matched source file
                                                     [choices: \\"update\\", \\"skip\\"]
  --follow-gitignore      exclude the files listed as excluded in .gitignore
                                                                       [boolean]
  -h, --help              Show help                                    [boolean]

Examples:
  cli.js --config crn.spec.json
  cli.js --detect-rule /@license/i
  cli.js --license-text \\"@license whatever you want\\"
  cli.js --license-template-url config/license.tpl
```
