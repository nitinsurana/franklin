//todo add cobertura nyc coverage

const assert = require('assert')
const shell = require('shelljs');
const db = require('../src/db')({dbname: 'test.db'});
const modelUser = require('../src/models/user');

describe(__filename, () => {

    before(() => {

    });

    after(() => {
        shell.exec('rm -rf test.db*');
        shell.exec('cp franklin.db test.db');
    });

    it('should allow crud on user', () => {
        let arr = modelUser.find();
        assert(Array.isArray(arr));
        assert.strictEqual(0, arr.length);

        let updateCount = modelUser.save({name: 'test1'});
        assert(updateCount === 1);
        modelUser.save({name: 'test2'});
        assert(updateCount === 1);

        arr = modelUser.find();
        assert(Array.isArray(arr));
        assert.strictEqual(2, arr.length);

        updateCount = modelUser.delete(1);
        assert(updateCount === 1);
        updateCount = modelUser.delete(1);
        assert(updateCount === 0);
        updateCount = modelUser.delete(2);
        assert(updateCount === 1);
    });
});