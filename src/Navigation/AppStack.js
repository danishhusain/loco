import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomTab from './BottomTab'
import NavigationStrings from '../constants/NavigationStrings'

const AppStack = (Stack) => {
  return (
    <>
      <Stack.Screen
        name={NavigationStrings.BOTTOM_TAB}
        component={BottomTab}
      />

    </>
  )
}

export default AppStack

const styles = StyleSheet.create({})