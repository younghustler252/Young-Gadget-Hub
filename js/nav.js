const navLink = document.getElementById("navbar");
const menuIcon = document.querySelector(".menu-icon i");
// const overlay = document.getElementById('overlay');


menuIcon.addEventListener('click', function () {
    navLink.classList.toggle("active");
    menuIcon.classList.toggle("fa-times");
    menuIcon.classList.toggle("fa-bars");
    // overlay.classList.toggle('active');
})

document.querySelectorAll('#navbar a').forEach(link => {
    link.addEventListener('click', () => {
      navLink.classList.remove('active');
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
    });
});
// overlay.addEventListener('click', function () {
//     navLink.classList.remove("active");
//     menuIcon.classList.remove("fa-times");
//     menuIcon.classList.add("fa-bars");
//     overlay.classList.remove('active');
    
// })