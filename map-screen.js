import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
const Map = () => {
  // const navigation = useNavigation(); 
  const [coordinate, setCoordinate] = useState([]);
  const [myPosition, setMyPosition] = useState([]);
  const [from, setFrom] = useState('')

  Geolocation.getCurrentPosition(info => setMyPosition(info));

  useEffect(() => {
    Promise.all([
      fetch(`http://127.0.0.1:5000/geo/${coordinate.latitude}/${coordinate.longitude}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      }),
      fetch(`http://127.0.0.1:5000/geo/${myPosition.coords.latitude}/${myPosition.coords.longitude}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
    ])
      .then(function (responses) {
        return Promise.all(responses.map(function (response) {
          return response.json();
        }));
      }).then(function (data) {
        console.log(data);
      })
  }, [coordinate]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        onPress={(event) => setCoordinate(event.nativeEvent.coordinate)}
      >
      </MapView>
    </View >
  );
};

export default Map;
