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

module.export = new User();