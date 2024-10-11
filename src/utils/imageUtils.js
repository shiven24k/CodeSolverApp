import * as FileSystem from 'expo-file-system';

export const getBase64Image = async (imageUri) => {
  try {
    const base64Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64Image;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
};

export const getImageMimeType = (imageUri) => {
  const extension = imageUri.split('.').pop().toLowerCase();
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    default:
      return 'image/jpeg'; // Default to JPEG if unknown
  }
};