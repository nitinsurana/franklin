const db = require('../db')()

// class User {
//     get id() {
//         return this._id;
//     }
//
//     set id(id) {
//         this._id = id;
//     }
//
//     get name() {
//         return this._name
//     }
//
//     set name(name) {
//         this._name = name;
//     }
// }

module.exports = {
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
    const changes = db.prepare('insert into users(name) values(?)').run(data.name).changes
    return changes
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
    return module.exports.findById(data.id)
  }
}
