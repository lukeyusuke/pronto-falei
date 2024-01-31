import { showMenuMobile, darkLightMode } from "./functions.js";

const TabNavigation = () => {
   const tabLinks = [...document.querySelector('.tab-links').children];
   const contents = [...document.querySelector('.tab-content').children]; 
   const openTab = document.querySelector('[data-open]');

   const hideAllTabContent = () => {
      contents.forEach(section => {
         section.style.display = "none";
      })
   }

   const removeAllActiveClass = () => {
      tabLinks.forEach(tab => {
         tab.className = tab.className.replace(" active", "");
      })
   }

   const showCurrentTab = (id) => {
      const tabContent = document.querySelector('#' + id);
      tabContent.style.display = "block";
   }

   const selectTab = (e) => {
      hideAllTabContent();
      removeAllActiveClass();

      const target = e.currentTarget;
      showCurrentTab(target.dataset.id);

      target.className += " active"
   }

   const listenChanges = () => {
      tabLinks.forEach(tab => {
         tab.addEventListener('click', selectTab);
      })
   }
   
   const init = () => {
      hideAllTabContent();
      listenChanges();

      openTab.click();
   }

   return init();
}

const showHidePassword = () => {
   const passwordInput = document.getElementById('senha'); 
   const eyeIcon = document.querySelector('.eye-icon');

   eyeIcon.addEventListener('click', () => {
      if(passwordInput.type === 'password'){
         passwordInput.type = 'text';
      } else {
         passwordInput.type = 'password';
      }
   })
}

const createUser = () => {
   const form = document.querySelector('.talk-us-content__form');
   const inputBox = document.querySelectorAll('.form__box__input-box');
   const errorMessage = document.querySelectorAll('.error-message');
   const successMessage = document.querySelector('.success-message');

   const signupForm = document.querySelector('.sign-up__form');

   const submitForm = () => {
      signupForm.addEventListener('submit', (e) => {
         e.preventDefault();
         const formData = new FormData(signupForm);

         fetch('/login', {
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
      const errorMessages = ['Nome inválido', 'Email inválido', 'Este email já está em uso', 'Senha inválida', 'Telefone inválido', 'Este telefone já está em uso', 'Coloque sua data de nascimento!', 'Selecione um gênero!'];

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
TabNavigation();
showHidePassword();
createUser();