const db = require('../db')()

const obj = module.exports = {
  findAll: () => {
    const rows = db.prepare('SELECT * FROM items').all()
    return rows
  },
  findById: id => {
    const ret = db.prepare('select * from items where id=?').get(id)
    return ret
  },
  save: (data) => {
    if (!data) {
      return
    }
    const info = db.prepare('insert into items(name) values(?)').run(data.name)
    if (info.changes === 1) {
      return obj.findById(info.lastInsertRowid)
    } else {
      return null
    }
  },
  delete: (id) => {
    if (Number.isNaN(id)) {
      return
    }
    const changes = db.prepare('delete from items where id=?').run(id).changes
    return changes
  },
  update: data => {
    if (!data || !data.id) {
      return
    }
    db.prepare('update items set name=? where id=?').run(data.name, data.id)
    return obj.findById(data.id)
  }
}
