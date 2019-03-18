/* global describe, it, before, after */
// todo add cobertura nyc coverage

const assert = require('assert')
const _ = require('lodash')
const shell = require('shelljs')

describe(__filename, () => {
  shell.exec('cp blank.db test.db')
  // this makes sure that tests use a temporary test db
  require('../src/db')({ dbname: 'test.db' })
  const modelOrder = require('../src/models/order')
  const modelUser = require('../src/models/user')
  const modelItem = require('../src/models/item')
  let userId
  let items = []

  before(() => {
    userId = modelUser.save({ name: 'user-1' }).id
    items.push(modelItem.save({ name: 'item-1' }))
    items.push(modelItem.save({ name: 'item-2' }))
    items.push(modelItem.save({ name: 'item-3' }))
  })

  after(() => {
    // shell.exec('rm -rf test.db*')
  })

  it('should allow crud on order', () => {
    let arr = modelOrder.findAll()
    assert(Array.isArray(arr))
    assert.strictEqual(0, arr.length)

    const itemIds = items.map(m => m.id)
    let order = modelOrder.save(userId, itemIds)
    assert.strictEqual(1, order.id)
    assert.strictEqual('number', typeof order.id)
    assert(order.items.length === 3)
    order = modelOrder.save(1, itemIds.slice(1))
    assert.strictEqual(2, order.id)
    assert.strictEqual('number', typeof order.id)
    assert(order.items.length === 2)

    arr = modelOrder.findAll()
    assert(Array.isArray(arr))
    assert.strictEqual(2, arr.length)
    assert(arr[0].itemCount === 3)
    assert(arr[1].itemCount === 2)

    order = modelOrder.findById(1)
    assert(_.isEqual({
      id: 1,
      user_id: 1,
      items: [
        { order_id: 1, item_id: 3 },
        { order_id: 1, item_id: 4 },
        { order_id: 1, item_id: 5 }
      ]
    }, order))

    order = modelOrder.findById(2)
    assert(_.isEqual({
      id: 2,
      user_id: 1,
      items: [
        { order_id: 2, item_id: 4 },
        { order_id: 2, item_id: 5 }
      ]
    }, order))

    modelOrder.updateItems(1, [3, 5])
    order = modelOrder.findById(1)
    assert(_.isEqual({
      id: 1,
      user_id: 1,
      items: [
        { order_id: 1, item_id: 3 },
        { order_id: 1, item_id: 5 }
      ]
    }, order))

    let updateCount = modelOrder.delete(1)
    assert(updateCount === 1)
    updateCount = modelOrder.delete(1)
    assert(updateCount === 0)
    updateCount = modelOrder.delete(2)
    assert(updateCount === 1)
  })
})
