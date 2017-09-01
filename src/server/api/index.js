import { Router } from 'express';

const router = new Router();

router
  .get('/counter', (req, res) => {
    setTimeout(() => {
      console.log('HTTP: get counter');
      res.json({
        number: Math.round(Math.random() * 1000)
      });
    }, 500);
  });

export default router;
