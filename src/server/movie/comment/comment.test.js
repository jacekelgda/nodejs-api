import mongoose from 'mongoose';
import httpStatus from 'http-status';
import request from 'supertest-as-promised';
import MongodbMemoryServer from 'mongodb-memory-server';

import app from '../../../index';
import Movie from '../movie.model';
import Comment from './comment.model';

let mongoServer;

beforeEach(async () => {
  mongoServer = new MongodbMemoryServer();
  const uri = await mongoServer.getConnectionString();
  await mongoose.connect(uri);
});

afterEach(async () => {
  mongoose.disconnect();
  mongoServer.stop();
});

describe('POST /api/comments', () => {
  it('should add comment', async (done) => {
    const movie = new Movie({ title: 'Movie' });
    await movie.save();

    request(app)
      .post('/api/comments')
      .send({ text: 'Comment to Movie', movieId: movie._id }) // eslint-disable-line
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.text).toEqual('Comment to Movie');
        done();
      })
      .catch(done);
  });
});

describe('GET /api/comments', () => {
  it('should list all comments', async (done) => {
    const movie = new Movie({ title: 'Movie 1' });
    const comment1 = new Comment({ text: 'Comment to Movie 1', movie });
    await comment1.save();
    movie.comments.push(comment1);
    const comment2 = new Comment({ text: 'New comment to Movie 1', movie });
    await comment2.save();
    movie.comments.push(comment2);
    await movie.save();

    request(app)
      .get('/api/comments')
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toHaveLength(2);
        done();
      })
      .catch(done);
  });

  it('should list comments by filter', async (done) => {
    const movie1 = new Movie({ title: 'Movie 1' });
    const comment1 = new Comment({ text: 'Comment to Movie 1', movie: movie1 });
    await comment1.save();
    movie1.comments.push(comment1);
    const comment2 = new Comment({ text: 'New comment to Movie 1', movie: movie1 });
    await comment2.save();
    movie1.comments.push(comment2);
    await movie1.save();

    const movie2 = new Movie({ title: 'Movie 2' });
    const comment3 = new Comment({ text: 'Comment to Movie 2', movie: movie2 });
    await comment3.save();
    movie2.comments.push(comment3);
    const comment4 = new Comment({ text: 'New comment to Movie 2', movie: movie2 });
    await comment4.save();
    movie2.comments.push(comment4);
    await movie2.save();

    request(app)
      .get('/api/comments')
      .query({ filterBy: 'movie', filterId: `${movie1._id}` }) // eslint-disable-line
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toHaveLength(2);
        done();
      })
      .catch(done);
  });
});
