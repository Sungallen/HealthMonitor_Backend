import express from 'express';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.post('/addhistory', userCtrl.insertcondition);
export default router;
