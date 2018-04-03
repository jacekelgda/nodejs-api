import mongoose from 'mongoose';
import httpStatus from 'http-status';
import request from 'supertest-as-promised';
import MongodbMemoryServer from 'mongodb-memory-server';
import axios from 'axios';

import app from '../..';
import Zombie from './zombie.model';
import { response } from './__mock__/stock.mock';
import { xml } from './__mock__/exchange.mock';

let mongoServer;
jest.mock('axios');

beforeEach(async () => {
  mongoServer = new MongodbMemoryServer();
  const uri = await mongoServer.getConnectionString();
  await mongoose.connect(uri, { useNewUrlParser: true });
});

afterEach(async () => {
  mongoose.disconnect();
  mongoServer.stop();
});

describe('GET /api/zombies/', () => {
  it('should list zombies', async (done) => {
    axios.get.mockResolvedValue(xml);
    const zombie1 = new Zombie({ name: 'Zygmunt' });
    zombie1.items = [
      response.items[0],
    ];
    const zombie2 = new Zombie({ name: 'Stefan' });
    zombie2.items = [
      response.items[1],
    ];
    await zombie1.save();
    await zombie2.save();
    request(app)
      .get('/api/zombies')
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toHaveLength(2);
        done();
      })
      .catch(done);
  });
});

describe('GET /api/zombies/:zombieId', () => {
  it('should show zombie card', async (done) => {
    axios.get.mockResolvedValue(xml);
    const zombie = new Zombie({ name: 'Radek' });
    zombie.items = [
      response.items[0],
      response.items[1],
      response.items[2],
      response.items[3],
      response.items[4],
    ];
    await zombie.save();

    request(app)
      .get(`/api/zombies/${zombie._id}`)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.EUR).toEqual(140.14611956072233);
        expect(res.body.USD).toEqual(161.45681691855697);
        expect(res.body.PLN).toEqual(610);
        done();
      })
      .catch(done);
  });
});

describe('DELETE /api/zombies/:zombieId', () => {
  it('should remove zombie', async (done) => {
    const zombie = new Zombie({ name: 'Zygmunt' });
    await zombie.save();
    request(app)
      .delete(`/api/zombies/${zombie._id}`)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.name).toEqual('Zygmunt');
        done();
      })
      .catch(done);
  });
});

describe('POST /api/zombies/', () => {
  it('should create zombie', async (done) => {
    request(app)
      .post('/api/zombies')
      .send({ name: 'Zygmunt' })
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.name).toEqual('Zygmunt');
        done();
      })
      .catch(done);
  });

  it('should validate name param', async (done) => {
    request(app)
      .post('/api/zombies')
      .expect(httpStatus.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toEqual('Bad Request: "name" is required');
        done();
      })
      .catch(done);
  });
});

describe('POST /api/zombies/{zombieId}/items', () => {
  it('should add item by id', async (done) => {
    axios.get.mockResolvedValue(response);
    const zombie = new Zombie({ name: 'Zygmunt' });
    await zombie.save();
    request(app)
      .post(`/api/zombies/${zombie._id}/items`) // eslint-disable-line
      .send({ id: 1 })
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.name).toEqual('Diamond Sword');
        done();
      })
      .catch(done);
  });

  it('should allow max 5 items', async (done) => {
    axios.get.mockResolvedValue(response);
    const zombie = new Zombie({ name: 'Radek' });
    zombie.items = [
      response.items[0],
      response.items[1],
      response.items[2],
      response.items[3],
      response.items[4],
    ];
    await zombie.save();


    request(app)
      .post(`/api/zombies/${zombie._id}/items`) // eslint-disable-line
      .send({ id: 6 })
      .expect(httpStatus.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toEqual('Bad Request: Too many items');
        done();
      })
      .catch(done);
  });

  it('should validate if item exists in stock', async (done) => {
    axios.get.mockResolvedValue(response);
    const zombie = new Zombie({ name: 'Zygmunt' });
    await zombie.save();
    request(app)
      .post(`/api/zombies/${zombie._id}/items`) // eslint-disable-line
      .send({ id: 999999999 })
      .expect(httpStatus.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toEqual('Bad Request: Item not found');
        done();
      })
      .catch(done);
  });
});

describe('DELETE /api/zombies/{zombieId}/items', () => {
  it('should remove item by id', async (done) => {
    axios.get.mockResolvedValue(response);
    const zombie = new Zombie({ name: 'Zygmunt' });
    await zombie.save();
    request(app)
      .delete(`/api/zombies/${zombie._id}/items`) // eslint-disable-line
      .send({ id: 1 })
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.name).toEqual('Diamond Sword');
        done();
      })
      .catch(done);
  });
});
