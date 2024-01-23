import { showMenuMobile, darkLightMode } from "./functions.js"; 

const sendEmail = () => {
   const form = document.querySelector('.talk-us-content__form');
   const inputBox = document.querySelectorAll('.form__box__input-box');
   const errorMessage = document.querySelectorAll('.error-message');
   const successMessage = document.querySelector('.success-message');

   const submitForm = () => {
      form.addEventListener('submit', (e) => {
         e.preventDefault();
         const formData = new FormData(form);
      
         fetch('/', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(Object.fromEntries(formData))
         }).then(handleResponse)
         .catch((err) => {
            console.log(err);
         })
      })
   }

   const handleResponse = (response) => {
      const errorMessages = [...errorMessage.values()];
      const inputs = [...inputBox.values()];

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
      switch(data.error) {
         case 'Nome inválido':
            errorMessage[0].textContent = data.error;
            errorMessage[0].classList.add('active');
         break;
         case 'Email inválido':
            errorMessage[1].textContent = data.error;
            errorMessage[1].classList.add('active');
         break;
         case 'Digite sua mensagem':
            errorMessage[2].textContent = data.error;
            errorMessage[2].classList.add('active');
         break;
      } 
   };

   submitForm();
}

showMenuMobile();
darkLightMode();
sendEmail();