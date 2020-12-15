import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/actions-user';
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


const Login = ( { setCurrentUser } ) => {
  let [signInEmail, setSignInEmail] = useState('');
  let [signInPassword, setSignInPassword] = useState('');

  const navigation = useRef(useNavigation());

  const signInFetch = () => {
    fetch('http://127.0.0.1:5000/login', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.name) {
        setCurrentUser(data);
        navigation.current.navigate("Home");
      } else {
        alert('you need register')
      }
    })
  }
  
  return (
    <View>
      <ImageBackground source={require('./image/login.png')} resizeMode='cover' style={styles.image}
        imageStyle={{ opacity: 0.5 }}
      >
        <View style={styles.inputBackground}>
          <Text style={styles.loginTitle}>Please login to your account</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            placeholderTextColor="rgba(46, 49, 49, 1)"
            onChangeText={text => setSignInEmail(text)}
            value={signInEmail}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            placeholderTextColor="rgba(46, 49, 49, 1)"
            onChangeText={text => setSignInPassword(text)}
            value={signInPassword}
          />
           <View style={styles.date2}>
            <Button title="SignIn!"
              onPress={() => signInFetch()}
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
          <TouchableOpacity
                onPress={() => navigation.current.navigate("Registration")}
                style={styles.textRegistrationContainer}
              >
                <Text style={styles.registrationLink}>Registration HERE!</Text>
              </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(setCurrentUser(user))
  }
}

export default connect(null, mapDispatchToProps)(Login);