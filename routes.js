import express from 'express';
const route = express.Router();

import { homeIndex, homeSendEmail } from './src/controllers/homeController.js';
import { loginPage, searchAllUsers, loginUser} from './src/controllers/loginController.js';
import { registerPage, createUser } from './src/controllers/registerController.js';
import { profilePage, selectUser, updateUser, deleteUser } from './src/controllers/profileController.js';
import { logoutUser } from './src/controllers/logoutController.js';
import { ventPage, searchAllVents, createVent } from './src/controllers/ventController.js';

route.get('/', homeIndex);
route.post('/', homeSendEmail);

route.get('/register', registerPage);
route.post('/register', createUser);

route.get('/login', loginPage);
route.post('/login', loginUser);

route.get('/vent', ventPage);
route.get('/vents', searchAllVents);
route.post('/vent', createVent);

route.post('/logout', logoutUser);
route.get('/login/users', searchAllUsers);

route.get('/profile', profilePage);
route.post('/profile', selectUser)
route.put('/profile/update', updateUser);
route.delete('/profile/delete', deleteUser);

export default route;