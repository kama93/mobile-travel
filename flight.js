import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';


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
    padding:8,
    margin: 2,
    fontFamily: 'Architects Daughter Regular',
  },
  textPicked:{
    fontSize: 20,
    fontFamily: 'Architects Daughter Regular',
    marginBottom: 25,
    color: "#696969"
  },
  inputAutocomplete:{
    fontFamily: 'Architects Daughter Regular',
    fontSize: 20,
    padding: 10,
  },
  containerList:{
    zIndex: 1000,
  },
});

const Flight = () => {
  const [lookingDataStart, setLookingDataStart] = useState();
  const [lookingDataEnd, setLookingDataEnd] = useState();
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [value2, onChangeText2] = React.useState();
  const [dateStart, setDateStart] = useState(new Date(1598051730000));
  const [dateFinal, setDateFinal] = useState(new Date(1598051730000));
  const [showStart, setShowStart] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

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

  return (
    <View>
      <ImageBackground source={require('./image/plane-background.jpg')} resizeMode='cover' style={styles.image}
        imageStyle={{ opacity: 0.8 }}
      >
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
              // defaultValue={lookingData}
              onChangeText={text => lookingForCityStart(text)}
              placeholder="From (city)"
              renderItem={({ item, i }) => (
                <TouchableOpacity onPress={() => setStartPoint({'code': item.iata_code, 'name': item.name, 'region': item.municipality})}>
                  <Text style={styles.itemText}>
                    {item.municipality} - {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            /></View>)
            :
            (<Text style={styles.textPicked}>
              Departure: {startPoint.name} - {startPoint.region}
            </Text>)}
            {!endPoint ?
            (<Autocomplete
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={styles.inputStyle}
              style={styles.inputAutocomplete}
              listStyle={styles.listStyle}
              data={lookingDataEnd}
              // defaultValue={lookingData}
              onChangeText={text => lookingForCityEnd(text)}
              placeholder="To (city)"
              renderItem={({ item, i }) => (
                <TouchableOpacity onPress={() => setEndPoint({'code': item.iata_code, 'name': item.name, 'region': item.municipality}) }>
                  <Text style={styles.itemText}>
                    {item.municipality} - {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />)
            :
            (<Text style={styles.textPicked}>
              Arrival: {endPoint.name} - {endPoint.region}
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
                  margin: 20,
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
                  margin: 20,
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
        </View>
      </ImageBackground>
    </View>
  );
};



export default Flight;