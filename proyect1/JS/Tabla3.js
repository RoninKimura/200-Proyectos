document.addEventListener("DOMContentLoaded", () => {
    let contenedor = document.getElementById("numeros"); // Obtiene el contenedor de números
    for (let i = 1; i <= 28; i++) { // Crea números del 1 al 56
        let div = document.createElement("div"); // Crea un elemento `<div>` para cada número
        div.classList.add("numero"); // Le añade la clase "numero"
        div.textContent = i; // Asigna el número dentro del div
        div.onclick = () => div.classList.toggle("seleccionado"); // Hace que al hacer clic cambie de estado
        contenedor.appendChild(div); // Agrega el número al contenedor
    }
});



function calcularProbabilidad() {
    let seleccionados = document.querySelectorAll(".seleccionado");
    let cantidadSeleccionados = seleccionados.length;
    let mensajeError = document.getElementById("mensajeError");

    if (cantidadSeleccionados !== 5) { 
        mensajeError.style.display = "block"; // Mostramos el mensaje
        return; 
    }

    mensajeError.style.display = "none"; // Ocultamos el mensaje si está correcto
    let totalNumeros = 28;
    let combinacionesPosibles = factorial(totalNumeros) / (factorial(5) * factorial(totalNumeros - 5));
    let probabilidad = (1 / combinacionesPosibles) * 100;

        document.getElementById("resultado").textContent = `La combinaciones posibles: ${combinacionesPosibles.toFixed(10)}`;
}

function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1); // Calcula el factorial de un número recursivamente
}

$('.minimizar').bind('click', function() {
	$('.modal').addClass('hide');
  $('.mensaje').addClass('hide')
});

$('.resultado').bind('click', function() {
	$('.modal').removeClass('hide');
  $('.mensaje').removeClass('hide');
});