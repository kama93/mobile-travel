import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './home-screen.js';
import Map from './map-screen';
import Flight from './flight';
import Hotels from './hotels';
import LogIn from './login';
import Registration from './registration'
import HederIconLogin from './header-login-icon'

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={() => ({
            title: 'Create you next journey',
            headerRight: () => (
             <HederIconLogin/> 
            ),
            headerStyle: {
              backgroundColor: '#3D6DCC',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 25 }}
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
    </Provider>
  );
};


export default App;