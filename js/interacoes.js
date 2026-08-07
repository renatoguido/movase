//menu hamburger

function clickMenu(){

    console.log("cliquei")
    let itens = document.getElementById("itens");

    if(itens.style.display === "block" || itens.style.display === ""){
        itens.style.display = "none"
    } else{
        itens.style.display = "block"
    }
}


//carrossel
$(document).ready(function(){
    $('destaque').slick({
        dots:true,
        autoplay: true,
        autoplaySpeed:3000,
        arrows:false
    })
})