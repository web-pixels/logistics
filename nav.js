document.addEventListener('DOMContentLoaded', function(){
    const hamburger = document.querySelector('.hamburger');
    const navbarMenu = document.querySelector('.navbar-menu');

    hamburger.addEventListener('click', function(){
        navbarMenu.classList.toggle('active')
    })

    document.addEventListener('click', function(e){
        const clickNav = e.target.closest('navMenu');
        if(clickNav && navbarMenu.classList.contains){
            navbarMenu.classList.remove('active');
        }
    })
    const NavLink = document.querySelectorAll('.navbarMenu a');
    NavLink.forEach(menus =>{
        menus.addEventListener('click', function(){
            navbarMenu.classList.remove('active');
        })
    })
})

let Openmodal= document.querySelector('.register-modal');
let modal= document.querySelector('.modal');
let inputfield= document.querySelectorAll('.input-field');
let close = document.querySelector('.close');
let regBtn = document.querySelector('.summit-btn');

Openmodal.onclick = function(){
    modal.style.display = 'block'
};

close.onclick = function(){
    modal.style.display= "none"
    style.cursor= "pointer"
}

window.onclick = function(event){
    if (event.target === modal){
        modal.style.display = "none";
    }
}

let LogOpenModal = document.querySelector('.LoginOpenModal');
let loginModal = document.querySelector('.LoginModal');
let LoginCloseModal = document.querySelector('.LoginCloseModal');

LogOpenModal.onclick = function(){
    
 loginModal.style.display = 'block'
}

LoginCloseModal.onclick = function(){
    loginModal.style.display = 'none'

}

window.onclick = function(e){
  if(e.target == loginModal){
    loginModal.style.display = 'none'
 }
}


let navbarMenu = document.querySelector('.navbar-menu');
let menuUl = document.querySelector('.menu-ul');
let menuClose = document.querySelector('.menu-close');

menuClose.onclick = function(){
navbarMenu.style.display = 'none';
};

window.onclick = function(s){
    if(s.target == navbarMenu){
        navbarMenu.style.display = 'none'
    }
};