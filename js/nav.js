const navLink = document.getElementById("navbar");
const menuIcon = document.querySelector(".menu-icon i");
function showMenu() {
    navLink.classList.toggle('active')

    if (navLink.classList.contains('active')) {
        
        menuIcon.classList.remove('fa-bars')
        menuIcon.classList.add('fa-times') 
    } else {
        menuIcon.classList.remove('fa-times')
        menuIcon.classList.add('fa-bars')
        
    }
}

