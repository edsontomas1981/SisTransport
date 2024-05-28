import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error('TaskManager Error:', error);
    return;
  }
  if (data) {
    const { locations } = data;
    const location = locations[0];
    console.log('Location in background:', location);
    // Envie a localização para o servidor aqui
  }
});

export const startLocationUpdates = async () => {
  const { status } = await Location.requestBackgroundPermissionsAsync();
  if (status === 'granted') {
    try {
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
