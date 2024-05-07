import { darkLightMode } from "../components/js/screenFunctions/screenFunctions.js";
import { showDropdownMenu, showSidebarMenu, tabNavigation, logout } from "../components/js/screenFunctions/screenFunctions.js";

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
        // console.log(data);
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

const init = () => {
    showDropdownMenu();
    showSidebarMenu();
    tabNavigation();
    darkLightMode();
    quill();
    logout();
    createVent();
}

init();