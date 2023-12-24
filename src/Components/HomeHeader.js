import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { moderateScale, scale, textScale } from '../styles/responsiveSize';
import { useNavigation } from '@react-navigation/native';
import ImagePath from '../constants/ImagePath';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../ReduxToolkit/features/authSlice';

const HomeHeader = () => {
  const navigation = useNavigation()
  const dispatch=useDispatch()

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <ScrollView style={styles.textContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
          <Text numberOfLines={1} style={styles.text}>LOCO</Text>
        </ScrollView>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <TouchableOpacity
          // onPress={() => onPressRight()}
          onPress={() => dispatch(logoutSuccess())}
          style={[{ height: moderateScale(35), width: moderateScale(35), alignSelf: 'center', }]}>
          <Image
            source={ImagePath.LogOut}
            style={{ height: '80%', width: '80%' }}
            resizeMode='center'
          />
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  container: {
    height: scale(50),
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    elevation: 8,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  textContainer: {
    marginLeft: scale(10),
  },
  text: {
    fontSize: textScale(18),
    color: '#000',
    fontWeight: 'bold'
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})
