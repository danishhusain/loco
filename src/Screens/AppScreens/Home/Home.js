import { Image, StyleSheet, Text, View, FlatList, Button, PermissionsAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale, textScale } from '../../../styles/responsiveSize'
import HomeHeader from '../../../Components/HomeHeader'
import ImagePath from '../../../constants/ImagePath'
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { showMessage } from 'react-native-flash-message';
import { PostLocationMethod } from '../../../config/userApiMethods';
import { logoutSuccess } from '../../../ReduxToolkit/features/authSlice';

const ListItem = ({ icon, title, number }) => {
  return (
    <View style={styles.renderItemcontainer}>
      <View style={styles.iconContainer}>
        {/* <Icon name={icon} size={24} color="#333" /> */}
        <MaterialCommunityIcons name={icon} size={26} color='#333' />

        <Text style={styles.titlestyle}>{title}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.number}>{number}</Text>
      </View>
    </View>
  );
};

const Home = () => {
  const dispatch = useDispatch()
  const { age, email, image_url, name } = useSelector((state) => state?.authReducer?.user?.user)
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const data = [
    { icon: 'check-circle', title: 'Places Visited', number: 15 },
    { icon: 'clock-time-three', title: 'Hours Travelled', number: 42 },
    { icon: 'seal', title: 'Surveys Completed', number: 8 },
  ];



  useEffect(() => {
    dispatch(PostLocationMethod(location))
    // console.log("<>", location)
  }, [location])

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            dispatch(logoutSuccess())
            showMessage({
              message: 'Please allow Location permission',
              type: "info",
            });
            setError('Location permission denied');
            return;
          }
        }

        // Get current location
        const getCurrentLocation = () => {
          Geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              // setLocation({ latitude, longitude });
              setLocation(position);
              console.log(`Current location: lat=${latitude}, lon=${longitude}`);
            },
            (error) => {
              console.warn(error);
              setError(`Error getting current location: ${error.message}`);
            }
          );
        };

        // Continue watching current location
        const watchCurrentLocation = () => {
          const watchId = Geolocation.watchPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              console.log(`Watch location: lat=${latitude}, lon=${longitude}`);
              setLocation(position);

              // You can update the location state or perform other actions here
            },
            (error) => {
              console.warn(error);
              setError(`Error watching current location: ${error.message}`);
            }
          );

          // To stop watching location when the component unmounts or as needed
          return () => Geolocation.clearWatch(watchId);
        };

        getCurrentLocation();
        const watchId = watchCurrentLocation();

        // Clean up the watcher when the component unmounts
        return () => Geolocation.clearWatch(watchId);
      } catch (err) {
        setError(`Error: ${err.message || err}`);
      }
    };

    requestLocationPermission();
    // dispatch(PostLocationMethod(location))

  }, []);






  return (
    <>
      <HomeHeader
        userName={'Profile'}
      />
      <View style={[styles.container]}>

        {/* Top */}
        <View style={[styles.top]}>
          <View style={[styles.top, {}]}>


            <Image source={{ uri: image_url }} style={styles.profileImage} />

            <Text style={styles.userName}>{name}</Text>

            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons name={'map-marker'} size={22} color='#333' />
              <Text style={styles.userLocation}>Address</Text>
            </View>
          </View>

          <View style={[styles.emailStyle]}>
            <View style={[{ flex: 1, elevation: 4, backgroundColor: '#fff', borderRadius: 8, padding: moderateScale(10), justifyContent: 'center' }]}>

              <Text style={[styles.userName, { fontSize: textScale(18) }]}>Email:
                <Text style={[styles.userName, { fontSize: textScale(16), fontWeight: '600' }]}>   {email}</Text>
              </Text>
              <Text style={[styles.userName, { fontSize: textScale(18) }]}>Age:
                <Text style={[styles.userName, { fontSize: textScale(16), fontWeight: '600' }]}>      {age}</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom */}
        <View style={[styles.bottom]}>
          <Text style={{ fontWeight: 'bold', fontSize: textScale(18), marginHorizontal: moderateScale(16) }}>Genral Statistics</Text>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ListItem {...item} />}
          />
        </View>
      </View>
    </>

  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200
  },
  bottom: {
    flex: 0.8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userLocation: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'center',
    // backgroundColor: 'red',
    paddingHorizontal: 10
  },
  emailStyle: {
    elevation: 6,
    backgroundColor: '#fff',
    marginHorizontal: moderateScale(16),
    width: '90%',
    marginVertical: moderateScale(16),
    height: '30%',
    padding: moderateScale(10),
    borderRadius: 8
  },
  renderItemcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginVertical: 10,
    elevation: 2,
    marginHorizontal: moderateScale(16),
    borderRadius: 8,
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: moderateScale(16)
  },
  textContainer: {
    borderWidth: 0.8,
    width: moderateScale(50),
    alignSelf: 'center',
    marginHorizontal: moderateScale(16),
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: moderateScale(4),
    borderRadius: 8


  },
  number: {
    fontSize: 14,
    color: '#888',
    alignItems: 'center',
    textAlign: 'center'

  },
  listContainer: {
    gap: 10,
  },
  titlestyle: {
    fontWeight: '800',
    fontSize: textScale(14)
  }

})






