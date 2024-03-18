import bcrypt from 'bcrypt';
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

export const loginUser = async (req, res) => {
   const login = new Login();
   const { email, user_password } = req.body;
   
   let error;
   
   login.checkEmailPasswordExists(email)
      .then(async (data) => {
         const dataUser = data.shift();
         const password = dataUser.user_password;
         const match = await bcrypt.compare(user_password, password);

         if(!dataUser || !match){
            error = 'Usuário e/ou senha inválido';
            res.status(400).json({ error });
         } else {
            const id_user = dataUser.id_user;
            res.status(200).json({ id_user });
         }
      }).catch(err => console.log(err));   
}

export const updateUser = (req, res) => {
   const { id } = req.params;
   return `Atualizando o usuário ${id}`;
}

export const deleteUser = (req, res) => {
   const { id } = req.params;
   return `Deletando usuário ${id}`;
}