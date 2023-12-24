import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Test from '../Screens/Test/Test';
import Home from '../Screens/AppScreens/Home/Home';
import NavigationStrings from '../constants/NavigationStrings';
import Test1 from '../Screens/Test/Test1';




const Tab = createMaterialBottomTabNavigator();


const BottomTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="blue"
            inactiveColor="#3e2465"
            screenOptions={{
                headerShown: false,
            }}
            barStyle={{ backgroundColor: '#FFF', elevation: 4, }}
        >
            <Tab.Screen name={NavigationStrings.HOME} component={Home}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarColor: 'blue',

                    tabBarIcon: ({ color, focused }) => (
                        // <View style={{ backgroundColor: 'red',}}>

                        <MaterialCommunityIcons name="plus-circle" size={26} color={focused ? 'blue' : null} />
                        // </View>
                    ),
                }}
            />
            {/* <Tab.Screen name={NavigationStrings.TEST} component={Test}
                options={{
                    tabBarLabel: 'Test',
                    tabBarColor: 'blue',

                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ flex: 1, }}>

                            <MaterialCommunityIcons name="email" size={26} color={focused ? 'blue' : null} />
                        </View>
                    ),
                }}
            /> */}

            {/* <Tab.Screen name={NavigationStrings.TEST1} component={Test1}
                options={{
                    tabBarLabel: 'Testi',
                    tabBarColor: 'blue',

                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ flex: 1, }}>

                            <MaterialCommunityIcons name="email" size={26} color={focused ? 'blue' : null} />
                        </View>
                    ),
                }}
            /> */}

        </Tab.Navigator>
    )
}

export default BottomTab

const styles = StyleSheet.create({})