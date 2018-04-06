### Requirements

You will need npm and node installed on your host machine.

Create new account on https://mlab.com/signup/ and setup your connection details in `.env` (duplicate from .env.template).

Obtain omdb API key: http://www.omdbapi.com/apikey.aspx and update `.env`

### Installation

Install all packages:

`yarn`

### Running local development

Start local dev server:

`yarn dev`

Api is accessible under port `http://localhost:3000/` by default.

### Local testing

Run all tests:

`yarn test`

See all specs:

`yarn test --verbose`

Clear cache:

`yarn test --clearCache`

### Style linter

Fix linter issues:

`yarn eslint`

### API Documentation

* POST /api/movies/ { title }
* GET /api/movies/
* POST /api/movies/{movieId}/comments { text }
* POST /api/comments { text, movieId }
* GET /api/comments
* GET /api/comments/?filterBy=<ref>&filterId=<ref-id>
