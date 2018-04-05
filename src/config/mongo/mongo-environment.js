const NodeEnvironment = require('jest-environment-node');

class MongoEnvironment extends NodeEnvironment {
  async setup() {
    this.global.MONGO_URI = await global.MONGOD.getConnectionString();
    this.global.MONGO_DB_NAME = global.MONGO_DB_NAME;

    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoEnvironment;
