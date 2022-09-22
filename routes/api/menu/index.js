'use strict'

module.exports = async function (app, opts) {
  app.register(require('./create'))
  app.register(require('./update'))
  app.register(require('./delete'))
}