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
import { useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
  from: {
    marginTop: 20
  },
  inputBackground: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    margin: 30,
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
  image: {
    height: '100%',
    width: '100%',
    position: 'relative',
    top: 0,
    left: 0
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
  inputAutocomplete: {
    fontFamily: 'Architects Daughter Regular',
    fontSize: 20,
    padding: 10,
  },
  containerList: {
    zIndex: 1000,
  },
});

const Flight = ({ currentDirection, currentLocation, setCurrentTime, setCurrentLocation, setCurrentDirection }) => {
  const [lookingDataStart, setLookingDataStart] = useState();
  const [lookingDataEnd, setLookingDataEnd] = useState();
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateFinal, setDateFinal] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [flight, setFlight] = useState(null)

  const navigation = useRef(useNavigation());

  useEffect(() => {
    if (currentDirection && currentLocation) {
      setStartPoint(currentLocation),
      setEndPoint(currentDirection)
    }
  }, [])

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || dateStart;
    setShowStart(Platform.OS === 'ios');
    setDateStart(currentDate);
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || dateFinal;
    setShowFinal(Platform.OS === 'ios');
    setDateFinal(currentDate);
  };

  const showModeStart = () => {
    setShowStart(!showStart);
  };

  const showModeFinal = () => {
    setShowFinal(!showFinal);
  };

  const lookingForCityStart = (text) => {
    if (text.length > 3) {
      console.log(text)
      fetch(`http://127.0.0.1:5000/auto/${text}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .then(data => setLookingDataStart(data))
    }
  }

  const lookingForCityEnd = (text) => {
    if (text.length > 3) {
      console.log(text)
      fetch(`http://127.0.0.1:5000/auto/${text}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .then(data => setLookingDataEnd(data))
    }
  }

  const lookingForFlight = () => {
    setCurrentTime({ 'start': dateStart, 'last': dateFinal })
    setCurrentDirection(endPoint.name)
    setCurrentLocation(startPoint.name)
    Promise.all([
      fetch(`http://127.0.0.1:5000/flight/${startPoint.code}/${endPoint.code}/${dateStart}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      }),
      fetch(`http://127.0.0.1:5000/flight/${endPoint.code}/${startPoint.code}/${dateFinal}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
    ])
      .then(function (responses) {
        return Promise.all(responses.map(function (response) {
          return response.json();
        }));
      })
      .then(data =>
        console.log(data)
      )
      setFlight(null);
      setCurrentLocation(null);
  }

  const clean = () => {
    setStartPoint(null);
    setEndPoint(null);
    setDateFinal(null);
    setDateStart(null);
    setLookingDataEnd();
    setLookingDataStart();
    setShowStart(false);
    setShowFinal(false);
    setCurrentTime(null)
    setCurrentLocation(null);
    setCurrentDirection(null);
    setFlight(null)
  }

  return (
    <View>
      <ImageBackground source={require('./image/plane-background.jpg')} resizeMode='cover' style={styles.image}
        imageStyle={{ opacity: 0.8 }}
      >
        {!flight ?
          <View style={styles.inputBackground}>
            {!startPoint ?
              (<View style={styles.containerList}>
                <Autocomplete
                  autoCapitalize="none"
                  autoCorrect={false}
                  containerStyle={styles.inputStyle}
                  style={styles.inputAutocomplete}
                  listStyle={styles.listStyle}
                  data={lookingDataStart}
                  onChangeText={text => lookingForCityStart(text)}
                  placeholder="From (city)"
                  renderItem={({ item, i }) => (
                    <TouchableOpacity onPress={() => setStartPoint({ 'code': item.iata_code, 'name': item.name, 'region': item.municipality })}>
                      <Text style={styles.itemText}>
                        {item.municipality} - {item.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                /></View>)
              :
              (<Text style={styles.textPicked}>
                Departure: {startPoint.name}  {startPoint.region}
              </Text>)}
            {!endPoint ?
              (<Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={styles.inputStyle}
                style={styles.inputAutocomplete}
                listStyle={styles.listStyle}
                data={lookingDataEnd}
                onChangeText={text => lookingForCityEnd(text)}
                placeholder="To (city)"
                renderItem={({ item, i }) => (
                  <TouchableOpacity onPress={() => setEndPoint({ 'code': item.iata_code, 'name': item.name, 'region': item.municipality })}>
                    <Text style={styles.itemText}>
                      {item.municipality} - {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />)
              :
              (<Text style={styles.textPicked}>
                Arrival: {endPoint.name}  {endPoint.region}
              </Text>)}
            <View style={styles.dateContainer}>
              <View style={styles.date}>
                <Button title="Start day!"
                  onPress={showModeStart}
                  titleStyle={{
                    color: "white",
                    fontSize: 16,
                    fontFamily: 'Architects Daughter Regular'
                  }}
                  buttonStyle={{
                    borderRadius: 60,
                    margin: 10,
                    padding: 5
                  }}
                />
              </View>
              {showStart && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateStart}
                  mode='date'
                  display="spinner"
                  onChange={onChange1}
                  style={{ backgroundColor: 'rgba(277, 277, 277, 0.9)' }}
                />
              )}
              <View style={styles.date2}>
                <Button title="Last day!"
                  onPress={showModeFinal}
                  titleStyle={{
                    color: "white",
                    fontSize: 16,
                    fontFamily: 'Architects Daughter Regular'
                  }}
                  buttonStyle={{
                    borderRadius: 60,
                    margin: 10,
                    padding: 5
                  }}
                />
              </View>
              {showFinal && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateFinal}
                  mode='date'
                  display="spinner"
                  onChange={onChange2}
                  style={{ backgroundColor: 'rgba(277, 277, 277, 0.9)' }}
                />
              )}
            </View>
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <TouchableOpacity style={{ backgroundColor: '#3D6DCC', width: '50%', borderRadius: 7, marginRight: 10 }} onPress={() => lookingForFlight()}>
                <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Check</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#3DCC6D', width: '50%', borderRadius: 7 }} onPress={() => clean()}>
                <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>CLean</Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <View>
          </View>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Flight);