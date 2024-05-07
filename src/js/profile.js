import { showDropdownMenu, showSidebarMenu, showHidePassword, logout } from "../components/js/screenFunctions/screenFunctions.js";

const deleteUser = () => {
    const deleteButton = document.querySelector('.btn-delete');

    deleteButton.addEventListener('click', () => {
        fetch('/profile/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
        }).then(response => response.json().then(() => {
            window.location.href = "/"
        }))
    })
}

const selectUser = () => {
    fetch('/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    }).then(response => response.json().then((data => showInputValues(data))))
    .catch(err => console.log(err));
}

const showInputValues = (data) => { 
    const nome = document.getElementById("username");
    nome.placeholder = data.dataUser.username;

    const email = document.getElementById("email");
    email.placeholder = data.dataUser.email;

    const tel = document.getElementById("tel");
    tel.placeholder = data.dataUser.tel;

    const genre = document.getElementById("genre");
    genre.selectedIndex = data.dataUser.genre;

    const handleDateBirthday = () => {
        const date = new Date(data.dataUser.dt_birth);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString();
    
        const formattedDate = `${month}/${day}/${year}`;
        const dtBirth = document.getElementById("dt_birth");
        dtBirth.placeholder = formattedDate;
    }

    const maskPassword = () => {
        const password = document.getElementById('user_password');
        const passwordValue = data.dataUser.user_password;
        const maskedPlaceholder = '*'.repeat(passwordValue.length);
        password.placeholder = maskedPlaceholder;
    }

    handleDateBirthday();
    maskPassword();
}


showDropdownMenu();
showSidebarMenu();
showHidePassword();
selectUser();
deleteUser();
logout();
