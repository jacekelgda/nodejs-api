import Comment from './comment.model';
import Movie from '../movie.model';

const add = async (req, res, next) => {
  const comment = new Comment({
    text: req.body.text,
    movie: req.movie,
  });

  await comment.save();
  req.movie.comments.push(comment);
  req.movie.save()
    .then(() => res.json(comment))
    .catch(e => next(e));
};

const create = async (req, res, next) => {
  const movie = await Movie.get(req.body.movieId);
  const comment = new Comment({
    text: req.body.text,
    movie,
  });

  await comment.save();
  movie.comments.push(comment);
  movie.save()
    .then(() => res.json(comment))
    .catch(e => next(e));
};

const load = (req, res, next, id) => {
  Comment.get(id)
    .then((comment) => {
      req.comment = comment;
      return next();
    })
    .catch(e => next(e));
};

const get = (req, res) => res.json(req.comment);

const list = (req, res, next) => {
  const { filterBy = null, filterId = null } = req.query;
  Comment.list(filterBy, filterId)
    .then(comments => res.json(comments))
    .catch(e => next(e));
};

module.exports = {
  create,
  add,
  list,
  load,
  get,
};
