import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './home-screen.js';
import Map from './map-screen';
import Flight from './flight';
import Hotels from './hotels';
import Attractions from './atractions';
import LogIn from './login';
import Registration from './registration';
import HederIconLogin from './header-login-icon';
import MenuButton from './menu_button';
import SecondMenu from './second_menu';
import SavedInfo from './saved_info';
import Currency from './currency'
import Camera from './QR_code';
import SaveInfo from './savedInfo'

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
                <HederIconLogin />
              ),
              headerStyle: {
                backgroundColor: '#3D6DCC',
              },
              headerLeft: () => (
                <MenuButton />
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
              title: 'Check minimum hotel prices',
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
            name="Attractions"
            component={Attractions}
            options={{
              title: 'Press to see more details',
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
           <Stack.Screen
            name="SecondMenu"
            component={SecondMenu}
            options={{
              title: 'Press one of below',
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
            name="SavedInfo"
            component={SavedInfo}
            options={{
              title: 'Check information about country',
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
            name="Currency"
            component={Currency}
            options={{
              title: 'Check currency exchange rate',
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
            name="Camera"
            component={Camera}
            options={{
              title: 'Scan QR code',
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
            name="SaveInfo"
            component={SaveInfo}
            options={{
              title: 'Add your notes',
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