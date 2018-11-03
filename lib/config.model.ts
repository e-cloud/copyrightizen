export interface SimpleScope {
  detectRule: RegExp
  paths: string[]
  licenseText?: string
  licenseTemplateUrl?: string
  updateStrategy: 'update' | 'skip'
}

export interface ScopeWithId extends SimpleScope {
  name: string
  files?: string[]
}

export type SupportedExt = 'css' | 'js' | 'xml' | 'yaml'

export interface ExtensionAliasMap {
  [key: string] : SupportedExt
}

export interface ConfigurationModel extends SimpleScope {
  files?: string[]
  scopes?: ScopeWithId[]
  followGitignore?: boolean
  extensionAlias?: ExtensionAliasMap
}

export interface MergedConfigurationModel extends ConfigurationModel {
  files: string[]
  extensionAlias: ExtensionAliasMap
}
