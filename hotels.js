import 'react-native-gesture-handler';

import React, {useEffect, useRef, useState} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import {connect} from 'react-redux';

import {setCurrentDirection} from './redux/action';
import {setCurrentLocation} from './redux/action-location';
import {setCurrentTime} from './redux/action-time';

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
    margin: 80,
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
  },
});


const Hotels = ({currentDirection, setCurrentDirection}) => {
  const [city, setCity] = useState('');

  // useEffect(() => {
  //   if (currentDirection && currentLocation) {
  //     setEndPoint(currentDirection)
  //   }
  // }, [])

  const lookingForHotel = () => {
    fetch(
        `http://127.0.0.1:5000/hotel/${city}`,
        {method: 'get', headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(
            data =>
                // setLookingDataEnd(data)
            console.log(data))
  }

  const clean = () => {
    setEndPoint(null);
    setCountry('');
    setCity('')
  }

  return (
    <View>
      <ImageBackground source={require('./image/hotels.png')} resizeMode='cover' style={styles.image} imageStyle={{opacity: 0.8 }}>
        <View style={styles.inputBackground}>
        <View style={styles.containerList}>
            <TouchableOpacity style={styles.inputStyle}>
              <TextInput style={styles.itemText} placeholder="City" onChangeText={setCity}></TextInput>
            </TouchableOpacity>
        </View>
          <View style={{flexDirection: 'row', marginTop: 30 }}>
            <TouchableOpacity style={{ backgroundColor: '#3D6DCC', width: '50%', borderRadius: 7, marginRight: 10}} onPress={() => lookingForHotel()}>
              <Text style={{color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Check</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#3DCC6D', width: '50%', borderRadius: 7 }} onPress={() => clean()}>
              <Text style={{ color: 'white', textAlign: 'center', padding: 10,fontFamily: 'Architects Daughter Regular' }}>Clean</Text>
            </TouchableOpacity>
          </View>
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