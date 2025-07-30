import React from 'react';
import { View, Linking, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

export default function FileItem({ file }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">{file.title}</Text>
        <Text variant="bodySmall">{new Date(file.uploadedAt).toLocaleString()}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => Linking.openURL(file.downloadURL)}>Download</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
  },
});
