

// /////////////
// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
// import { moderateScale, moderateScaleVertical } from '../styles/responsiveSize';
// import colors from '../styles/colors';
// import fontFamily from '../styles/fontFamily';
// import commonStyles from '../styles/commonStyles';
// import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install the vector-icons library

// const TextInputWithLabel = (props) => {
//     const { value, placeholder, onChangeText, inputStyle, label, secureTextEntry } = props;
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//     const togglePasswordVisibility = () => {
//         setIsPasswordVisible(!isPasswordVisible);
//     };

//     return (
//         <View>
//             <Text style={styles.labelText}>{label} </Text>
//             <View style={styles.inputContainer}>
//                 <Icon
//                     name={'eye-off'}
//                     size={20}
//                     color={colors.black}
//                 />
//                 <TextInput
//                     placeholder={placeholder}
//                     style={{ ...styles.inputStyle, ...(inputStyle || {}) }}
//                     value={value}
//                     onChangeText={onChangeText}
//                     secureTextEntry={secureTextEntry && !isPasswordVisible}
//                 />
//                 {secureTextEntry && (
//                     <TouchableOpacity
//                         style={styles.iconContainer}
//                         onPress={togglePasswordVisibility}
//                     >
//                         <Icon
//                             name={isPasswordVisible ? 'eye-off' : 'eye'}
//                             size={20}
//                             color={colors.black}
//                         />
//                     </TouchableOpacity>
//                 )}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderColor: colors.blackOpacity20,
//         borderWidth: 1,
//         borderRadius: moderateScale(2),
//         height: moderateScale(40),
//     },
//     inputStyle: {
//         flex: 1,
//         fontSize: 14,
//         backgroundColor: colors.white,
//         paddingHorizontal: moderateScale(8),
//     },
//     labelText: {
//         fontSize: 20,
//         fontFamily: fontFamily.medium,
//         marginBottom: moderateScaleVertical(8),
//         textTransform: 'uppercase',
//     },
//     iconContainer: {
//         padding: moderateScale(8),
//     },
// });

// export default TextInputWithLabel;


import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';
import { moderateScale, scale, textScale } from '../styles/responsiveSize';


const TextInputWithLabel = ({
    value,
    label,
    placeholder,
    iconName,
    error,
    password,
    onChange,
    onChangeText,
    keyboardType,
    maxLength,
    textInputColor,
    editable,
    onFocus = () => { },
    ...props
}) => {
    const [hidePassword, setHidePassword] = React.useState(password);
    const [isFocused, setIsFocused] = React.useState(false);
    const colors = useTheme().colors

    return (
        <View style={{ marginBottom: moderateScale(16), justifyContent: 'center', alignItems: 'center', }}>
            {/* <Text style={style.label}>{label}</Text> */}
            <View
                style={[
                    style.inputContainer,
                    {
                        borderColor: error
                            ? colors.red
                            : isFocused
                                ? colors.darkBlue
                                : colors.darkBlue,
                        alignItems: 'center',
                        height: moderateScale(48),
                        // backgroundColor:'red'

                    },
                ]}>
                <Icon
                    name={iconName}
                    style={{ color: colors.darkBlue, fontSize: moderateScale(22), left: scale(5) }}
                />
                <TextInput
                    value={value}
                    onChange={onChange}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    // keyboardType=''
                    maxLength={maxLength}
                    editable={editable}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={hidePassword}
                    style={{ color: colors.darkBlue, flex: 1, left: scale(10), fontSize: textScale(18), backgroundColor: textInputColor, borderBottomRightRadius: scale(8), borderTopRightRadius: 8, }}
                    placeholderTextColor={'grey'}
                    {...props}
                />
                {password && (
                    <Icon
                        onPress={() => setHidePassword(!hidePassword)}
                        name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        style={{ color: colors.DarkOrangeBGButton, fontSize: textScale(22) }}
                    />
                )}
            </View>
            {error && (
                <View style={{
                    justifyContent: "flex-start", alignItems: 'flex-start', alignSelf: 'flex-start',
                    paddingHorizontal: moderateScale(20),
                }}>
                    <Text style={{ color: colors.red, fontSize: textScale(12) }}>
                        {error}
                    </Text>
                </View>


            )}
        </View>
    );
};

const style = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: textScale(14),
        // color: colors.red,
    },
    inputContainer: {
        // backgroundColor: colors.whiteOpacity70,
        flexDirection: 'row',
        borderWidth: 2,
        width: '90%',
        borderRadius: 8,
        paddingRight: scale(16)
    },
});

export default TextInputWithLabel;

