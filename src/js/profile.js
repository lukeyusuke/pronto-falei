import { showDropdownMenu, showSidebarMenu, showHidePassword, logout } from "../components/js/screenFunctions/screenFunctions.js";

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

const updateUser = () => {
    const updateForm = document.querySelector('.profile-form');

    const submitUpdateForm = () => {
        updateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(updateForm);

            fetch('/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            }).then(response => response.json().then((data) => {
                console.log(data)
            }))
        })
    }

    submitUpdateForm();
}

const deleteUser = () => {
    const deleteButton = document.querySelector('.btn-delete');

    deleteButton.addEventListener('click', () => {
        fetch('/profile/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
        }).then(response => response.json().then(() => {
            window.location.href = "/"
        }))
    })
}

showDropdownMenu();
showSidebarMenu();
showHidePassword();
selectUser();
updateUser();
deleteUser();
logout();
