'use strict'

const { ObjectId } = require('@fastify/mongodb')

module.exports = async function (app, opts) {
  app.post('/', async function (request, reply) {
    const restaurants = this.mongo.db.collection("restaurants");
    const query = { "_id" : ObjectId(process.env.RESTAURANT_ID)};
    let myRestaurant = await restaurants.findOne(query);
    const menuNames = myRestaurant.menu.map(elt => elt.name)
    const update = (menuNames.indexOf(request.body.name) === -1) ? { "$set": { menu: [ ...myRestaurant.menu, { "_id": ObjectId(), ...request.body } ] } } : { "$set": { menu: myRestaurant.menu }}
    myRestaurant = await restaurants.findOneAndUpdate(query, update, {returnDocument: "after"});
    reply
      .code(201)
      .type("application/json")
      .send(myRestaurant.value.menu.filter(elt => elt.name === request.body.name)[0]);
  })
}