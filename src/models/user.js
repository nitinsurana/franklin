const db = require('../db')()

class User {
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name
    }

    set name(name) {
        this._name = name;
    }
}

module.exports = {
    find: () => {
        const rows = db.prepare('SELECT * FROM users').all();
        console.log(rows);
        return rows;
    }
}