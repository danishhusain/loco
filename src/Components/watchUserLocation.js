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




import Geolocation from '@react-native-community/geolocation';

const watchUserLocation = (onSuccess, onError) => {
  // Get the current position once.
  Geolocation.getCurrentPosition(onSuccess, onError);

  // Then start watching the position.
  let watchId = Geolocation.watchPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 1000,
    // timeout: 20000,
    maximumAge: 1000,
    // distanceFilter: 10,
  });

  console.log(watchId)
  return () => {
    if (watchId) {
      Geolocation.clearWatch(watchId);
      watchId = null;
    }
  };
};

export default watchUserLocation;
