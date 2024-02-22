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