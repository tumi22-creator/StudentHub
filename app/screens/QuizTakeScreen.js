import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, RadioButton } from 'react-native-paper';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export default function QuizTakeScreen() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  const loadQuizzes = async () => {
    const snapshot = await getDocs(collection(db, 'quizzes'));
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setQuizzes(list);
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const handleAnswer = (qIndex, answer) => {
    const updated = [...answers];
    updated[qIndex] = answer;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    let sc = 0;
    selectedQuiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) sc++;
    });
    setScore(sc);
  };

  if (!selectedQuiz) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge">Choose a Quiz</Text>
        {quizzes.map(q => (
          <Button key={q.id} onPress={() => { setSelectedQuiz(q); setAnswers([]); setScore(null); }} style={styles.button}>
            {q.title}
          </Button>
        ))}
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge">{selectedQuiz.title}</Text>
      {selectedQuiz.questions.map((q, i) => (
        <View key={i} style={styles.card}>
          <Text>{i + 1}. {q.question}</Text>
          <RadioButton.Group onValueChange={val => handleAnswer(i, val)} value={answers[i]}>
            {q.options.map((opt, j) => (
              <RadioButton.Item key={j} label={opt} value={opt} />
            ))}
          </RadioButton.Group>
        </View>
      ))}
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>Submit Quiz</Button>
      {score !== null && (
        <Text variant="titleMedium" style={{ marginTop: 10 }}>
          You scored {score}/{selectedQuiz.questions.length}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { backgroundColor: '#f9f9f9', padding: 10, borderRadius: 6, marginBottom: 16 },
  button: { marginVertical: 8 },
});
