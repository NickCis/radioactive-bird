import { Router } from 'express';
import Twitter from '../twitter';

const router = new Router();
export const client = new Twitter({
  consumerKey:
    process.env.TWITTER_CONSUMER_KEY || process.env.RAZZLE_CONSUMER_KEY,
  consumerSecret:
    process.env.TWITTER_CONSUMER_SECRET || process.env.RAZZLE_CONSUMER_SECRET,
});

router.use((req, res, next) => {
  if (client.bearerToken) {
    req.twitter = client;
    next();
    return;
  }

  client
    .auth()
    .then(() => {
      req.twitter = client;
      next();
    })
    .catch(err => {
      const error = new Error(err);
      error.jsonResponse = err;
      next(error);
    });
});

router.get('/search/:query', (req, res, next) => {
  req.twitter
    .search(req.params.query)
    .then(json => res.json(json))
    .catch(err => {
      const error = new Error(err);
      error.jsonResponse = err;
      next(error);
    });
});

router.get('/tweet/:id', (req, res, next) => {
  req.twitter
    .getTweet(req.params.id)
    .then(json => res.json(json))
    .catch(err => {
      const error = new Error(err);
      error.jsonResponse = err;
      next(error);
    });
});

router.use((req, res) => {
  res.status(404).json({ errors: [{ message: 'Not found', code: 404 }] });
});

router.use((err, req, res, next) => {
  res
    .status(500)
    .json(err.jsonResponse || { errors: [{ message: err.toString() }] });
});

export default router;
