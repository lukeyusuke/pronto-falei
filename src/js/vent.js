import { darkLightMode } from "../components/js/screenFunctions/screenFunctions.js";

const showDropdownMenu = () => {
    const userPhoto = document.querySelector('.menu-box__profile');

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
    const menuLinks = [...document.querySelector('.menu-links').children];

    const homeContents = [...document.querySelector('.tab-content').children]; 
    const menuContents = [...document.querySelector('.menu-content').children];
    
    const openTab = document.querySelector('[data-open]');
    const unlockedTab = document.querySelector('[data-unlocked]')

    const hideAllTabContent = () => {
        menuContents.forEach(section => {
            section.style.display = "none";
        })

        homeContents.forEach(section => {
            section.style.display = "none";
        })
    }
 
    const removeAllActiveClass = () => {
        menuLinks.forEach(tab => {
            tab.className = tab.className.replace(" active", "")
        })

        tabLinks.forEach(tab => {
            tab.className = tab.className.replace(" active", "")
        })
    }
 
    const showCurrentTab = (id) => {
       const tabContent = document.querySelector('#' + id);

        if(tabContent.id === 'home'){
            openTab.click();
        } else  if(tabContent.id === 'recently'){
            document.querySelector('#home').style.display = "block";
        } else if (tabContent.id === 'others'){
            document.querySelector('#home').style.display = "block";
        }

        tabContent.style.display = "block";
    }
 
    const selectTab = (e) => {
       hideAllTabContent();
       removeAllActiveClass();
 
       const target = e.currentTarget;
       showCurrentTab(target.dataset.id);

       /* só está sendo selecionado o nosso último alvo, logo, nossa home sempre
        ficará com valor none  */
 
       target.className += " active"
    }
 
    const listenChanges = () => {
        menuLinks.forEach(tab => {
            tab.addEventListener('click', selectTab)
        })

        tabLinks.forEach(tab => {
            tab.addEventListener('click', selectTab)
        })

    }

    const init = () => {
        hideAllTabContent();
        listenChanges();
  
        unlockedTab.click();
    }
  
    return init();
}

showDropdownMenu();
showSidebarMenu();
TabNavigation();
darkLightMode();