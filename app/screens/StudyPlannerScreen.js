import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { registerForPushNotificationsAsync, scheduleStudyNotification } from '../services/notificationService';

export default function StudyPlannerScreen() {
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const handleSchedule = async () => {
    await scheduleStudyNotification(task, date);
    alert('Reminder scheduled!');
    setTask('');
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">📘 Add Study Task</Text>
      <TextInput
        label="Task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      <Button onPress={() => setShowPicker(true)} mode="outlined">
        Choose Date & Time
      </Button>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
      <Button mode="contained" onPress={handleSchedule} style={styles.button}>
        Set Reminder
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { marginBottom: 20 },
  button: { marginTop: 20 },
});
