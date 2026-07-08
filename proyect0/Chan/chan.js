const brazos= document.querySelectorAll(".brazo")
const cuerpo= document.getElementById("cuerpo")
const rekt= cuerpo.getBoundingClientRect()
const anchorX= rekt.left+ rekt.width;
const anchorY= rekt.top+ rekt.height;

document.addEventListener("mousemove",(e)=>{
  const mouseX = e.clientX;
  const mouseY = e.clientY;


  const angleDeg=angle(mouseX,mouseY,anchorX,anchorY);


  brazos.forEach(brazo =>{
    brazo.style.transform= "rotate("+90+angleDeg+"deg)";
  })

})

function angle(cx,cy,ex,ey) {
  const dy=ey-cy;
  const dx=ex-cx;
  const rad= Math.atan2(dy,dx);
  const deg= rad*180/Math.PI;
  return deg;
}