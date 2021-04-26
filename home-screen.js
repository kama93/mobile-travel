import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

let width = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {


  return (
    <View>
    <View style={styles.inputsContainer}>
      <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate('Map')}>
        <ImageBackground source={require('./image/map.jpg')} style={styles.img} >
          <Text style={styles.fullWidthButtonText}>Pick up direction</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate('Flight')}>
        <ImageBackground source={require('./image/plane.jpg')} style={styles.img}>
          <Text style={styles.fullWidthButtonText}>Flight</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate('Hotels')}>
        <ImageBackground source={require('./image/hotel.jpg')} style={styles.img}>
          <Text style={styles.fullWidthButtonText}>Hotels</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate('Attractions')}>
        <ImageBackground source={require('./image/attractions.jpg')} style={styles.img}>
          <Text style={styles.fullWidthButtonText}>Attractions</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputsContainer: {
    flex: 1,
  },
  fullWidthButton: {
    height: 202,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    height: 202,
    width: width,
    position: 'relative', // because it's parent
    top: 0,
    left: 0
  },
  fullWidthButtonText: {
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    fontSize: 50,
    fontFamily: 'Architects Daughter Regular',
    bottom: 0, 
    left: 0
  }

});

export default HomeScreen
