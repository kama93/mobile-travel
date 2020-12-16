import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ImageBackground } from 'react-native';
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
    borderWidth: 1.5,
    width: 250,
    margin: 10,
    borderRadius: 5,
    fontSize: 20,
    fontFamily: 'Architects Daughter Regular'
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'relative',
    top: 0,
    left: 0
  },
});

const Flight = () => {
  const [value, onChangeText] = React.useState();
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


  // const { to, from } = route.params;
  return (
    <View>
      <ImageBackground source={require('./image/plane-background.jpg')} resizeMode='cover' style={styles.image}
        imageStyle={{ opacity: 0.8 }}
      >
        <View style={styles.inputBackground}>
          <TextInput
            style={styles.inputStyle}
            placeholder="From (city)"
            onChangeText={text => onChangeText(text)}
            value={value}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="To (city)"
            onChangeText={text => onChangeText2(text)}
            value={value2}
          />
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