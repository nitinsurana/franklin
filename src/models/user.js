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
    },
    save: (data) => {
        if (!data) {
            return;
        }
        const changes = db.prepare('insert into users(name) values(?)').run(data.name).changes;
        return changes;
    },
    delete: (id) => {
        if (Number.isNaN(id)) {
            return;
        }
        const changes = db.prepare('delete from users where id=?').run(id).changes;
        return changes;
    }
}