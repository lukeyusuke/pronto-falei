export const showMenuMobile = () => {
   const menuIcon = document.querySelector('.header-content__icon');
   const navMenu = document.querySelector('.header-content__nav');

    menuIcon.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    })

    document.addEventListener('click', (e) => {
        const target = e.target;
 
        if(target !== menuIcon){
            navMenu.classList.remove('active');
        }
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

export const showDropdownMenu = () => {
   const userPhoto = document.querySelector('.menu-box__profile');
   const dropdownMenu = document.querySelector('.dropdown-menu');

    userPhoto.addEventListener('click', () => {
       dropdownMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
       const target = e.target;

       if(target !== userPhoto){
           dropdownMenu.classList.remove('active');
       }
    })
}

export const showSidebarMenu = () => {
   const sidebarMenu = document.querySelector('.sidebar-content__menu');

    sidebarMenu.addEventListener('click', () => {
        document.querySelector('.all-content').classList.toggle('active');
    })
}

export const tabNavigation = () => {
   const tabLinks = [...document.querySelector('.tabs-links').children];
   const menuLinks = [...document.querySelector('.menu-links').children];

   const homeContents = [...document.querySelector('.tab-content').children];
   const menuContents = [...document.querySelector('.menu-content').children];

   const openTab = document.querySelector('[data-open]');
   const unlockedTab = document.querySelector('[data-unlocked]')

    const hideAllTabContent = () => {
        homeContents.forEach(section => {
            section.style.display = "none";
        })

        menuContents.forEach(section => {
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
      const searchBox = document.querySelector('.menu-box__search');
      const home = document.querySelector('.menu-links__home');
      const vent = document.querySelector('.menu-links__vents');
      const profile = document.querySelector('.menu-links__profile');

        if(tabContent.id === 'home'){
           openTab.click();

        } else if(tabContent.id === 'recently' || tabContent.id === 'others'){
           document.querySelector('#home').style.display = "block";
           home.classList.add('active');
        }

        if(tabContent.id === 'vents'){
            searchBox.style.display = "none";
            home.classList.remove('active');

        } else if(tabContent.id === 'profile') {
            searchBox.style.display = "block";
            home.classList.remove('active');
        }

        tabContent.style.display = "block";

        const handleLinks = () => {
            const footerLinks = [...document.querySelector('.vent-footer-content__nav').children];
            const dropdownHomeLink = document.querySelector('.li-home');

            const dropdownVentLink = document.querySelectorAll('.li-vent');
            const dropdownVentsLink = [...dropdownVentLink.values()];

            const dropdownProfileLink = document.querySelectorAll('.li-profile');
            const dropdownProfilesLink = [...dropdownProfileLink.values()];

            const showHomeTab = () => {
                document.querySelector('#home').style.display = "block";
                document.querySelector('#vents').style.display = "none";
                document.querySelector('#profile').style.display = "none";
                home.classList.add('active');
                vent.classList.remove('active');
                profile.classList.remove('remove');
            }

            const showVentsTab = () => {
                document.querySelector('#home').style.display = "none";
                document.querySelector('#vents').style.display = "block";
                document.querySelector('#profile').style.display = "none";
                home.classList.remove('active');
                vent.classList.add('active');
                profile.classList.remove('active');
                searchBox.style.display = "none";
            }

            const showProfileTab = () => {
                document.querySelector('#home').style.display = "none";
                document.querySelector('#vents').style.display = "none";
                document.querySelector('#profile').style.display = "block";
                home.classList.remove('active');
                vent.classList.remove('active');
                profile.classList.add('active');
            }

            dropdownHomeLink.addEventListener('click', () => {
                showHomeTab();
            })

            dropdownVentsLink.map((ventLink) => {
                ventLink.addEventListener('click', () => {
                    showVentsTab()
                })
            })

            dropdownProfilesLink.map((profileLink) => {
                profileLink.addEventListener('click', () => {
                    showProfileTab()
                })
            })

            footerLinks.map((link) => {
                link.addEventListener('click', () => {
                    link.classList.contains('footer-link__home') ? showHomeTab() : showVentsTab();
                })
            })
       }

       handleLinks();
   }

    const selectTab = (e) => {
        hideAllTabContent();
        removeAllActiveClass();

        const target = e.currentTarget;
        showCurrentTab(target.dataset.id);

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

export const logout = () => {
   const logout = document.querySelector('.logout');
   logout.addEventListener('click', () => {
        fetch('/logout', {
           method: 'POST',
           credentials: 'same-origin'
        }).then((response) => {
            if(response.ok){
               window.location.href = '/login'
            } else {
               console.log('Não deu bom não');
            }
        })
    })
}