import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, ScrollView, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale, textScale } from '../../../styles/responsiveSize'
import ImagePath from '../../../constants/ImagePath'
import RoundImg from '../../../Components/RoundImg'
import TextInputWithLabel from '../../../Components/TextInputWithLabel'
import ButtonCompo from '../../../Components/ButtonCompo'
import { SignInMethod } from '../../../config/authApiMethods'
import { useDispatch } from 'react-redux'
import { captureImageFromCamera, pickImage } from '../../../Components/ImagePicker'
import { getJsonFromLocaleDb, setJsonInLocaleDb, } from '../../../utils/utils'
import { useNavigation } from '@react-navigation/native'
import Login from '../LogIn/Login'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const Signup = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [selectedImage, setSelectedImage] = useState(null);
  const [openGallery, setOpenGallery] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  var ImgUri = selectedImage?.assets[0]?.uri





  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });



  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));

  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const handleCreateAccount = async () => {
    // console.log('m',ImgUri)

    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.name) {
      handleError('Please input name', 'name');
      isValid = false;
    }

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    } else if (!inputs.email.includes("@gmail.com")) {
      handleError('Please input @gmail.com', 'email');
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 8) {
      handleError('Min password length of 8', 'password');
      isValid = false;
    }

    if (!inputs.age) {
      handleError('Please input email', 'age');
      isValid = false;
    }

    const retrievedUserObject = await getJsonFromLocaleDb('user');
    const userObject = inputs
    userObject.profile_picture = retrievedUserObject;
    if (isValid) {
      const res = await dispatch(SignInMethod(inputs))
      if (res === "Account with given email already exists") {

        null
      } else {
        navigation.navigate(Login)

      }
    }

  }







  ////new
  const handlePickImage = async () => {
    if (openGallery) {
      const resp = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
      });

      if (resp.didCancel) {
        console.log('User cancelled image picker');
      } else if (resp.error) {
        console.error('ImagePicker Error: ', resp.error);
      } else {
        setSelectedImage(resp);
        setOpenGallery(false);

        const userObject = {
          uri: `${resp?.assets[0]?.uri}`,
          type: `${resp?.assets[0]?.type}`,
          name: `${resp?.assets[0]?.fileName}`,
        };

        setJsonInLocaleDb('user', userObject);
      }
    }

    setOpenGallery(false);
  };

  const handlePickImageCamera = async () => {
    if (openCamera) {
      const resp = await launchCamera({
        mediaType: 'photo',
        includeBase64: false,
        saveToPhotos: true,
      });

      if (resp.didCancel) {
        console.log('User cancelled image capture');
      } else if (resp.error) {
        console.error('ImagePicker Error: ', resp.error);
      } else {
        setSelectedImage(resp);
        setOpenCamera(false);

        const userObject = {
          uri: `${resp?.assets[0]?.uri}`,
          type: `${resp?.assets[0]?.type}`,
          name: `${resp?.assets[0]?.fileName}`,
        };
        // console.log("camera",resp)

        setJsonInLocaleDb('user', userObject);
      }
    }

    setOpenCamera(false);
  };

  useEffect(() => {
    handlePickImage();
  }, [openGallery]);

  useEffect(() => {
    handlePickImageCamera();
  }, [openCamera]);

  const openGalleryHandler = () => {
    setOpenGallery(true);
  };

  const openCameraHandler = () => {
    setOpenCamera(true);
  };


  return (
    <View style={[styles.container]}>

      <View style={[styles.top]}>
        <ImageBackground source={ImagePath.bike} resizeMode='cover' style={styles.image}>
        </ImageBackground>
      </View>

      <View style={[styles.bottom]}>
        <View style={[{ margin: moderateScale(16), overflow: 'hidden', flex: 1, }]}>
          <Text style={[styles.title]}>Signup</Text>

          {/* Profile picture */}
          <View style={[styles.profile]}>
            <View>
              <RoundImg
                img={ImgUri}
              />

            </View>
            <View>
              <Text style={[styles.title, { fontSize: textScale(16), marginLeft: moderateScale(25), margin: 10 }]}>Signup</Text>
              <View style={styles.rowContainer}>
                <TouchableOpacity style={styles.button} onPress={() => openGalleryHandler()}>
                  <Text style={styles.buttonText}>Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => openCameraHandler()} >
                  <Text style={styles.buttonText}>Camera</Text>
                </TouchableOpacity>

              </View>


            </View>

          </View>

          {/* TextInputs */}
          <ScrollView contentContainerStyle={[styles.textInput, {}]}

            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          >
            <TextInputWithLabel
              placeholder={'Name'}
              onChangeText={text => handleOnchange(text, 'name')}
              onFocus={() => handleError(null, 'name')}
              iconName="account-outline"
              error={errors.name}
            />
            <TextInputWithLabel
              placeholder={'Email'}
              onChangeText={text => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              iconName="account-outline"
              error={errors.email}
              keyboardType={'email-address'}
            />
            <TextInputWithLabel
              placeholder={'Password'}
              onChangeText={text => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              iconName="account-outline"
              error={errors.password}
              password

            />
            <TextInputWithLabel
              placeholder={'Age'}
              onChangeText={text => handleOnchange(text, 'age')}
              onFocus={() => handleError(null, 'age')}
              iconName="account-outline"
              error={errors.age}
              maxLength={2}
              keyboardType={'numeric'}
            />
            <ButtonCompo
              title={'Create Account '}
              style={{ width: '90%', marginTop: moderateScale(20) }}
              onPress={() => handleCreateAccount()}

            />
          </ScrollView>
        </View>
      </View>

    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: moderateScale(16)
  },
  top: {
    flex: 1 / 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: -moderateScale(30)
  },
  middle: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200
  },
  bottom: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  image: {
    flex: 1,
    // backgroundColor: 'red',
    width: '100%'

  },
  title: {
    fontWeight: 'bold',
    fontSize: textScale(24)
  },
  profile: {
    // backgroundColor: 'red',
    flexDirection: "row",
    // justifyContent:'center'
    alignItems: 'center',
    marginTop: moderateScale(20),
    borderBottomWidth: 2

  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: 'grey',
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    width: moderateScale(121)
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  textInput: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: moderateScale(4),

  }
})