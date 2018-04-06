import mongoose from 'mongoose';
import app from './config/express';
import config from './config/config';

if (config.env !== config.testEnv) {
  mongoose.connect(config.mongo.host);
  mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongo.host}`);
  });
}

if (!module.parent) {
  app.listen(config.port);
}
module.exports = app;
