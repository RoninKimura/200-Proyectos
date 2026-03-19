const coords={x:0,y:0};
const cursors=document.querySelectorAll(".image");

cursors.forEach(function(cursor){
  cursor.x=0;
  cursor.y=0;
});

window.addEventListener("mousemove",function(e){
  coords.x=e.clientX;
  coords.y=e.clientY;
  animateCusors();
});

function animateCusors(){
  let x=coords.x;
  let y=coords.y;


  cursors.forEach(function(cursor,index){
    const dx=x-cursor.x;
    const dy=y-cursor.y;
    const angulo=Math.atan2(dy,dx);
    const grados=angulo*(180/Math.PI);

    cursor.style.left=x-25+"px";
    cursor.style.top=y+10+"px";

    cursor.style.transform="rotate("+grados+"deg)";

    cursor.x=x;
    cursor.y=y;

    const nextCursor=cursors[index+1]|| cursors[0];
    x+= (nextCursor.x-x)*0.8;
    y+= (nextCursor.y-y)*0.8; 

  });
  // requestAnimationFrame(animateCusors);
}

function angle(cx,cy,ex,ey) {
  const dx=ex-cx;
  const dy=ey-cy;
  const rad=Math.atan2(dy,dx);
  const deg=rad*180/Math.PI;
  return deg;
}

// animateCusors();