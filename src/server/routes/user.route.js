import express from 'express';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.post('/addhistory', userCtrl.insertcondition);

router.post('/modifyName', userCtrl.modifyName);

router.get('/Login', userCtrl.userLogin);

router.get('/pullAllDates', userCtrl.pullAllDates);

router.get('/pullalldata', userCtrl.pullalldata);

router.get('/:id', userCtrl.realtimedata);



export default router;
