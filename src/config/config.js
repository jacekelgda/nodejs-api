const Joi = require('joi');

require('dotenv').config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['production', 'development', 'test'])
    .default('development'),
  PORT: Joi.number()
    .default(3000),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  IMDB_API_KEY: Joi.string().required()
    .description('IMDB API key'),
  IMDB_API_URL: Joi.string().required()
    .description('IMDB API url'),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
  },
  omdb: {
    key: envVars.IMDB_API_KEY,
    url: envVars.IMDB_API_URL,
  },
};

module.exports = config;
