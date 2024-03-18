export const showMenuMobile = () => {
   const menuIcon = document.querySelector('.header-content__icon');
   const navMenu = document.querySelector('.header-content__nav');

   menuIcon.addEventListener('click', () => {
      navMenu.classList.toggle('active');
   })
};

export const darkLightMode = () => {
   const changeBg = document.querySelector('.change-bg');

   changeBg.addEventListener('click', () => {
      document.body.classList.toggle("dark");
   })
};

export const showHidePassword = () => {
   const passwordInput = document.getElementById('user_password');
   const eyeIcon = document.querySelector('.eye-icon');

   eyeIcon.addEventListener('click', () => {
      if(passwordInput.type === 'password'){
         passwordInput.type = 'text';
      } else {
         passwordInput.type = 'password';
      }
   })
}