import { Router } from 'express';
import searchStubResponse from './searchStubResponse';

const router = new Router();

router.get('/counter', (req, res) => {
  setTimeout(() => {
    console.log('HTTP: get counter');
    res.json({
      number: Math.round(Math.random() * 1000),
    });
  }, 500);
});

router.get('/search/:query', (req, res) => {
  setTimeout(() => {
    res.json(searchStubResponse);
  }, 500);
});

router.use((req, res) => {
  res.status(404).json({ error: 'Not found', code: 404 });
});

export default router;
