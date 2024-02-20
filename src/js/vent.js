import { darkLightMode } from "../components/js/screenFunctions/screenFunctions.js";

const showDropdownMenu = () => {
    const userPhoto = document.querySelector('.menu-box__profile');
    console.log(userPhoto);

    userPhoto.addEventListener('click', () => {
        document.querySelector('.dropdown-menu').classList.toggle('active');
    })
}

const showSidebarMenu = () => {
    const sidebarMenu = document.querySelector('.sidebar-content__menu');

    sidebarMenu.addEventListener('click', () => {
        document.querySelector('.all-content').classList.toggle('active');
    })
}

const TabNavigation = () => {
    const tabLinks = [...document.querySelector('.tabs-links').children];
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

showDropdownMenu();
showSidebarMenu();
TabNavigation();
darkLightMode();