import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import ImageSelector from '../components/ImageSelector';
import ResultDisplay from '../components/ResultDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import { analyzeImage } from '../services/anthropicService';
import colors from '../constants/colors';

export default function HomeScreen() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageAnalysis = async (imageUri) => {
    setLoading(true);
    try {
      const analysisResult = await analyzeImage(imageUri);
      setResult(analysisResult);
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageSelector 
        onImageSelected={setImage}
        onAnalyzePress={() => handleImageAnalysis(image)}
      />
      {loading && <LoadingSpinner />}
      {result && <ResultDisplay result={result} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
});