import bcrypt from 'bcrypt';
import Login from '../models/loginModel.js';
import Register from '../models/registerModel.js';
import { validateName, validateEmail, checkWhiteSpace, validatePhoneNumber } from '../components/js/regexFunctions/functions.js';

export const registerPage = (req, res) => {
   res.render('register');
}

export const createUser = async (req, res) => {
   const login = new Login();
   const register = new Register();
   
   const { username, email, user_password, tel, dt_birth, genre } = req.body;
   const hashPassword = await bcrypt.hash(user_password, 12);

   let error;

   login.checkEmailExists(email)
      .then((emailExists) => {
         let userEmail = emailExists.shift();

         login.checkPhoneNumberExists(tel)
            .then((phoneNumberExists) => {
               let userPhone = phoneNumberExists.shift();

               register.create(username, email, hashPassword, tel, dt_birth, genre)
                  .then(() => {
                     if(validateName(username) || (username.length <= 3) || (!checkWhiteSpace(username))){
                        error = 'Nome inválido';
                        res.status(400).json({ error });
               
                     } else if(!validateEmail(email)){
                        error = 'Email inválido'
                        res.status(400).json({ error });
      
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