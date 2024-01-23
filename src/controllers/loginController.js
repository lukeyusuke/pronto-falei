import Login from '../models/loginModel.js';

export const loginPage = (req, res) => {
   res.render('login');
}

export const searchAllUsers = (req, res) => {
   const login = new Login();

   login.listar()
      .then(users => res.json(users))
      .catch(err => console.log(err));
}

export const createUser = (req, res) => {;
   return 'Criando usuário'
}

export const updateUser = (req, res) => {
   const { id } = req.params;
   return `Atualizando o usuário ${id}`;
}

export const deleteUser = (req, res) => {
   const { id } = req.params;
   return `Deletando usuário ${id}`;
}