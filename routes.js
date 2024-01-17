import express from 'express';
const route = express.Router();

import { homeIndex, homeSendEmail } from './src/controllers/homeController.js';

route.get('/', homeIndex);
route.post('/', homeSendEmail)
export default route;