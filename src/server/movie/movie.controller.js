import Movie from './movie.model';

const load = (req, res, next, id) => {
  Movie.get(id)
    .then((movie) => {
      req.movie = movie;
      return next();
    })
    .catch(e => next(e));
};

const create = (req, res, next) => {
  const movie = new Movie({
    title: req.body.title,
    meta: req.movieMeta,
  });

  movie.save()
    .then(savedMovie => res.json(savedMovie))
    .catch(e => next(e));
};

const list = (req, res, next) => {
  Movie.list()
    .then(movies => res.json(movies))
    .catch(e => next(e));
};

module.exports = { load, create, list };
