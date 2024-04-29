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
    const errorMessage = document.querySelectorAll('.error-message');
    const successMessage = document.querySelector('.success-message');

    const submitVentForm = () => {
        ventForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.querySelector('.title');
            const subtitle = document.querySelector('.subtitle');
            const main_text = document.querySelector('.ql-editor'); // se eu escrevo um pouco fora do ql-editor, ele já não pega o valor (consertar)
            
            const ventData = {
                title: title.textContent,
                subtitle: subtitle.textContent,
                main_text: main_text.textContent,
            }
            
            fetch('/vent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(ventData)
            }).then(response => handleResponse(response, title, subtitle, main_text))
            .catch(err => console.log(err))
        })
    }

    const handleResponse = (response, title, subtitle, main_text) => {
        const errorMessages = [...errorMessage.values()];
        
        successMessage.classList.remove('active');
        errorMessages.map((error) => {
            error.classList.remove('active');
        })

        if(response.status === 400){
            return response.json().then(handleErrorData); 
        } else {
            return response.json().then(data => addVent(data, title, subtitle, main_text));
        }
    }

    const addVent = (data, title, subtitle, main_text) => {
        const username = data.user.username;
        const tabRecently = document.querySelector('#recently');
    
        const link = document.createElement('a');
        const ventBox = document.createElement('div');
        const ventBoxHeader = document.createElement('header');
        const ventBoxProfile = document.createElement('div');
        const ventBoxProfileImg = document.createElement('img');
        const ventBoxTitle = document.createElement('div');
        const ventBoxParagraph = document.createElement('p');

        const ventBoxProfileP = document.createElement('p');
        ventBoxProfileP.innerText = username;

        const hrefAttribute = document.createAttribute('href');
        const srcAttribute = document.createAttribute('src');
    
        link.setAttributeNode(hrefAttribute);
        ventBoxProfileImg.setAttributeNode(srcAttribute);
        srcAttribute.value = '../../../assets/images/profile-photo.jpg';
        
        ventBox.classList.add('vent-box');
        ventBoxHeader.classList.add('vent-box__header');
        ventBoxProfile.classList.add('vent-box__header__profile');

        ventBoxTitle.classList.add('vent-box__title');
        ventBoxTitle.textContent = title.textContent;

        ventBoxParagraph.classList.add('vent-box__p');
        ventBoxParagraph.textContent = main_text.textContent;

        tabRecently.appendChild(link); 
        link.appendChild(ventBox);
        ventBox.appendChild(ventBoxHeader);
        ventBox.appendChild(ventBoxTitle);
        ventBox.appendChild(ventBoxParagraph);

        ventBoxHeader.appendChild(ventBoxProfile);
        ventBoxProfile.appendChild(ventBoxProfileImg);
        ventBoxProfile.appendChild(ventBoxProfileP)
        
        successMessage.classList.add('active');
        cleanDivs(title, subtitle, main_text);
    }

    const handleErrorData = (data) => {
        const errorMessages = ['Título inválido', 'Subtítulo inválido', 'Texto inválido'];

        errorMessages.filter((errorTextMessage, i) => {
            if(errorTextMessage === data.error){
                console.log(data.error)
                errorMessage[i].textContent = data.error;
                errorMessage[i].classList.add('active');
            }
         })
    }

    const cleanDivs = (title, subtitle, main_text) => {
        title.textContent = 'Coloque seu título aqui';
        subtitle.textContent = 'Coloque seu subtítulo aqui';
        main_text.textContent = 'Escrever...';
    }

    submitVentForm();
}

const logout = () => {
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

const init = () => {
    showDropdownMenu();
    showSidebarMenu();
    TabNavigation();
    darkLightMode();
    quill();
    logout();
    createVent();
}

init();