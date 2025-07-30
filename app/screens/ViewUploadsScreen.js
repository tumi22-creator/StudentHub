import React, { useEffect, useState } from 'react';
import { View, FlatList, Linking, StyleSheet } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function ViewUploadsScreen() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUploads = async () => {
    const querySnapshot = await getDocs(collection(db, 'notes'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUploads(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.heading}>📥 Download Notes & Past Papers</Text>
      <FlatList
        data={uploads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Button onPress={() => Linking.openURL(item.url)} mode="outlined" style={{ marginTop: 5 }}>
              Download
            </Button>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { marginBottom: 20 },
  item: { marginBottom: 15, padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
});
