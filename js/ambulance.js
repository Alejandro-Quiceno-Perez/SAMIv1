export const randomAmbulancia = async (ambulances) => {
  try {
    const ambulance = await ambulances;

    // Genera índice random entre las ambulancias existentes
    const randomAmbulance = await ambulance[
      Math.floor(Math.random() * ambulance.length)
    ];

    return randomAmbulance;
  } catch (error) {
    console.log(error.message);
  }
};
