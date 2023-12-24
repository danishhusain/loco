import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoding from 'react-native-geocoding';

const Test = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    // Get current location
    Geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });

        // Perform reverse geocoding
        reverseGeocode(latitude, longitude);
      },
      (error) => {
        console.warn(error);
      }
    );
  }, []);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await Geocoding.from({
        latitude,
        longitude,
      });
      
      const address = response.results[0].formatted_address;
      setAddress(address);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View>
      {location && (
        <View>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
          {address && <Text>Address: {address}</Text>}
        </View>
      )}
    </View>
  );
};

export default Test;
