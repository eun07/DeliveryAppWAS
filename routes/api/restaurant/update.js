'use strict'

const { ObjectId } = require("@fastify/mongodb");

module.exports = async function (app, opts)
{
    app.patch('/', async function (request, reply)
    {
        const restaurant = this.mongo.db.collection('restaurants')
        const query = { "_id": ObjectId(process.env.RESTAURANT_ID) }
        let myRestaurant = await restaurant.findOne(query);
        if (!myRestaurant)
        {
            reply
              .code(404)
              .send('해당 매장이 존재하지 않습니다')
        }
        else
        {
            await restaurant.findOneAndUpdate(query, {$set: request.body})
            myRestaurant = await restaurant.findOne(query)
            reply
              .code(200)
              .send( myRestaurant )
        }
    })
}