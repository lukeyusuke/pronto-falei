const showMenuMobile = () => {
   const menuIcon = document.querySelector('.header-content__icon');
   const navMenu = document.querySelector('.header-content__nav');

   menuIcon.addEventListener('click', () => {
      navMenu.classList.toggle('active');
   })
}

const darkLightMode = () => {
   const moon = document.querySelector('.moon');

   moon.addEventListener('click', () => {
      document.body.classList.toggle("dark");
   })
}

showMenuMobile();
darkLightMode();
