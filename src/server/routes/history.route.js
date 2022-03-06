import express from 'express';
import historyCtrl from '../controllers/history.controller';

const router = express.Router();

router.route('/:userId')
  .get(historyCtrl.userGet);

router.route('/')
  .get(historyCtrl.historyGet) /** 取得 Article 所有值組 */
  .post(historyCtrl.historyPost); /** 新增 Article 值組 */


export default router;
