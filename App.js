import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Image } from 'react-native';
import HomeScreen from './home-screen.js';
import Map from './map-screen';
import Flight from './flight';


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
          options={{
          title: 'Create you next journey',
          headerStyle: {
            backgroundColor: '#3D6DCC',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Architects Daughter Regular'
          },
        }}
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
          headerBackTitleStyle:{
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
          name="Flight"
          component={Flight}
          options={{
          title: 'Choose dates and places',
          headerStyle: {
            backgroundColor: '#3D6DCC',
            fontFamily: 'Architects Daughter Regular'
          },
          headerTintColor: '#fff',
          headerBackTitleStyle:{
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