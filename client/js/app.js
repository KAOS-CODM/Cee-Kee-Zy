const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if(menuButton && mobileMenu){

menuButton.addEventListener("click",()=>{

mobileMenu.classList.toggle("hidden");

});

}

const scrollButton=document.getElementById("scrollTop");

window.addEventListener("scroll",()=>{

if(!scrollButton)return;

if(window.scrollY>400){

scrollButton.classList.remove("hidden");

}else{

scrollButton.classList.add("hidden");

}

});

scrollButton?.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

