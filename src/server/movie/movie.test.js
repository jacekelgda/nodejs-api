import mongoose from 'mongoose';
import httpStatus from 'http-status';
import request from 'supertest-as-promised';
import MongodbMemoryServer from 'mongodb-memory-server';
import axios from 'axios';

import app from '../../index';
import Movie from './movie.model';

let mongoServer;
jest.mock('axios');

beforeEach(async () => {
  mongoServer = new MongodbMemoryServer();
  const uri = await mongoServer.getConnectionString();
  await mongoose.connect(uri);
});

afterEach(async () => {
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
    axios.get.mockResolvedValue({ data: { Title: 'Blade Runner' } });
    request(app)
      .post('/api/movies')
      .send({ title: 'Blade Runner' })
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.title).toEqual('Blade Runner');
        expect(res.body.meta.Title).toEqual('Blade Runner');
        done();
      })
      .catch(done);
  });

  it('should validate title param', async (done) => {
    request(app)
      .post('/api/movies')
      .expect(httpStatus.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toEqual('Bad Request: "title" is required');
        done();
      })
      .catch(done);
  });
});

describe('POST /api/movies/{movieId}/comments', () => {
  it('should add comment', async (done) => {
    const movie = new Movie({ title: 'Some movie 3' });
    await movie.save();

    request(app)
      .post(`/api/movies/${movie._id}/comments`) // eslint-disable-line
      .send({ text: 'Some movie comment' })
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.text).toEqual('Some movie comment');
        done();
      })
      .catch(done);
  });
});

