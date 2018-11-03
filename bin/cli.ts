#!/usr/bin/env node

import * as importLocal from 'import-local'

if (!importLocal(__filename)) {
  if (process.env.NODE_ENV == null) {
    process.env.NODE_ENV = 'dev'
  }

  require('./launcher').launch()
}
