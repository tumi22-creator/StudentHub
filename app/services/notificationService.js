import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for notifications!');
      return;
    }
  } else {
    alert('Must use physical device for notifications');
  }
}

export async function scheduleStudyNotification(title, dateTime) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '📚 Study Reminder',
      body: title,
    },
    trigger: dateTime,
  });
}
