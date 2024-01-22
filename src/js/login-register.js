const tabNavigation = () => {
   const tabLinks = [...document.querySelector('.tab-links').children];
   const contents = [...document.querySelector('.tab-content').children];
   const openTab = document.querySelector('[data-open]');

   const hideAllTabContent = () => {
      contents.forEach(section => {
         section.style.display = "none"
      })
   }

   const init = () => {
      hideAllTabContent();
   }

   return init();
}

tabNavigation();