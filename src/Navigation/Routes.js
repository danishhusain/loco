import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import colors from '../styles/colors';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const Routes = () => {
    const token = useSelector((state) => state?.authReducer?.user?.token)
    const theme = useColorScheme() === 'dark' ? colors.dark : colors.light;

    console.log("sa", token)
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                {
                    // token && token !== undefined ? <>{AppStack(Stack)}</>
                    token && token !== undefined ? <>{AppStack(Stack)}</>
                        : <>{AuthStack(Stack)}</>
                }
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default Routes

const styles = StyleSheet.create({})