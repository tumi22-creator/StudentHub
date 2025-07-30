import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Text, TextInput, ActivityIndicator } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { auth, storage, db } from '../../firebase/config';
import FileItem from '../components/FileItem';

export default function UploadScreen() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !title) return;
    setLoading(true);
    try {
      const fileRef = ref(storage, `notes/${Date.now()}_${file.name}`);
      const response = await fetch(file.uri);
      const blob = await response.blob();
      await uploadBytes(fileRef, blob);
      const downloadURL = await getDownloadURL(fileRef);

      await addDoc(collection(db, 'files'), {
        title,
        downloadURL,
        uploadedBy: auth.currentUser.uid,
        uploadedAt: new Date().toISOString(),
      });

      setTitle('');
      setFile(null);
      fetchFiles();
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFiles = async () => {
    const snapshot = await getDocs(collection(db, 'files'));
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFiles(items);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput label="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <Button onPress={handlePickFile}>Choose File</Button>
      {file && <Text>Selected: {file.name}</Text>}
      <Button mode="contained" onPress={handleUpload} style={styles.button} loading={loading}>
        Upload
      </Button>
      <Text variant="titleMedium" style={{ marginTop: 20 }}>Available Notes & Papers:</Text>
      <FlatList
        data={files}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FileItem file={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: { marginBottom: 10 },
  button: { marginVertical: 10 },
});
