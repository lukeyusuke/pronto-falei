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

showMenuMobile();
darkLightMode();
TabNavigation();