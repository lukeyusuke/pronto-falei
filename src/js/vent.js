import { darkLightMode } from "../components/js/screenFunctions/screenFunctions.js";

const showDropdownMenu = () => {
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
       const searchBox = document.querySelector('.menu-box__search');
       const home = document.querySelector('.menu-links__home');
       const vent = document.querySelector('.menu-links__vents');

        if(tabContent.id === 'home'){
            openTab.click();

        } else if(tabContent.id === 'recently' || tabContent.id === 'others'){
            document.querySelector('#home').style.display = "block";
            home.classList.add('active');
        }

        if(tabContent.id === 'vents'){
            searchBox.style.display = "none"
            home.classList.remove('active');
        } else {
            searchBox.style.display = "block";
        }

        tabContent.style.display = "block";

        const handleLinks = () => {
            const footerLinks = [...document.querySelector('.vent-footer-content__nav').children];
            const ventHeaderLink = document.querySelector('.dropdown-menu__list-item');

            const showHomeTab = () => {
                document.querySelector('#home').style.display = "block";
                document.querySelector('#vents').style.display = "none";
                home.classList.add('active');
                vent.classList.remove('active');
            }

            const showVentsTab = () => {
                document.querySelector('#home').style.display = "none";
                document.querySelector('#vents').style.display = "block";
                home.classList.remove('active');
                vent.classList.add('active');
                searchBox.style.display = "none";
            }

            ventHeaderLink.addEventListener('click', () => {
                showVentsTab();
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

const quill = () => new Quill('.main-text', {
    theme: 'snow',
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            [{ 'color': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'check' }],
            [{ 'align': [] }],
            ['image', 'link'],
            ['clean']
        ]
    }
});

const createVent = () => {
    const ventForm = document.querySelector('.vents-form');

    const submitVentForm = () => {
        ventForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.querySelector('.text-header__title').textContent;
            const subtitle = document.querySelector('.text-header__subtitle').textContent;
            const main_text = document.querySelector('.ql-editor').textContent;
            
            
            const ventData = {
                title: title,
                subtitle: subtitle,
                main_text: main_text,
            }
            
            fetch('/vent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(ventData)
            }).then(response => response.json())
            .then(() => {
                const tabRecently = document.querySelector('#recently');

                const link = document.createElement('a');
                const ventBox = document.createElement('div');
                const ventBoxHeader = document.createElement('header');
                const ventBoxProfile = document.createElement('div');
                const ventBoxProfileImg = document.createElement('img');
                const ventBoxProfileP = document.createElement('p');
                const ventBoxTitle = document.createElement('div');
                const ventBoxParagraph = document.createElement('p');

                const hrefAttribute = document.createAttribute('href');
                const srcAttribute = document.createAttribute('src');

                link.setAttributeNode(hrefAttribute);
                ventBoxProfileImg.setAttributeNode(srcAttribute);
                srcAttribute.value = '../../../assets/images/profile-photo.jpg';
                
                ventBox.classList.add('vent-box');
                ventBoxHeader.classList.add('vent-box__header');
                ventBoxProfile.classList.add('vent-box__header__profile');

                ventBoxTitle.classList.add('vent-box__title');
                ventBoxTitle.innerText = title;

                ventBoxParagraph.classList.add('vent-box__p');
                ventBoxParagraph.innerText = main_text;

                tabRecently.appendChild(link); 
                link.appendChild(ventBox);
                ventBox.appendChild(ventBoxHeader);
                ventBox.appendChild(ventBoxTitle);
                ventBox.appendChild(ventBoxParagraph);

                ventBoxHeader.appendChild(ventBoxProfile);
                ventBoxProfile.appendChild(ventBoxProfileImg);
                ventBoxProfile.appendChild(ventBoxProfileP)


                
                console.log('O relato foi cadastrado com sucesso...')
            })
            .catch(err => console.log(err));
        })
    }

    submitVentForm();
}

showDropdownMenu();
showSidebarMenu();
TabNavigation();
darkLightMode();
quill();
createVent();