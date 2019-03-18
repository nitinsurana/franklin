const db = require('../db')()

const obj = module.exports = {
  findAll: () => {
    const rows = db.prepare('SELECT * FROM users').all()
    return rows
  },
  findById: id => {
    const ret = db.prepare('select * from users where id=?').get(id)
    return ret
  },
  save: (data) => {
    if (!data) {
      return
    }
    const info = db.prepare('insert into users(name,avatar) values(?,?)').run(data.name, data.avatar)
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
    const changes = db.prepare('delete from users where id=?').run(id).changes
    return changes
  },
  update: data => {
    if (!data || !data.id) {
      return
    }
    db.prepare('update users set name=? where id=?').run(data.name, data.id)
    return obj.findById(data.id)
  }
}
