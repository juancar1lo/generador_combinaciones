// Listeners para los botones
document.getElementById('generar').addEventListener('click', generarCombinaciones);
document.getElementById('borrar').addEventListener('click', borrarCampos);

function generarCombinaciones() {
    try {
        // Obtener los valores de los inputs
        const cantidad = parseInt(document.getElementById('cantidad').value); // Total de números
        const tamañoGrupo = parseInt(document.getElementById('tamaño').value); // Tamaño del grupo

        // Validaciones de entrada
        if (isNaN(cantidad) || cantidad < 1 || cantidad > 35) {
            throw new Error("La cantidad debe estar entre 1 y 35.");
        }
        if (isNaN(tamañoGrupo) || tamañoGrupo < 1 || tamañoGrupo > cantidad) {
            throw new Error("El tamaño del grupo debe estar entre 1 y " + cantidad + ".");
        }

        // Generar números del 1 al `cantidad`
        const numeros = Array.from({ length: cantidad }, (_, i) => i + 1);

        // Mezclar aleatoriamente el array de números
        shuffleArray(numeros);

        // Calcular la cantidad de grupos completos
        const gruposCompletos = Math.floor(cantidad / tamañoGrupo);
        const resto = cantidad % tamañoGrupo;

        const combinaciones = [];
        // Tomar los grupos completos
        for (let i = 0; i < gruposCompletos; i++) {
            combinaciones.push(numeros.slice(i * tamañoGrupo, (i + 1) * tamañoGrupo));
        }

        // Si quedan alumnos sin agrupar, formar un último grupo más pequeño
        if (resto > 0) {
            combinaciones.push(numeros.slice(gruposCompletos * tamañoGrupo));
        }

        // Mostrar combinaciones en el área de texto
        const resultado = document.getElementById('resultado');
        resultado.value = combinaciones.map(comb => `(${comb.join(', ')})`).join('\n');

    } catch (error) {
        alert(error.message);
    }
}

function borrarCampos() {
    // Limpiar los inputs y el área de resultados
    document.getElementById('cantidad').value = '';
    document.getElementById('tamaño').value = '';
    document.getElementById('resultado').value = '';
}

/**
 * Función para mezclar aleatoriamente un array usando el algoritmo Fisher-Yates.
 * @param {Array} array - El array a mezclar
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
