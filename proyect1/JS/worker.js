const { workerData, parentPort } = require("worker_threads");
const fs = require("fs");
const path = require("path");

if (!workerData || !workerData.numeros) {
    console.error(`❌ Error en Worker ${workerData?.id}: No se recibieron los datos correctamente.`);
    process.exit(1);
}
console.log("Ejemplo de combinación generada:", [...generarCombinaciones(workerData.numeros, 6)].slice(0, 5));

console.log(`🚀 Worker ${workerData.id} recibió los datos correctamente.`);

// 📌 Función para generar combinaciones sin usar generadores
function generarCombinaciones(arr, k) {
    const resultado = [];
    function backtrack(actual, inicio) {
        if (actual.length === k) {
            resultado.push([...actual]);
            return;
        }
        for (let i = inicio; i < arr.length; i++) {
            actual.push(arr[i]);
            backtrack(actual, i + 1);
            actual.pop();
        }
    }
    backtrack([], 0);
    return resultado;
}

// 📂 Crear carpeta `output` si no existe
const outputDir = path.join(__dirname, "output");

// 📌 Verifica si la carpeta ya existe antes de crearla
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const archivoPath = path.join(outputDir, `combinaciones_worker_${workerData.id}.txt`);

const iterador = generarCombinaciones(workerData.numeros, 6);
const archivo = fs.createWriteStream(archivoPath);

console.log(`📂 Guardando archivo en: ${archivoPath}`);

let contador = 0;

for (let combinacion of iterador) {
    archivo.write(combinacion.join(",") + "\n");
    contador++;
    if (contador % 500000 === 0) {
        console.log(`Worker ${workerData.id}: ${contador} combinaciones guardadas.`);
        parentPort.postMessage({ id: workerData.id, progreso: contador });
    }
}

// 🔥 **Forzamos la escritura y cierre del archivo antes de finalizar**
archivo.flush();
archivo.end(() => {
    console.log(`✅ Worker ${workerData.id} ha finalizado y guardado ${contador} combinaciones.`);
    parentPort.postMessage({ id: workerData.id, estado: "Finalizado", combinaciones: contador });
    setTimeout(() => process.exit(0), 3000); // 🚀 Esperamos 3 segundos antes de cerrar el proceso
});
