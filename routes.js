import express from 'express';
const route = express.Router();

import { homeIndex, homeSendEmail } from './src/controllers/homeController.js';
import { loginPage } from './src/controllers/loginController.js';

route.get('/', homeIndex);
route.post('/', homeSendEmail);

route.get('/login', loginPage);

export default route;