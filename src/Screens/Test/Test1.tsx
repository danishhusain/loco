// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Alert, Button } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';

// export default function Test1() {
//   const getCurrentPosition = () => {
//     Geolocation.getCurrentPosition(
//       (pos) => {
//         setPosition(JSON.stringify(pos));
//       },
//       (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
//       { enableHighAccuracy: true }
//     );
//   };

//   const [position, setPosition] = useState<string | null>(null);

//   console.log("getCurrentLocation",position)
//   return (
//     <View>
//       <Text>
//         <Text style={styles.title}>Current position: </Text>
//         {position}
//       </Text>
//       <Button title="Get Current Position" onPress={getCurrentPosition} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   title: {
//     fontWeight: '500',
//   },
// });


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const Test1 = () => {
  const [position, setPosition] = useState<string | null>(null);

  const getCurrentPosition = () => {
    
    // 
    Geolocation.getCurrentPosition(
      (pos) => {
        setPosition(JSON.stringify(pos.coords));
      },
      (error) => {
        Alert.alert('Error', 'Failed to get current position. Please check your location settings.');
        console.error('GetCurrentPosition Error:', error);
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    // Optionally, you can get the current position when the component mounts
    getCurrentPosition();
  }, []);

  // console.log("getCurrentLocation", position);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current position: </Text>
      <Text>{position}</Text>
      <Button title="Get Current Position" onPress={getCurrentPosition} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
  },
});

export default Test1;



