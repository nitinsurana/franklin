const db = require('../db')()

const obj = module.exports = {
  findAll: () => {
    const rows = db.prepare('SELECT * FROM orders').all()
    return rows
  },
  findById: id => {
    const ret = db.prepare('select * from orders o where o.id=?').get(id)
    if (ret) {
      ret.items = obj.fetchOrderItems(ret.id)
    }
    return ret
  },
  save: (userId, items = []) => {
    if (!userId) {
      return
    }
    const info = db.prepare('insert into orders(user_id) values(?)').run(userId)
    if (info.changes === 1) {
      const orderId = info.lastInsertRowid
      obj.saveOrderItems(orderId, items)
      return obj.findById(orderId)
    } else {
      return null
    }
  },
  saveOrderItems: (orderId, itemIds) => {
    itemIds.forEach(i => {
      const stmt = db.prepare('insert into order_items(order_id, item_id) values(?,?)')
      stmt.run(orderId, i)
    })
  },
  deleteOrderItems: orderId => {
    db.prepare('delete from order_items where order_id=?').run(orderId)
  },
  fetchOrderItems: (orderId) => {
    const ret = db.prepare('select * from order_items where order_id=?').all(orderId)
    return ret
  },
  delete: (id) => {
    if (Number.isNaN(id)) {
      return
    }
    obj.deleteOrderItems(id)
    const changes = db.prepare('delete from orders where id=?').run(id).changes
    return changes
  },
  updateItems: (orderId, items) => {
    if (!orderId || !items) {
      return
    }
    obj.deleteOrderItems(orderId)
    obj.saveOrderItems(orderId, items)
    return obj.findById(orderId)
  }
}
