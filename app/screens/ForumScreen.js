import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export default function ForumScreen() {
  const [question, setQuestion] = useState('');
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'forum'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(data.reverse()); // show newest first
  };

  const postQuestion = async () => {
    if (!question.trim()) return;
    await addDoc(collection(db, 'forum'), {
      text: question,
      user: auth.currentUser.email,
      createdAt: serverTimestamp()
    });
    setQuestion('');
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.heading}>💬 Student Forum</Text>
      <TextInput
        label="Ask a question..."
        value={question}
        onChangeText={setQuestion}
        mode="outlined"
      />
      <Button mode="contained" onPress={postQuestion} style={{ marginVertical: 10 }}>
        Post
      </Button>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.user}>{item.user}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { marginBottom: 20 },
  post: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  user: { fontWeight: 'bold' },
});
