const form= document.getElementById('form');
const inputNumeros = document.getElementById('numeros');
const resultado = document.getElementById('resultado');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const numeros = inputNumeros.ariaValueMax.split(',').map(Number);
    if (numeros.length !== 6) {
        alert('Ingrese exactamente 6 numeros');
        return;
    }
    const combinaciones = getCombinaciones(numeros);
    mostrarCombinaciones(combinaciones);
});

function getCombinaciones(numeros) {
    const combinaciones= [];
    const n = numeros.length;
    const k = 6;
    const indices = Array.from({length: k}, (_,i) => i);
    combinaciones.push(getCombinacion(numeros, indices));
    while(nextCombination(indices,n,k)){
    combinaciones.push(getCombinacion(numeros, indices));
        
    }
    return combinaciones;   
}

function getCombinacion(numeros, indices) {
    return indices.map((i)=> numeros[i]);
}

function nextCombination(indices, n, k) {
    let i = k-1;
    while (i>=0 && indices[i] === n-k + i) {
        i--;
    }
    if (i<0) return false;
    indices[i]++;
        
    
}