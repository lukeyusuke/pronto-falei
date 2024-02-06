import Login from '../models/loginModel.js';

export const loginPage = (req, res) => {
   res.render('login');
}

export const searchAllUsers = (req, res) => {
   const login = new Login();

   login.listUsers()
      .then((users) => res.json(users))
      .catch(err => console.log(err));
}

export const loginUser = (req, res) => {
   const login = new Login();

   const { signin_email, user_password_signin } = req.body;

   login.checkEmailPasswordExists(signin_email, user_password_signin)
      .then((data) => {
         console.log(data);
      })
}

export const updateUser = (req, res) => {
   const { id } = req.params;
   return `Atualizando o usuário ${id}`;
}

export const deleteUser = (req, res) => {
   const { id } = req.params;
   return `Deletando usuário ${id}`;
}