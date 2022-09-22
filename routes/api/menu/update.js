'use strict'
const { ObjectId } = require('@fastify/mongodb')
// 특정 메뉴를 변경합니다
module.exports = async function (app, opts) {
    // 일단 해당 메뉴가 존재하는지 여부 결정 -> 없으면 POST쓰라고 해야되나?
  // 해당 메뉴가 존재한다면 그냥 updateOne을 쓰면 될거 같긴 한데
  // 리턴하는건 비슷하게 해도 될듯
  app.put('/:id', async function (request, reply) {
    const restaurants = this.mongo.db.collection("restaurants");
    const query = { "_id": ObjectId(process.env.RESTAURANT_ID), "menu": { "$elemMatch": { "_id": ObjectId(request.params.id) } } }
    let myRestaurant = await restaurants.findOne(query);
    if (!myRestaurant) {
      reply
        .code(404)
        .send(`The menu ${request.body.name} with id ${request.params.id} does not exist on the database. Please do create one.`)
    } else {
      let myMenus = myRestaurant.menu;
      const myMenuIds = myMenus.map(elt => elt._id.toString());
      myMenus.splice(myMenuIds.indexOf(request.params.id), 1)
      const newMenus = [ ...myMenus, { "_id": ObjectId(request.params.id) , ...request.body} ]
      const update = { "$set": { menu: newMenus } };
      myRestaurant = await restaurants.findOneAndUpdate(query, update, {returnDocument: "after"});
      reply
        .code(200)
        .type("application/json")
        .send(myRestaurant.value.menu.filter(elt => elt._id.toString() === request.params.id)[0]);
    }
  })
}