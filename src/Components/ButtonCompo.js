import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { moderateScale, scale, textScale, width } from '../styles/responsiveSize';

const ButtonCompo = ({ title, onPress, style, bgColor, textStyle, disabled }) => {
  const theme = useTheme().colors;

  return (
    <TouchableOpacity
      style={[styles.TouchableOpacityStyle, style, {
        backgroundColor: disabled ? '#CCCCCC' : theme?.DarkOrangeBGButton
        
      }]}
      onPress={onPress}
    >
      <Text
        style={[styles.textStyle, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonCompo;

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    width: width / 1.1,
    alignItems: 'center',
    alignSelf: "center",
    justifyContent: 'center',
    borderRadius: scale(10),
    height: moderateScale(48),
    paddingHorizontal: moderateScale(8),
  }, textStyle: {
    color: '#FFF',
    fontSize: textScale(20),
    fontWeight: 'bold'
  }
});
