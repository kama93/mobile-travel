import 'react-native-gesture-handler';

import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { setCurrentDirection } from './redux/action';
import { setCurrentLocation } from './redux/action-location';
import { setCurrentTime } from './redux/action-time';

const styles = StyleSheet.create({
  image: { height: '100%', width: '100%', position: 'relative', top: 0, left: 0 },
  inputBackground: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    margin: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: 'grey',
    shadowOpacity: 1.0,
  },
  containerList: {
    zIndex: 1000,
  },
  inputStyle: {
    height: 50,
    borderColor: 'grey',
    borderWidth: 2,
    width: 350,
    marginBottom: 15,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 15,
    padding: 8,
    margin: 2,
    fontFamily: 'Architects Daughter Regular',
    textAlign: 'center'
  },
  hotelPhoto: {
    width: 120,
    height: 120,
    zIndex: 1000,
    padding: 10,
    marginBottom: 22,
    marginLeft: -20
  },
});


const Hotels = ({ currentDirection, setCurrentDirection }) => {
  const [city, setCity] = useState('');
  const [hotelInfo, setHotelInfo] = useState(null);

  // useEffect(() => {
  //   if (currentDirection && currentLocation) {
  //     setEndPoint(currentDirection)
  //   }
  // }, [])

  const lookingForHotel =
    () => {
      fetch(
        `http://127.0.0.1:5000/hotel/${city}`,
        { method: 'get', headers: { 'Content-Type': 'application/json' } })
        .then(response => response.json())
        .then(
          data => {
            setHotelInfo(data[0])
          })
    }

  const clean =
    () => {
      setHotelInfo(null);
      setCity(null);
    }

  return (
    <View>
      <ImageBackground source={require('./image/hotels.png')} resizeMode='cover' style={styles.image} imageStyle={{ opacity: 0.8 }}>
        <View style={styles.inputBackground}>
          {!hotelInfo ?
            (<View>
              <View style={styles.containerList}>
                <TouchableOpacity style={styles.inputStyle}>
                  <TextInput style={styles.itemText} placeholder='City' onChangeText={setCity}>
                  </TextInput>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: '#3D6DCC', width: 270, borderRadius: 7, marginRight: 10 }} onPress={() => lookingForHotel()}>
                  <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Check</Text>
                </TouchableOpacity>
              </View>
            </View>) :
            (<ScrollView style={{ width:'100%', height:'100%' }}>
              {hotelInfo.map((x) =>
                <Image style={styles.hotelPhoto} source={{ uri: x.thumbnail_image }} />)}
              <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: '#3DCC6D', width: 270, borderRadius: 7 }} onPress={() => clean()}>
                  <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Clean</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>)}
        </View>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = state => ({
  currentLocation: state.location.currentLocation,
  currentDirection: state.direction.currentDirection
});

const mapDispatchToProps =
  dispatch => {
    return {
      setCurrentTime: time => dispatch(setCurrentTime(time)),
      setCurrentLocation: location =>
        dispatch(setCurrentLocation(location)),
      setCurrentDirection: direction =>
        dispatch(setCurrentDirection(direction))
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Hotels);