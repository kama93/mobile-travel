import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  inputBackground: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 10, height: 10, },
    shadowColor: 'rgba(46, 49, 49, 1)',
    shadowOpacity: 1.0,
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'relative',
    top: 0,
    left: 0
  },
});


const Attractions = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const navigation = useRef(useNavigation());

  
  return (
    <View>
      <ImageBackground source={require('./image/atractionsIn.jpg')} resizeMode='cover' style={styles.image} imageStyle={{ opacity: 0.5 }}>
      <View style={styles.inputBackground}>
        <View style={styles.containerList}>
            <TouchableOpacity style={styles.inputStyle}>
              <TextInput style={styles.itemText} placeholder="Country" onChangeText={setCountry}></TextInput>
            </TouchableOpacity>
        </View>
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



export default Attractions;