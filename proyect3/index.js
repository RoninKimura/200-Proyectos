const cards = document.querySelectorAll(".treat-card");

cards.forEach((crd) => {
  crd.addEventListener("click", (e) => {
    e.preventDefault(); // evita que el navegador siga el link automáticamente
    const link = crd.getAttribute("url");
    const target= crd.getAttribute("target")
    // console.log("Abrir:", link);
    window.location.href = link; // redirige manualmente
    // window.location.href=target;
  });
});

emailjs.init('WHLtrCpCE-TEfgdDL');

const btn = document.getElementById('button');
const form = document.getElementById('form');
const formMsg = document.getElementById('form-msg');
const nombre = document.getElementById('nombre');
const nombre = document.getElementById('email');
const nombre = document.getElementById('mensaje');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  btn.textContent = 'Enviando...';
  btn.disabled = true;

  const serviceID = 'service_u1srfbc';
  const templateID = 'template_c1pkv2f';

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.textContent = 'Enviado!';
      btn.disabled = false;
      btn.textContent = 'Enviar consulta';
      formMsg.style.display = 'block';
      nombre.textContent="";
      email.textContent="";
      mensaje.textContent="";
      // form.textContent="";
    },
    (err) => {
      btn.textContent = 'Enviar consulta';
      btn.disabled = false;
      alert('Hubo un problema al enviar tu consulta. Intenta de nuevo.');
      console.error(err);
    },
  );
});