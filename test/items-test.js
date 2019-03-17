/* global describe, it, after */
// todo add cobertura nyc coverage

const assert = require('assert')
const _ = require('lodash')
const shell = require('shelljs')

describe(__filename, () => {
  shell.exec('cp blank.db test.db')
  // this makes sure that tests use a temporary test db
  require('../src/db')({ dbname: 'test.db' })
  const modelItem = require('../src/models/item')

  after(() => {
    shell.exec('rm -rf test.db*')
  })

  it('should allow crud on item', () => {
    let arr = modelItem.findAll()
    assert(Array.isArray(arr))
    assert.strictEqual(0, arr.length)

    let item = modelItem.save({ name: 'test1' })
    assert.strictEqual('number', typeof item.id)
    modelItem.save({ name: 'test2' })
    assert.strictEqual('number', typeof item.id)

    arr = modelItem.findAll()
    assert(Array.isArray(arr))
    assert.strictEqual(2, arr.length)

    item = modelItem.findById(1)
    assert(_.isEqual({ id: 1, name: 'test1' }, item))
    item = modelItem.findById(2)
    assert(_.isEqual({ id: 2, name: 'test2' }, item))

    modelItem.update({ id: 1, name: 'test-updated' })
    item = modelItem.findById(1)
    assert(_.isEqual({ id: 1, name: 'test-updated' }, item))

    let updateCount = modelItem.delete(1)
    assert(updateCount === 1)
    updateCount = modelItem.delete(1)
    assert(updateCount === 0)
    updateCount = modelItem.delete(2)
    assert(updateCount === 1)
  })
})
