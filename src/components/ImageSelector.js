import React from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import colors from '../constants/colors';

export default function ImageSelector({ onImageSelected, onAnalyzePress }) {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Question Image" onPress={pickImage} />
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <Button title="Analyze Question" onPress={onAnalyzePress} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});