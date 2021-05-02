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

  const navigation = useRef(useNavigation());

  
  return (
    <View>
      <ImageBackground source={require('./image/atractionsIn.jpg')} resizeMode='cover' style={styles.image}
        imageStyle={{ opacity: 0.5 }}
      >
        
      </ImageBackground>
    </View>
  );
};



export default Attractions;