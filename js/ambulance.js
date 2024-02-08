export function randomAmbulancia(ambulancias) {
    // Genera índice random entre las ambulancias existentes
    const indiceAleatorio = Math.floor(Math.random() * ambulancias.length);
  
    async function obtenerInfoJson (){

        const resonse = await fetch ("./db/ambulance.json")
        const data= await Response.json()
        console.log(data);
    }
    return ambulanciaSeleccionada;
};