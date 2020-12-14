import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ImageBackground, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';

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
  loginTitle:{
    fontSize: 20,
    margin:10,
    fontFamily: 'Architects Daughter Regular'
  },
  inputStyle: {
    height: 50,
    borderColor: 'rgba(46, 49, 49, 1)',
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
  registrationLink:{
    fontSize: 20,
    fontFamily: 'Architects Daughter Regular'
  },
  textRegistrationContainer:{
    alignItems: 'center'
  }
});

const Login = () => {
  return (
    <View>
      <ImageBackground source={require('./image/login.png')} resizeMode='cover' style={styles.image}
        imageStyle={{ opacity: 0.5 }}
      >
        <View style={styles.inputBackground}>
          <Text style={styles.loginTitle}>Please login to your account</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="User"
            placeholderTextColor="rgba(46, 49, 49, 1)"
            // onChangeText={text => onChangeText(text)}
            // value={value}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            placeholderTextColor="rgba(46, 49, 49, 1)"
            // onChangeText={text => onChangeText2(text)}
            // value={value2}
          />
          <TouchableOpacity
                onPress={this.onPress}
                style={styles.textRegistrationContainer}
              >
                <Text style={styles.registrationLink}>Registration HERE!</Text>
              </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;