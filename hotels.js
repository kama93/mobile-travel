import 'react-native-gesture-handler';

import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions, Linking } from 'react-native';
import { connect } from 'react-redux';

import { setCurrentDirection } from './redux/action';
import { setCurrentLocation } from './redux/action-location';
import { setCurrentTime } from './redux/action-time';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    position: 'relative',
    top: 0,
    left: 0
  },
  inputBackground: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    margin: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: '#B7BDC6',
    shadowOpacity: 1.0,
  },
  containerList: {
    zIndex: 1000,
  },
  inputStyle: {
    height: 50,
    borderColor: '#B7BDC6',
    borderWidth: 2,
    width: 350,
    marginBottom: 15,
    borderRadius: 10,
    marginTop: 80
  },
  itemText: {
    fontSize: 15,
    padding: 8,
    margin: 2,
    fontFamily: 'Architects Daughter Regular',
    textAlign: 'center'
  },
  hotelPhoto: {
    width: 130,
    height: 130,
    zIndex: 1000,
    padding: 10,
    marginBottom: 22,
    marginLeft: 10
  },
  hotelResultContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  hotelResultInfo: {
    marginLeft: 15,
  },
  hotelResultText: {
    fontFamily: 'Architects Daughter Regular',
    fontSize: 18,
  },
  hotelResultButton: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#E5ECF8",
    padding: 8,
    borderRadius: 3,
  },
  hotelResultButtonText: {
    fontFamily: 'Architects Daughter Regular',
  }
});


const Hotels = ({ currentDirection, setCurrentDirection }) => {
  const [city, setCity] = useState('');
  const [hotelInfo, setHotelInfo] = useState(null);

  // useEffect(() => {
  //   if (currentDirection && currentLocation) {
  //     setEndPoint(currentDirection)
  //   }
  // }, [])

  const lookingForHotel = () => {
    fetch(
      `http://127.0.0.1:5000/hotel/${city}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } })
      .then(response => response.json())
      .then(
        data => {
          setHotelInfo(data[0])
        })
  }

  const handlePress = (url) => {
    let fullUrl = `https://www.booking.com${url}`
    Linking.openURL(fullUrl);
  }

  const clean =
    () => {
      setHotelInfo(null);
      setCity(null);
    }

  return (
    <View>
      <ImageBackground source={require('./image/hotels.png')} resizeMode='cover' style={styles.image} imageStyle={{ opacity: 0.2 }}>
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
            (<ScrollView style={{ width: screenWidth }}>
              {hotelInfo.map((x) =>
                <View style={styles.hotelResultContainer}>
                  <Image style={styles.hotelPhoto} source={{ uri: x.thumbnail_image }} />
                  <View style={styles.hotelResultInfo}>
                    <Text style={styles.hotelResultText}>{x.name}</Text>
                    <Text style={styles.hotelResultText}>Minimum price: ‎£{x.price}</Text>
                    <Text style={styles.hotelResultText}>Score: {x.score}</Text>
                    <TouchableOpacity style={styles.hotelResultButton} onPress={() => handlePress(x.link)}>
                      <Text style={styles.hotelResultButtonText}>Check on booking.com</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
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