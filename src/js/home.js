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

const sendEmail = () => {
   const form = document.querySelector('.talk-us-content__form')

   form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
   
      fetch('/', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json;charset=UTF-8'
         },
         body: JSON.stringify(Object.fromEntries(formData))
      }).then((response) => {
         console.log(response);
      })
   })
}

showMenuMobile();
darkLightMode();
sendEmail();