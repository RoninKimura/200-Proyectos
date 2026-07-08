const display=document.querySelector("#display");
const botones=document.querySelectorAll(".boton");

display.value="";

botones.forEach((btn) => {
  btn.addEventListener("click", ()=>{
    const valor=btn.getAttribute("value");

    if (valor === "=") {
      try{
        display.value=eval(display.value);
      }catch(error){
        display.value="ERROR";
      }
    }else if( btn.id === "CE"){
      display.value="";
    }else if (btn.id == "DE") {
      display.value =display.value.slice(0,-1);
    }else if(valor === "sqrt"){
      try{
        display.value= Math.sqrt(eval(display.value));
      }catch(error){
        display.value="EROR";
      }
    }
    else{
      if (display.value==="ERROR") {
        display.value="";
      }
      display.value += valor;
    }
  });
});

function hoverimg(){
  const imagens=document.querySelectorAll("img[data-hover]");

  imagens.forEach(img =>{
    const original=img.src;
    const hover=img.getAttribute("data-hover");

    img.addEventListener("mouseover", ()=> {
      img.src=hover;
    })

    img.addEventListener("mouseout", ()=> {
      img.src= original;
    })
  })
}

hoverimg();