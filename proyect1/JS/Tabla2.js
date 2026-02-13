document.addEventListener("DOMContentLoaded", () => {
    let contenedor = document.getElementById("numeros");

    for (let i = 0; i <= 9; i++) { // Genera 10 filas
        let fila = document.createElement("div"); // Crea una fila
        fila.classList.add("fila"); // Agrega una clase para estilos

        for (let j = 0; j < 5; j++) { // 5 columnas por fila
            let div = document.createElement("div");
            div.classList.add("numero"); // Clase para diseño
            div.textContent = i; // Asigna el número actual
            div.onclick = () => div.classList.toggle("seleccionado"); // Hace que al hacer clic cambie de estado
            fila.appendChild(div); // Añade el número a la fila
        }

        contenedor.appendChild(fila); // Agrega la fila al contenedor
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
    let totalNumeros = 50;
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