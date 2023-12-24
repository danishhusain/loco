// import { useEffect } from 'react';
// import Geolocation from '@react-native-community/geolocation';

// const getUserLocation = (onLocationChange) => {
//   // Set up the geolocation options (you can customize these)
//   const geolocationOptions = {
//     enableHighAccuracy: true,
//     timeout: 15000,
//     maximumAge: 10000,
//   };

//   // Start watching for the user's position
//   const watchId = Geolocation.watchPosition(
//     (position) => {
//       const { latitude, longitude } = position.coords;
//       onLocationChange({ latitude, longitude });
//     },
//     (error) => {
//       console.error('Error getting location:', error.message);
//     },
//     geolocationOptions
//   );

//   // Clean up the watcher when the component unmounts
//   useEffect(() => {
//     return () => {
//       Geolocation.clearWatch(watchId);
//     };
//   }, [watchId]);
// };

// export default getUserLocation;



// import { useEffect } from 'react';
// import Geolocation from '@react-native-community/geolocation';

// const getUserLocation = (onLocationChange) => {
//   const geolocationOptions = {
//     enableHighAccuracy: true,
//     timeout: 15000,
//     maximumAge: 10000,
//   };

//   const watchId = Geolocation.watchPosition(
//     (position) => {
//       const { latitude, longitude } = position.coords;
//       onLocationChange({ latitude, longitude });
//     },
//     (error) => {
//       console.error('Error getting location:', error.message);
//     },
//     geolocationOptions
//   );

//   useEffect(() => {
//     return () => {
//       Geolocation.clearWatch(watchId);
//     };
//   }, []); // Remove the dependency array

//   // Optionally, you may return the watchId if you need to access it outside this function
//   return watchId;
// };

// export default getUserLocation;



// import Geolocation from '@react-native-community/geolocation';

// const watchUserLocation = () => {
//   let watchId = Geolocation.watchPosition(
//     position => {
//       console.log(position);
//     },
//     error => {
//       console.log(error);
//     },
//     {
//       enableHighAccuracy: true,
//       timeout: 20000,
//       maximumAge: 1000,
//       distanceFilter: 10,
//     },
//   );

//   return () => {
//     if (watchId) {
//       Geolocation.clearWatch(watchId);
//       watchId = null;
//     }
//   };
// };

// export default watchUserLocation;



import React, { useEffect, useState } from 'react';
import LocationContext from '../context/LocationContext';
import watchUserLocation from './watchUserLocation';

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const stopWatching = watchUserLocation(
      position => {
        console.log('LocationProvider',position)
        setLocation(position);
      },
      error => {
        console.log(error);
      }
    );
    return () => {
      stopWatching();
    };
  }, []);

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
