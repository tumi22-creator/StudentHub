import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { storage } from '../../firebase/config';  // Adjust path if needed
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

export default function NotesScreen() {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const notesRef = ref(storage, 'notes/');
      const res = await listAll(notesRef);
      const fileUrls = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        })
      );
      setFiles(fileUrls);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const pickAndUploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        const response = await fetch(result.uri);
        const blob = await response.blob();

        const fileRef = ref(storage, `notes/${result.name}`);
        await uploadBytes(fileRef, blob);

        alert('File uploaded successfully!');
        fetchFiles();
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Upload a File" onPress={pickAndUploadFile} />

      <Text style={styles.title}>Uploaded Notes:</Text>

      <FlatList
        data={files}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
            <Text style={styles.fileName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No files uploaded yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { marginTop: 20, fontSize: 18, fontWeight: 'bold' },
  fileName: { color: 'blue', marginVertical: 5 },
});
