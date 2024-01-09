import express from 'express';
const route = express.Router();

import { homeIndex } from './src/controllers/homeController.js';

route.get('/', homeIndex);

export default route;