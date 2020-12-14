import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Image, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './home-screen.js';
import Map from './map-screen';
import Flight from './flight';
import Hotels from './hotels';
import LogIn from './login';
import Registration from './registration'


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Create you next journey',
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 25 }}
                onPress={() => navigation.navigate('LogIn')}
              >
                <Text><Icon name="user" size={30} color="white" />
                </Text>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#3D6DCC',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 25 }}
                onPress={() => navigation.navigate('Registration')}
              >
                <Text><Icon name="bars" size={30} color="white" />
                </Text>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#3D6DCC',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Architects Daughter Regular'
            },
          })
          }
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            title: 'Click on your next destination',
            headerStyle: {
              backgroundColor: '#3D6DCC',
              fontFamily: 'Architects Daughter Regular'
            },
            headerTintColor: '#fff',
            headerBackTitleStyle: {
              fontFamily: 'Architects Daughter Regular',
              fontSize: 13
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Architects Daughter Regular'
            }
          }}
        />
        <Stack.Screen
          name="Flight"
          component={Flight}
          options={{
            title: 'Choose dates and places',
            headerStyle: {
              backgroundColor: '#3D6DCC',
              fontFamily: 'Architects Daughter Regular'
            },
            headerTintColor: '#fff',
            headerBackTitleStyle: {
              fontFamily: 'Architects Daughter Regular',
              fontSize: 13
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Architects Daughter Regular'
            },
          }}
        />
        <Stack.Screen
          name="Hotels"
          component={Hotels}
          options={{
            title: 'Choose dates and places',
            headerStyle: {
              backgroundColor: '#3D6DCC',
              fontFamily: 'Architects Daughter Regular'
            },
            headerTintColor: '#fff',
            headerBackTitleStyle: {
              fontFamily: 'Architects Daughter Regular',
              fontSize: 13
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Architects Daughter Regular'
            },
          }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{
            title: 'Login to your account',
            headerStyle: {
              backgroundColor: '#3D6DCC',
              fontFamily: 'Architects Daughter Regular'
            },
            headerTintColor: '#fff',
            headerBackTitleStyle: {
              fontFamily: 'Architects Daughter Regular',
              fontSize: 13
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Architects Daughter Regular'
            },
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            title: 'Registration form',
            headerStyle: {
              backgroundColor: '#3D6DCC',
              fontFamily: 'Architects Daughter Regular'
            },
            headerTintColor: '#fff',
            headerBackTitleStyle: {
              fontFamily: 'Architects Daughter Regular',
              fontSize: 13
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Architects Daughter Regular'
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;