import { showMenuMobile, darkLightMode } from "../components/js/screenFunctions/screenFunctions.js";

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
      const errorMessages = ['Nome inválido', 'Email inválido', 'Digite sua mensagem'];

      errorMessages.filter((errorTextMessage, i) => {
         if(errorTextMessage === data.error){
            errorMessage[i].textContent = data.error;
            errorMessage[i].classList.add('active');
         }
      })
   };

   submitForm();
}

showMenuMobile();
darkLightMode();
sendEmail();