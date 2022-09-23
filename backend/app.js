'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
require('dotenv').config()

module.exports = async function (fastify, opts) {n
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
