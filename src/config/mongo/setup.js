const MongodbMemoryServer = require('mongodb-memory-server');

const MONGO_DB_NAME = 'jest';

/* eslint-disable */
const mongod = new MongodbMemoryServer.default({
  instance: {
    dbName: MONGO_DB_NAME,
  },
  binary: {
    version: '3.2.19',
  },
});
/* eslint-enable */

module.exports = () => {
  global.MONGOD = mongod;
  global.MONGO_DB_NAME = MONGO_DB_NAME;
};
