import { showMenuMobile, darkLightMode, showHidePassword } from "../components/js/screenFunctions/screenFunctions.js";

const checkUser = () => {
   const signinForm = document.querySelector('.sign-in__form');
   const inputSigninBox = document.querySelectorAll('.form__box__input-box');
   const errorMessage = document.querySelector('.error-message');

   const submitSignInForm = () => {
      signinForm.addEventListener('submit', (e) => {
         e.preventDefault();
         const formData = new FormData(signinForm);
   
         fetch('/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(Object.fromEntries(formData))
         }).then((handleResponse))
         .catch(err => console.log(err));
      })
   }

   const handleResponse = (response) => {
      const inputs = [...inputSigninBox.values()];

      if(response.status === 400){
         return response.json().then((data) => {
            errorMessage.textContent = data.error;
            errorMessage.classList.add('active');
         })
      } else {
         return response.json().then((data) => {
            const id_user = data.id_user;
            const email = data.email;
            window.location.href = "/vent?id_user=" + id_user + "&email=" + email;
            
            inputs.map((input) => {
               input.value = ' ';
            })
         })
      }
   }
   submitSignInForm();

}

const init = () => {
   showMenuMobile();
   darkLightMode();
   showHidePassword();
   checkUser()
}

init();
