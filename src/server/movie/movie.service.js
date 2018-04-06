import axios from 'axios';
import { omdb } from '../../config/config';

export default (req, res, next) => {
  axios
    .get(`${omdb.url}/?t=${req.body.title}&apikey=${omdb.key}`)
    .then((movieMeta) => {
      req.movieMeta = movieMeta.data;
      return next();
    })
    .catch(() => next());
};
