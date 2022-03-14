import express from 'express';
import historyCtrl from '../controllers/history.controller';

const router = express.Router();

router.route('/:userId')
  .get(historyCtrl.userGet);

router.route('/')
  .get(historyCtrl.historyGet)
  .post(historyCtrl.historyPost);


export default router;
