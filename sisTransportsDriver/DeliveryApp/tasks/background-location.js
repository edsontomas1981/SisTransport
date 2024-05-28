export const startLocationUpdates = async () => {
  console.log('Requesting background location permissions...');
  const { status } = await Location.requestBackgroundPermissionsAsync();
  console.log(`Permission status: ${status}`);
  if (status === 'granted') {
    try {
      console.log('Starting location updates...');
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        distanceInterval: 100, // Atualiza a cada 100 metros
        deferredUpdatesInterval: 60000, // Atualiza a cada 1 minuto
        foregroundService: {
          notificationTitle: 'Usando sua localização',
          notificationBody: 'Sua localização está sendo usada em segundo plano.',
        },
      });
      console.log('Location updates started');
    } catch (error) {
      console.error('Error starting location updates:', error);
    }
  } else {
    console.error('Permissão de localização não concedida');
  }
};
