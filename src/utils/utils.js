// import AsyncStorage from '@react-native-async-storage/async-storage';


// export const setValueLocaleDb = async (value) => {
//     try {
//         await AsyncStorage.setItem('my-key', value);
//     } catch (e) {
//         // saving error
//     }
// };


// export const getValueLocaleDb = async () => {
//     try {
//         const value = await AsyncStorage.getItem('my-key');
//         if (value !== null) {
//             // value previously stored
//         }
//     } catch (e) {
//         // error reading value
//     }
// };




// storageUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setValueLocaleDb = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error(`Error setting value for key ${key}:`, error);
    }
};

export const getValueLocaleDb = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value !== null ? value : null;
    } catch (error) {
        console.error(`Error getting value for key ${key}:`, error);
        return null;
    }
};

// Json
export const setJsonInLocaleDb = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error(`Error setting JSON value for key ${key}:`, error);
    }
};

export const getJsonFromLocaleDb = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error(`Error getting JSON value for key ${key}:`, error);
        return null;
    }
};
