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
  registrationTitle: {
    fontSize: 20,
    margin: 10,
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
  registrationLink: {
    fontSize: 20,
    fontFamily: 'Architects Daughter Regular'
  },
  textRegistrationContainer: {
    alignItems: 'center'
  }
});

const Registration = ( { setCurrentUser } ) => {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [name, setName] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const navigation = useRef(useNavigation());

  const signUpFetch = () => {
    fetch('http://127.0.0.1:5000/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: signUpEmail,
        password: signUpPassword,
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.name) {
        setCurrentUser(user);
        navigation.current.navigate("Home");
      } else {
        alert('you need register')
      }
    })
  }

  return (
    <View>
      <ImageBackground source={require('./image/registration.png')} resizeMode='cover' style={styles.image}
        imageStyle={{ opacity: 0.5 }}
      >
        <View style={styles.inputBackground}>
          <Text style={styles.registrationTitle}>Please Fill Registration Form</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Name"
            placeholderTextColor="rgba(46, 49, 49, 1)"
            onChangeText={text => setName(text)}
            value={name}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            placeholderTextColor="rgba(46, 49, 49, 1)"
            onChangeText={text => setSignUpEmail(text)}
            value={signUpEmail}
          />
          <TextInput
            style={styles.inputStyle}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="rgba(46, 49, 49, 1)"
            onChangeText={text => setSignUpPassword(text)}
            value={signUpPassword}
          />
          <View style={styles.date2}>
            <Button title="SignUp!"
              onPress={() => signUpFetch()}
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
            onPress={this.onPress}
            style={styles.textRegistrationContainer}
          >
            <Text style={styles.registrationLink}>Login HERE!</Text>
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

export default connect(null, mapDispatchToProps)(Registration);