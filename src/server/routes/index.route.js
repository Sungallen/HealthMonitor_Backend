import express from 'express';
// Router
import history from './history.route';
import user from './user.route';
import admin from './admin.route'
import config from './../../config/config';

const router = express.Router();


/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});

/** History Router */
router.use('/history', history);
router.use('/user', user);
router.use('/admin', admin);

export default router;
