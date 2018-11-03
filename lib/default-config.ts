import { ConfigurationModel, ExtensionAliasMap } from "./config.model";

const builtInExtAlias: ExtensionAliasMap = {
  ts: 'js',
  html: 'xml',
  sass: 'css',
  scss: 'css',
  less: 'css',
  yml: 'yaml',
}

export const builtInSupportedExts = ['css', 'js', 'xml', 'yaml']

export const defaultConfig: ConfigurationModel = {
  detectRule: /Copyright/i,
  licenseText: 'Copyright (c) Humans on Earth',
  paths: [ '*.{js,css,html}' ],
  updateStrategy: 'skip',
  extensionAlias: builtInExtAlias,
  followGitignore: true,
}
