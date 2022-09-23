'use strict'

const { ObjectId } = require("@fastify/mongodb")


module.exports = async function (app, opts) {
  app.delete('/:id', async function (request, reply) {
    const restaurant = this.mongo.db.collection('restaurants')
    const query = { "_id": ObjectId(process.env.RESTAURANT_ID), "menu": { "$elemMatch": { "_id": ObjectId(request.params.id) } } }
    let myRestaurant = await restaurant.findOne(query);
    if (!myRestaurant)
    {
      reply
        .code(404)
        .send('해당 메뉴가 존재하지 않습니다.')
    }
    else
    {
      let myMenus = myRestaurant.menu;
      let modifiedMenus = myMenus.filter(elt => elt._id.toString() !== request.params.id);
      await restaurant.findOneAndUpdate(query, {$set: {menu: modifiedMenus}})
      reply
        .code(201)
    }
  })
}