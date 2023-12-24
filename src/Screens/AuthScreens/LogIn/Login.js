import { StyleSheet, Text, View, ImageBackground, Keyboard, ScrollView } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale, textScale } from '../../../styles/responsiveSize'
import ImagePath from '../../../constants/ImagePath'
import TextInputWithLabel from '../../../Components/TextInputWithLabel'
import ButtonCompo from '../../../Components/ButtonCompo'
import { useDispatch } from 'react-redux';
import { LogInMethod } from '../../../config/authApiMethods';

const Login = () => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));

  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const handleLogInAccount = async () => {

    Keyboard.dismiss();
    let isValid = true;



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


    if (isValid) {
      dispatch(LogInMethod(inputs))
      // console.log(inputs)
    }

  }
  return (
    <View style={[styles.container]}>
      <View style={[styles.top]}>
        <ImageBackground source={ImagePath.car} resizeMode='contain' style={styles.image}>
        </ImageBackground>
      </View>
      <View style={[styles.bottom]}>
        <ScrollView contentContainerStyle={[styles.textInput, {}]}

          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.insideScrollView]}>
            <Text style={[styles.title]}>LogIn</Text>
            <MaterialCommunityIcons name="account-circle" size={36} />


          </View>

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

          <ButtonCompo
            title={'Log In '}
            style={{ width: '90%', marginTop: moderateScale(20) }}
            onPress={() => handleLogInAccount()}

          />
        </ScrollView>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  top: {
    flex: 1 / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -moderateScale(30),


  },
  middle: {
    flex: 1,
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
    // elevation:10

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,

  },
  insideScrollView: {
    flexDirection: 'row',
    padding: moderateScale(16),
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(4),
    marginTop: moderateScale(50)
  },
  title: {
    fontWeight: 'bold',
    fontSize: textScale(24)
  },
  login: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: moderateScale(10)
  },
  image: {
    flex: 1,
    // backgroundColor: 'red',
    width: '100%'

  },
  textInput: {
    flexGrow: 1,
    // marginTop: moderateScale(32)
    // top:moderateScale(32)
    // gap:10


  }

})