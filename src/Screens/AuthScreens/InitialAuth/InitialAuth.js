import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, textScale } from '../../../styles/responsiveSize'
import ImagePath from '../../../constants/ImagePath'
import ButtonCompo from '../../../Components/ButtonCompo'
import { useNavigation } from '@react-navigation/native'
import Signup from '../Signup/Signup'
import Login from '../LogIn/Login'

const InitialAuth = () => {
  const navigation = useNavigation()


  return (
    <View style={[styles.container]}>
      <View style={[styles.top]}>

        <Text style={[styles.title]}>Loco</Text>
        <Text style={[styles.tagline]} numberOfLines={1}>Track your location in real-time with loco</Text>
      </View>

      <View style={[styles.middle]}>
        <Image
          source={ImagePath.location}
          resizeMode='contain'
          style={{ flex: 1 }}
        />
      </View>
      <View style={[styles.bottom]}>
        <ButtonCompo
          title={'Sign Up'}
          onPress={() => navigation.navigate(Signup)}
        />
        <View style={[styles.login]}>
          <Text>Already have an account? </Text>
          <TouchableOpacity style={{ color: 'blue' }} onPress={() => navigation.navigate(Login)}>
            <Text style={{color:'blue',fontWeight:'bold',alignSelf:'center'}}>Log In</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default InitialAuth

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(16)
  },
  top: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    gap:20
  },
  middle: {
    flex: 1,
    // backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200
  },
  bottom: {
    flex: 1,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: textScale(30)
  },
  tagline: {
    // fontWeight:'bold',
    fontSize:textScale(18)
  },
  login: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: moderateScale(10),
    gap:10,
    // alignSelf:'center'
  },

})