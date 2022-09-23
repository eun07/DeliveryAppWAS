'use strict'

const { ObjectId } = require("@fastify/mongodb");


module.exports = async function (app, opts) {
  app.get('/', async function (request, reply) {
    const collection = this.mongo.db.collection("restaurants");
    const result = await collection.findOne({ 
      _id:ObjectId(process.env.RESTAURANT_ID)
      }
    );

    reply
    .code(200)
    .header('content-type','application/json')
    .send(result)
  })
}