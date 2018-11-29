#!/usr/bin/env node

import * as importLocal from 'import-local'

if (!importLocal(__filename)) {
  if (process.env.NODE_ENV == null) {
    process.env.NODE_ENV = 'dev'
  }

  try {
    require('../lib/cli/launcher').launch(process.argv.slice(2))
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
}
