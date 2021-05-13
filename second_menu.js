import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

let width = Dimensions.get('window').width;

const SecondMenu = () => {


  return (
    <View>
    <View style={styles.inputsContainer}>
      <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
          <Text style={styles.fullWidthButtonText}>Safety Information</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
          <Text style={styles.fullWidthButtonText}>Currency exchange</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
          <Text style={styles.fullWidthButtonText}>Saved Information</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
          <Text style={styles.fullWidthButtonText}>Liked attractions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
          <Text style={styles.fullWidthButtonText}>Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
          <Text style={styles.fullWidthButtonText}>Thinks to pack</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
          <Text style={styles.fullWidthButtonText}>Cost estimate</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
          <Text style={styles.fullWidthButtonText}>Movit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
          <Text style={styles.fullWidthButtonText}>QR code scanner</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.fullWidthButton, styles.button1Background]} onPress={() => navigation.navigate()}>
          <Text style={styles.fullWidthButtonText}>Weather Information</Text>
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
    height: 79,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButtonText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    fontFamily: 'Architects Daughter Regular',
    bottom: 0, 
    left: 0
  }

});

export default SecondMenu
