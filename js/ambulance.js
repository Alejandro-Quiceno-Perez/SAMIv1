export function randomAmbulancia(ambulancias) {
    // Genera índice random entre las ambulancias existentes
    const indiceAleatorio = Math.floor(Math.random() * ambulancias.length);
  
    // Saco la ambulancia seleccionada por en índice
    const ambulanciaSeleccionada = ambulancias[indiceAleatorio];
    
    return ambulanciaSeleccionada;
};