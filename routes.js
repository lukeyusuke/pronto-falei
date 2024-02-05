import express from 'express';
const route = express.Router();

import { homeIndex, homeSendEmail } from './src/controllers/homeController.js';
import { loginPage, searchAllUsers, loginUser, createUser, updateUser, deleteUser } from './src/controllers/loginController.js';

route.get('/', homeIndex);
route.post('/', homeSendEmail);

route.get('/login', loginPage);
route.get('/login/users', searchAllUsers); // Listar todos os usuários
route.post('/register', createUser); // Criar novo usuário
route.post('/login', loginUser); // Fazer Login com o usuário
route.put('/login/:id', updateUser); // Atualizar o usuário
route.delete('/login/:id', deleteUser); // Deletar usuário

export default route;