import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
const expect = chai.expect;
import app from '../src/index';

chai.config.includeStack = true;

describe('API', () => {
  describe('root', () => {
    it('should return OK', (done) => {
      request(app)
        .get('/')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.text).to.equal('OK');
          done();
        })
        .catch(done);
    });
  });
});