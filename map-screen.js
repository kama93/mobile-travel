import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

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
  btn: {
    flexDirection: 'row'
  }
});
const Map = () => {
  // const navigation = useNavigation(); 
  const [coordinate, setCoordinate] = useState({});
  const [myPosition, setMyPosition] = useState({});
  const [visibleModal, setVisibleModal] = useState(false);
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const [startPoint, setStartPoint] = useState('');

  Geolocation.getCurrentPosition(info => setMyPosition(info));

  useEffect(() => {
    if (myPosition.coords && myPosition.coords.latitude && coordinate.latitude) {
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
          setFrom([...data[1]]);
          setTo([...data[0]])
        })
    }
  }, [coordinate]);

  useEffect(() => {
    if (from[0]) {
      console.log(from)
      setVisibleModal(true)
    }
  }, [from])


  const closeModal = () => {
    setVisibleModal(false)
  }

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
      <Modal animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={() => closeModal()} onSwipeComplete={() => closeModal()} swipeDirection="right" isVisible={visibleModal} style={{ backgroundColor: 'white', maxHeight: Dimensions.get('window').height / 2, marginTop: 200, borderRadius: 7 }}>
        <View>
          <View>
          <Text style={{ color: '#3D6DCC', padding: 8, fontSize:20 }}>Choose starting airport</Text>
          {
            from.map(place =>
              <TouchableOpacity style={styles.btn} onPress={()=>{setStartPoint(place['iata_code'])}}>
                <Icon name="plane" size={15} color="black" />
                <Text style={{ color: 'black', padding: 8 }}>{place['iata_code']} - {place['name']}</Text>
              </TouchableOpacity>
            )
          }
          </View>
          <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text style={{ color: '#3D6DCC', padding: 8, fontSize:20 }}>Choose destination airport</Text>
          {
            to.map(place =>
              <TouchableOpacity style={styles.btn} onPress={()=>{setStartPoint(place['iata_code'])}}>
                <Icon name="plane" size={15} color="black" />
                <Text style={{ color: 'black', padding: 8 }}>{place['iata_code']} - {place['name']}</Text>
              </TouchableOpacity>
            )
          }
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', position: 'absolute', bottom: 0 }}>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity style={{ backgroundColor: '#3D6DCC', width: '50%', borderBottomLeftRadius: 7 }}>
              <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#3DCC6D', width: '50%', borderBottomRightRadius: 7 }} onPress={() => this.closeModal()}>
              <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>Look again</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
    </View >
  );
};

export default Map;
