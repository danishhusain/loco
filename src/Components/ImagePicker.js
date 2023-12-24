
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

export const pickImage = async (setSelectedImage) => {
  try {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.error) {
      console.error('ImagePicker Error: ', result.error);
    } else {
      setSelectedImage(result);
      // Do anything else you need with the result here
    }
  } catch (error) {
    console.error('Error picking image:', error);
  }
};



export const captureImageFromCamera = async (setSelectedImage) => {
  try {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: false,
    });

    if (result.didCancel) {
      console.log('User cancelled image capture');
    } else if (result.error) {
      console.error('ImagePicker Error: ', result.error);
    } else {
      setSelectedImage(result);
      // Do anything else you need with the captured image here
    }
  } catch (error) {
    console.error('Error capturing image:', error);
  }
};