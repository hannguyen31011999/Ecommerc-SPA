// function openMenu(e) {
//     let menu = document.getElementsByClassName('sidebar__menu');
//     let item = document.getElementsByClassName('sidebar__item');
//     let icon = document.getElementsByClassName('fa-angle-right');
//     for (let i = 0; i < item.length; i++) {
//         if (item[i].classList.contains('active__item')) {
//             item[i].classList.remove('active__item');
//         }
//     }
//     for (let i = 0; i < menu.length; i++) {
//         if (menu[i].classList.contains('openMenu')) {
//             menu[i].classList.remove('openMenu');
//             icon[i].classList.remove('rotate');
//         } else {
//             e.children[2].classList.add('openMenu');
//             icon[i].classList.add('rotate');
//         }
//     }
// }

// function setActive(e) {
//     let menu = document.getElementsByClassName('sidebar__menu');
//     let item = document.getElementsByClassName('sidebar__item');
//     let icon = document.getElementsByClassName('fa-angle-right');
//     for (let i = 0; i < item.length; i++) {
//         if (item[i].classList.contains('active__item')) {
//             item[i].classList.remove('active__item');
//         }
//     }
//     for (let i = 0; i < menu.length; i++) {
//         if (menu[i].classList.contains('openMenu')) {
//             menu[i].classList.remove('openMenu');
//             icon[i].classList.remove('rotate');
//         }
//     }
//     e.classList.add('active__item');
// }

// document.getElementById('hide-sidebar').addEventListener('click', function (e) {
//     const sidebar = document.getElementById('sidebar');
//     const title = document.getElementsByClassName('sidebar__title');
//     const icon = document.getElementsByClassName('sidebar__icon');
//     const menu = document.getElementsByClassName('sidebar__menu');
//     const li = document.getElementsByClassName('sidebar__item');
//     if (this.getAttribute('collage')) {
//         for (let i = 0; i < title.length; i++) {
//             title[i].style.display = "block";
//         }
//         for (let i = 0; i < icon.length; i++) {
//             icon[i].style.width = "";
//             icon[i].style.display = "";
//             icon[i].style.justifyContent = "";
//         }
//         for (let index = 0; index < menu.length; index++) {
//             menu[index].classList.remove('menuResponsive');
//         }
//         for (let index = 0; index < li.length; index++) {
//             li[index].classList.remove('active__item--res')
//         }
//         sidebar.style.width = "";
//         this.children[0].style.transform = "rotate(0)";
//         this.removeAttribute('collage');
//     } else {
//         sidebar.style.width = "80px";
//         this.children[0].style.transform = "rotate(180deg)";
//         this.setAttribute('collage', true);
//         for (let i = 0; i < title.length; i++) {
//             title[i].style.display = "none";
//         }
//         for (let i = 0; i < icon.length; i++) {
//             icon[i].style.width = "100%";
//             icon[i].style.display = "flex";
//             icon[i].style.justifyContent = "center";
//         }
//         for (let index = 0; index < li.length; index++) {
//             if (li[index].classList.contains('dropdown')) {
//                 li[index].classList.add('active__item--res');
//             }
//         }
//         for (let index = 0; index < menu.length; index++) {
//             menu[index].classList.add('menuResponsive');
//         }
//     }
// });

// document.getElementById('openSeach').addEventListener('click', function (e) {
//     const form = document.getElementById('form-hidden');
//     if (form.classList.contains('form-active')) {
//         form.classList.remove('form-active');
//     } else {
//         form.classList.add('form-active');
//     }

// });