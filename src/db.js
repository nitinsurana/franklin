const Database = require('better-sqlite3')

let db

function createDB (options) {
  db = Database(options.dbname || 'franklin.db', options)
  db.pragma('journal_mode = WAL')
  return db
}

module.exports = (options = {}) => {
  db = db || createDB(options)
  return db
}

// const row = db.prepare('SELECT * FROM users WHERE id=?').get(userId);
// console.log(row.firstName, row.lastName, row.email);
