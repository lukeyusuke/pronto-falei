import Login from '../models/loginModel.js';
import { validateName, validateEmail, checkWhiteSpace, validatePhoneNumber } from '../components/formFunctions/functions.js';

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

export const createUser = (req, res) => {
   const login = new Login();

   const { username, signup_email, user_password, tel, dt_birth, genre }  = req.body;
   let error;

   login.checkEmailExists(signup_email)
      .then((emailExists) => {
         console.log(emailExists);
         let userEmail = emailExists.shift();

         login.checkPhoneNumberExists(tel)
            .then((phoneNumberExists) => {
               let userPhone = phoneNumberExists.shift(); 

               login.create(username, signup_email, user_password, tel, dt_birth, genre)
                  .then(() => {
                     if(validateName(username) || (username.length <= 3) || (!checkWhiteSpace(username))){
                        error = 'Nome inválido';
                        res.status(400).json({ error });
                        console.log(error);
               
                     } else if(!validateEmail(signup_email)){
                        error = 'Email inválido'
                        res.status(400).json({ error });
                        console.log(error);
      
                     } else if(userEmail){
                        error = 'Este email já está em uso';
                        res.status(400).json({ error });
            
                     } else if(user_password.length <= 3 || user_password.length > 40){
                        error = 'Senha inválida';
                        res.status(400).json({ error });
            
                     } else if(!validatePhoneNumber(tel) || tel.length < 15){
                        error = 'Telefone inválido';
                        res.status(400).json({ error });

                     } else if(userPhone){
                        error = 'Este telefone já está em uso';
                        res.status(400).json({ error });
            
                     } else if(dt_birth === '') {
                        error = 'Coloque sua data de nascimento!';
                        res.status(400).json({ error })
            
                     } else if (genre === '') {
                        error = 'Selecione um gênero!';
                        res.status(400).json({ error })
            
                     } else {
                        let success = 'Cadastro feito com sucesso!!'
                        res.status(200).json({ success });
                     }
                  })
                  .catch(err => console.log(err));
               }
            )
      }).catch((err) => console.log(err));
   };

export const updateUser = (req, res) => {
   const { id } = req.params;
   return `Atualizando o usuário ${id}`;
}

export const deleteUser = (req, res) => {
   const { id } = req.params;
   return `Deletando usuário ${id}`;
}