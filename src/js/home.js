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
   const inputBox = document.querySelectorAll('.input-box');
   const errorMessage = document.querySelectorAll('.error-message');
   const successMessage = document.querySelector('.success-message')

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
         const errorMessages = [...errorMessage.values()];
         const inputs = [...inputBox.values()];

         successMessage.classList.remove('active');
         errorMessages.map((error) => {
            error.classList.remove('active');
         })

         if(response.status === 400){
            return response.json().then((data) => {
               switch(data.error) {
                  case 'Nome inválido':
                     errorMessage[0].classList.add('active');
                  break;
                  case 'Email inválido':
                     errorMessage[1].classList.add('active');
                  break;
                  case 'Digite sua mensagem':
                     errorMessage[2].classList.add('active');
                  break;
               } 
            });
         } else {
            successMessage.classList.add('active');
            inputs.map((input) => {
               input.value = ' ';
            })
         }
      }).catch((err) => {
         console.log(err);
      })
   })
}

showMenuMobile();
darkLightMode();
sendEmail();