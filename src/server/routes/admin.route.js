import express from 'express';
import adminController from '../controllers/admin.controller';
import middleware from '../helper/middleware';

const router = express.Router();

router.route('/register')
    .post(adminController.register);

router.route('/login')
    .post(adminController.login);

router.get('/search/:adminID', middleware.verifyToken, adminController.searchalluser);


export default router;