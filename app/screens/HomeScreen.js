import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { auth } from '../../firebase/config';

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    await auth.signOut();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Welcome to StudyHub 📚</Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Upload')}
        style={styles.button}
      >
        Upload Notes & Papers
      </Button>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logout}
      >
        Logout
      </Button>

      <Button mode="contained" onPress={() => navigation.navigate('CreateQuiz')} style={styles.button}>
        Create a Quiz
        </Button>

        <Button mode="contained" onPress={() => navigation.navigate('TakeQuiz')} style={styles.button}>
        Take a Quiz
    </Button>

    <Button
  mode="contained"
  onPress={() => navigation.navigate('Planner')}
  style={styles.button}
>
  Study Planner
</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { marginTop: 20, width: '80%' },
  logout: { marginTop: 10, backgroundColor: 'red', width: '80%' },
});
