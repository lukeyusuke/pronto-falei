const showSidebarMenu = () => {
    const sidebarMenu = document.querySelector('.sidebar-content__menu');

    sidebarMenu.addEventListener('click', () => {
        document.querySelector('.sidebar-content').classList.toggle('active');
    })
}

showSidebarMenu();