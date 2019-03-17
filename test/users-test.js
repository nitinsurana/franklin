//todo add cobertura nyc coverage

const assert = require('assert');
const _ = require('lodash');
const shell = require('shelljs');

describe(__filename, () => {
    shell.exec('cp blank.db test.db');
    require('../src/db')({dbname: 'test.db'});      //this makes sure that tests use a temporary test db
    const modelUser = require('../src/models/user');

    after(() => {
        shell.exec('rm -rf test.db*');
    });

    it('should allow crud on user', () => {
        let arr = modelUser.findAll();
        assert(Array.isArray(arr));
        assert.strictEqual(0, arr.length);

        let updateCount = modelUser.save({name: 'test1'});
        assert(updateCount === 1);
        modelUser.save({name: 'test2'});
        assert(updateCount === 1);

        arr = modelUser.findAll();
        assert(Array.isArray(arr));
        assert.strictEqual(2, arr.length);

        let user = modelUser.findById(1);
        assert(_.isEqual({id: 1, name: "test1"}, user));
        user = modelUser.findById(2);
        assert(_.isEqual({id: 2, name: "test2"}, user));

        modelUser.update({id: 1, name: 'test-updated'});
        user = modelUser.findById(1);
        assert(_.isEqual({id: 1, name: "test-updated"}, user));

        updateCount = modelUser.delete(1);
        assert(updateCount === 1);
        updateCount = modelUser.delete(1);
        assert(updateCount === 0);
        updateCount = modelUser.delete(2);
        assert(updateCount === 1);
    });
});