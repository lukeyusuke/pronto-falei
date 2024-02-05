import { showMenuMobile, darkLightMode } from "./functions.js";

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

const checkUser = () => {
   const signinForm = document.querySelector('.sign-in__form');
   const inputSigninBox = document.querySelectorAll('.input-sigin');

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
         }).then((data) => {
            console.log(data);
         })
      })
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
