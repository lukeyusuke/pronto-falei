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
        document.querySelector('.sidebar-content').classList.toggle('active');
    })
}

showDropdownMenu();
showSidebarMenu();