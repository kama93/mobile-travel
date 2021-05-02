import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setCurrentTime } from './redux/action-time';
import { setCurrentLocation } from './redux/action-location';
import { setCurrentDirection } from './redux/action';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    position: 'relative',
    top: 0,
    left: 0
  },
  from: {
    marginTop: 20
  },
  inputBackground: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    margin: 80,
    shadowOffset: { width: 10, height: 10, },
    shadowColor: 'grey',
    shadowOpacity: 1.0,
  },
  inputStyle: {
    height: 50,
    borderColor: 'grey',
    borderWidth: 0,
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
  textPicked: {
    fontSize: 20,
    fontFamily: 'Architects Daughter Regular',
    marginBottom: 25,
    color: "#696969"
  },
  textAfter: {
    fontSize: 19,
    fontFamily: 'Architects Daughter Regular',
    marginTop: 15,
    marginLeft:10,
    color: "#3D6DCC"
  },
  inputAutocomplete: {
    fontFamily: 'Architects Daughter Regular',
    fontSize: 20,
    padding: 10,
  },
  containerList: {
    zIndex: 1000,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Architects Daughter Regular',
    marginTop: 25,
    marginLeft:10,
    color: "#3D6DCC"
  },
  highlight: {
    color: "#3DCC6D"
  }
});


const Hotels = ({ currentDirection, currentLocation, setCurrentTime, setCurrentLocation, setCurrentDirection }) => {
  const [endPoint, setEndPoint] = useState(null);
  
  useEffect(() => {
    if (currentDirection && currentLocation) {
      setEndPoint(currentDirection)
    }
  }, [])
 
  const lookingForCityEnd = (text) => {
    if (text.length > 1) {
      fetch(`http://127.0.0.1:5000/auto/${text}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .then(data => 
          // setLookingDataEnd(data)
          console.log(data)
          )
    }
  }


  const clean = () => {
    setEndPoint(null)
  }

  return (
    <View>
      <ImageBackground source={require('./image/hotels.png')} resizeMode='cover' style={styles.image}
        imageStyle={{ opacity: 0.8 }}
      >
        <View style={styles.inputBackground}>
            {!endPoint ?
              (<TouchableOpacity 
                // onPress={() =>  }
                >
                    <Text style={styles.itemText}>
                    </Text>
              </TouchableOpacity>
              ):
              (<Text style={styles.textPicked}>
                Arrival: {endPoint.name}  {endPoint.region}
              </Text>)}
        <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <TouchableOpacity style={{ backgroundColor: '#3D6DCC', width: '50%', borderRadius: 7, marginRight: 10 }} onPress={() => lookingForFlight()}>
                <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Check</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#3DCC6D', width: '50%', borderRadius: 7 }} onPress={() => clean()}>
                <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Clean</Text>
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

const mapDispatchToProps = dispatch => {
  return {
    setCurrentTime: time => dispatch(setCurrentTime(time)),
    setCurrentLocation: location => dispatch(setCurrentLocation(location)),
    setCurrentDirection: direction => dispatch(setCurrentDirection(direction))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Hotels);