import express from 'express';
const route = express.Router();

import { homeIndex, homeSendEmail } from './src/controllers/homeController.js';
import { loginPage, searchAllUsers, loginUser} from './src/controllers/loginController.js';
import { registerPage, createUser } from './src/controllers/registerController.js';
import { profilePage, selectUser, deleteUser } from './src/controllers/profileController.js';
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
route.post('/profile', selectUser);
route.post('/profile/delete', deleteUser);

// route.put('/login/:id', updateUser); // Atualizar o usuário
// route.delete('/login/:id', deleteUser); // Deletar usuário

export default route;