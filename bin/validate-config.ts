import * as Joi from 'joi';
import { builtInSupportedExts } from '../lib/default-config';
import { ConfigurationModel } from '../lib/config.model';

const simpleScopeSchema = Joi.object().keys({
  detectRule: Joi.object().type(RegExp),
  paths: Joi.array().items(Joi.string().required().min(1)),
  licenseText: Joi.string(),
  licenseTemplateUrl: Joi.string().min(1),
  updateStrategy: Joi.string().valid('update', 'skip')
})

const scopeSchema = simpleScopeSchema
  .append({
    name: Joi.string()
  })
  .requiredKeys(['name', 'detectRule', 'paths', 'updateStrategy'])
  .xor('licenseText', 'licenseTemplateUrl')

export const configSchema = simpleScopeSchema.without('licenseText', 'licenseTemplateUrl').keys({
  followGitignore: Joi.boolean(),
  extensionAlias: Joi.object().pattern(/[\w\d]+/, Joi.string().valid(...builtInSupportedExts)),
  scopes: Joi.array().items(scopeSchema)
})


export function validateConfig(config: Partial<ConfigurationModel>) {
  return Joi.validate(config, configSchema, {
    abortEarly: false,
    skipFunctions: true,
  })
}
