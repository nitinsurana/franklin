//todo add mocha tests
//todo add cobertura nyc coverage
const assert = require('assert')
const db = require('../src/db')({dbname: 'test.db'});
const modelUser = require('../src/models/user');

describe(__filename, () => {

    it('should allow crud on user', next => {
        const arr = modelUser.find();
        assert(Array.isArray(arr));
        next();
    });
});