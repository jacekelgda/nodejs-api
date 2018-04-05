import Movie from './movie.model';

const create = (req, res, next) => {
  const movie = new Movie({
    title: req.body.title,
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

module.exports = { create, list };
