# Copyrightizen

## Options Precedence order

From lowest to highest

0. default global Options
1. global Options from config file(if config is enabled and a config file is found)
2. command line global options
3. related scope options if available

## Scopes Precedence order

the order of scopes within config file matters.

The global scope (aka default config) has the lowest priority.
The later a scope is defined in the scopes list, the higher priority it has.
