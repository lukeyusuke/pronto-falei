import { showMenuMobile, darkLightMode } from "../components/js/screenFunctions/screenFunctions.js";

const createUser = () => {
   const signupForm = document.querySelector('.sign-up__form');
   const inputSignup = document.querySelectorAll('.form__box__input-box');
   const errorMessage = document.querySelectorAll('.error-message');
   const successMessage = document.querySelector('.success-message');

   const submitSignUpForm = () => {
      signupForm.addEventListener('submit', (e) => {
         e.preventDefault();
         const formData = new FormData(signupForm);

         fetch('/register', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(Object.fromEntries(formData))
         }).then(handleResponse)
         .catch(err => console.log(err));
      })
   }

   const handleResponse = (response) => {
      const errorMessages = [...errorMessage.values()];
      const inputs = [...inputSignup.values()];

      successMessage.classList.remove('active');
      errorMessages.map((error) => {
         error.classList.remove('active');
      })

      if(response.status === 400){
         return response.json().then(handleErrorData);
      } else {
         successMessage.classList.add('active');
         inputs.map((input) => {
            input.value = ' ';
         })
      }
   };
   
   const handleErrorData = (data) => {
      const errorMessages = ['Nome inválido', 'Email inválido', 'Este email já está em uso', 'Senha inválida', 'Telefone inválido', 'Este telefone já está em uso', 'Coloque sua data de nascimento!', 'Selecione um gênero!'];

      errorMessages.filter((errorTextMessage, i) => {
         if(errorTextMessage === data.error){
            errorMessage[i].textContent = data.error;
            errorMessage[i].classList.add('active');
         }
      })
   };

   submitSignUpForm();
}

const init = () => {
   showMenuMobile();
   darkLightMode();
   createUser();
}

init();