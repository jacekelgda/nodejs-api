import mongoose from 'mongoose';
import httpStatus from 'http-status';
import request from 'supertest-as-promised';
import MongodbMemoryServer from 'mongodb-memory-server';

import app from '../../index';
import Movie from './movie.model';

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongodbMemoryServer();
  await mongoose.connect(global.MONGO_URI);
});

afterAll(async () => {
  mongoose.disconnect();
  mongoServer.stop();
});

describe('GET /api/movies/', () => {
  it('should get all movies', async (done) => {
    const movie1 = new Movie({ title: 'Some movie 1' });
    const movie2 = new Movie({ title: 'Some movie 2' });
    await movie1.save();
    await movie2.save();
    request(app)
      .get('/api/movies')
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toHaveLength(2);
        done();
      })
      .catch(done);
  });
});

describe('POST /api/movies/', () => {
  it('should create movie', async (done) => {
    request(app)
      .post('/api/movies')
      .send({ title: 'Some other movie' })
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.title).toEqual('Some other movie');
        done();
      })
      .catch(done);
  });
});
