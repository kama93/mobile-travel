import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { setCurrentLocation } from './redux/action-location';
import { setCurrentDirection } from './redux/action';
import { useNavigation } from '@react-navigation/native';

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
  }
})

const Map = ( { setCurrentLocation, setCurrentDirection } ) => {

  const [coordinate, setCoordinate] = useState({});
  const [myPosition, setMyPosition] = useState({});
  const [visibleModal, setVisibleModal] = useState(false);
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  Geolocation.getCurrentPosition(info => setMyPosition(info));

  const navigation = useRef(useNavigation());

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
      setVisibleModal(true)
    }
  }, [from])


  const closeModal = () => {
    setVisibleModal(false);
    setCurrentLocation(setStartPoint(null));
    setCurrentDirection(setEndPoint(null));
  }

  const reduxAirports = () => {
    setVisibleModal(false);
    setCurrentLocation(startPoint)
    setCurrentDirection(endPoint)
    navigation.current.navigate("Flight");
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
      <Modal animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={() => closeModal()} swipeDirection="right" isVisible={visibleModal} style={{ backgroundColor: 'white', maxHeight: Dimensions.get('window').height / 2, marginTop: 200, borderRadius: 7 }}>
        <View>
          <View style={{ padding: 15, marginBottom: 10, marginLeft: 40, marginTop: 20 }}>
            {startPoint ?
              <View style={{ padding: 15, marginBottom: 5 }}>
                <Text style={{ color: '#3D6DCC', padding: 5, fontSize: 25, fontFamily: 'Architects Daughter Regular' }}>Departure :</Text>
                <Text style={{ color: 'black', padding: 8, fontFamily: 'Architects Daughter Regular', fontSize: 20 }}>{startPoint['code']} - {startPoint['name']}</Text>
              </View> :
              <View>
                <Text style={{ color: '#3D6DCC', padding: 5, fontSize: 20, fontFamily: 'Architects Daughter Regular' }}>Choose starting airport</Text>
                {
                  from.map(place =>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setStartPoint({'code': place['iata_code'], 'name':place['name']}) }}>
                      <Icon name="plane" size={15} color="black" />
                      <Text style={{ color: 'black', padding: 8, fontFamily: 'Architects Daughter Regular', fontSize: 12 }}>{place['iata_code']} - {place['name']}</Text>
                    </TouchableOpacity>
                  )
                }
              </View>}
          </View>
          <View style={{ padding: 15, marginBottom: 60, marginLeft: 40 }}>
          {endPoint ?
              <View style={{ padding: 15, marginBottom: 60 }}>
                <Text style={{ color: '#3D6DCC', padding: 5, fontSize: 25, fontFamily: 'Architects Daughter Regular' }}>Arrival :</Text>
                <Text style={{ color: 'black', padding: 8, fontFamily: 'Architects Daughter Regular', fontSize: 20 }}>{endPoint['code']} - {endPoint['name']}</Text>
              </View> :
              <View>
            <Text style={{ color: '#3D6DCC', padding: 5, fontSize: 20, fontFamily: 'Architects Daughter Regular' }}>Choose destination airport</Text>
            {
              to.map(place =>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setEndPoint({'code': place['iata_code'], 'name':place['name']}) }}>
                  <Icon name="plane" size={15} color="black" />
                  <Text style={{ color: 'black', padding: 8, fontFamily: 'Architects Daughter Regular', fontSize: 12 }}>{place['iata_code']} - {place['name']}</Text>
                </TouchableOpacity>
              )
            }
            </View>}
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', position: 'absolute', bottom: 0 }}>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity style={{ backgroundColor: '#3D6DCC', width: '50%', borderBottomLeftRadius: 7 }} onPress={() => reduxAirports()}>
              <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#3DCC6D', width: '50%', borderBottomRightRadius: 7 }} onPress={() => closeModal()}>
              <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Look again</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
    </View >
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentLocation: location => dispatch(setCurrentLocation(location)),
  setCurrentDirection: direction => dispatch(setCurrentDirection(direction))
})

export default connect(null, mapDispatchToProps)(Map);
