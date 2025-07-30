import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Divider } from 'react-native-paper';
import { db, auth } from '../../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

export default function QuizCreateScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '' },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);
  };

  const handleChange = (i, field, value, optIndex = null) => {
    const updated = [...questions];
    if (field === 'options') {
      updated[i].options[optIndex] = value;
    } else {
      updated[i][field] = value;
    }
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    await addDoc(collection(db, 'quizzes'), {
      title,
      questions,
      createdBy: auth.currentUser.uid,
      createdAt: new Date().toISOString(),
    });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput label="Quiz Title" value={title} onChangeText={setTitle} style={styles.input} />
      {questions.map((q, i) => (
        <View key={i} style={styles.card}>
          <Text variant="titleMedium">Question {i + 1}</Text>
          <TextInput
            label="Question"
            value={q.question}
            onChangeText={(text) => handleChange(i, 'question', text)}
            style={styles.input}
          />
          {q.options.map((opt, j) => (
            <TextInput
              key={j}
              label={`Option ${j + 1}`}
              value={opt}
              onChangeText={(text) => handleChange(i, 'options', text, j)}
              style={styles.input}
            />
          ))}
          <TextInput
            label="Correct Answer"
            value={q.correctAnswer}
            onChangeText={(text) => handleChange(i, 'correctAnswer', text)}
            style={styles.input}
          />
          <Divider style={{ marginVertical: 10 }} />
        </View>
      ))}
      <Button onPress={handleAddQuestion}>+ Add Question</Button>
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>Save Quiz</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { marginBottom: 10 },
  card: { backgroundColor: '#f5f5f5', padding: 10, borderRadius: 8, marginBottom: 16 },
  button: { marginTop: 10 },
});
