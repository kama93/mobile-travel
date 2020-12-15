import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {CheckBox} from '@react-native-community/checkbox ';
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
});
const Map = () => {
  // const navigation = useNavigation(); 
  const [coordinate, setCoordinate] = useState({});
  const [myPosition, setMyPosition] = useState({});
  const [visibleModal, setVisibleModal] = useState(false);
  const [radioButton, setRadioButton] = useState('false');
  const [from, setFrom] = useState('')

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
          console.log(data);
        })
      setVisibleModal(true)
    }
  }, [coordinate]);

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
      <Modal animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={() => closeModal()} onSwipeComplete={() => closeModal()} swipeDirection="right" isVisible={visibleModal} style={{ backgroundColor: 'white', maxHeight: Dimensions.get('window').height / 2, marginTop:200, borderRadius:7 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
        <CheckBox 
                title='value1'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={radioButton === 'value1'}
                onPress={setRadioButton('value1')}
                ></CheckBox>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', position: 'absolute', bottom: 0 }}>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity style={{ backgroundColor: '#3D6DCC', width: '50%', borderBottomLeftRadius:7 }}>
              <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#3DCC6D', width: '50%', borderBottomRightRadius:7 }} onPress={() => this.closeModal()}>
              <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>Look again</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
    </View >
  );
};

export default Map;
