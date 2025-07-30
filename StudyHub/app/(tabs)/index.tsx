import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
        📚 Welcome to StudyHub!
      </Text>

      <Link href="/study/notes">
        <Text style={{ color: 'blue', fontSize: 16, marginBottom: 10 }}>View Notes</Text>
      </Link>

      <Link href="/study/quiz">
        <Text style={{ color: 'blue', fontSize: 16, marginBottom: 10 }}>Take a Quiz</Text>
      </Link>

      <Link href="/study/planner">
        <Text style={{ color: 'blue', fontSize: 16, marginBottom: 10 }}>Study Planner</Text>
      </Link>
    </View>
  );
}
