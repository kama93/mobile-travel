import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ImageBackground } from 'react-native';
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
});

const Hotels = () => {

  return (
    <View>
      <ImageBackground source={require('./image/hotels.png')} resizeMode='cover' style={styles.image}
        imageStyle={{ opacity: 0.8 }}
      >
        
      </ImageBackground>
    </View>
  );
};



export default Hotels;