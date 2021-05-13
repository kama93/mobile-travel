import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, ImageBackground, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    position: 'relative',
    top: 0,
    left: 0
  },
  inputBackground: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    margin: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: '#B7BDC6',
    shadowOpacity: 1.0,
  },
  containerList: {
    zIndex: 1000,
  },
  inputStyle: {
    height: 50,
    borderColor: 'grey',
    borderWidth: 2,
    width: 350,
    marginBottom: 15,
    borderRadius: 10,
    marginTop: 80
  },
  itemText: {
    fontSize: 15,
    padding: 8,
    margin: 2,
    fontFamily: 'Architects Daughter Regular',
    textAlign: 'center'
  },
  hotelPhoto: {
    width: 130,
    height: 130,
    zIndex: 1000,
    padding: 10,
    marginBottom: 22,
    marginLeft: 10
  },
  hotelResultContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  hotelResultInfo: {
    marginLeft: 15,
  },
  hotelResultText: {
    fontFamily: 'Architects Daughter Regular',
    fontSize: 18,
  },
  hotelResultButton: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#E5ECF8",
    padding: 8,
    borderRadius: 3,
  },
  hotelResultButtonText: {
    fontFamily: 'Architects Daughter Regular',
  }
});

const Attractions = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [atractionsInfo, setAtractionsInfo] = useState(null)

  const lookingForAttractions = () => {
    fetch(`http://127.0.0.1:5000/attractions/${city}/${country}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        setAtractionsInfo(data)
      })
  }

  const clean = () => {
    setAtractionsInfo(null)
    setCity('')
    setCountry('')
  }

  return (
    <View>
      <ImageBackground source={require('./image/atractionsIn.jpg')} resizeMode='cover' style={styles.image} imageStyle={{ opacity: 0.2 }}>
        <View style={styles.inputBackground}>
          {!atractionsInfo ?
            (<View>
              <View style={styles.containerList}>
                <TouchableOpacity style={styles.inputStyle}>
                  <TextInput style={styles.itemText} placeholder='City' onChangeText={setCity}>
                  </TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inputStyle}>
                  <TextInput style={styles.itemText} placeholder='Country' onChangeText={setCountry}>
                  </TextInput>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: '#3D6DCC', width: 270, borderRadius: 7, marginRight: 10 }} onPress={() => lookingForAttractions()}>
                  <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Check</Text>
                </TouchableOpacity>
              </View>
            </View>) :
            (<ScrollView style={{ width: screenWidth }}>
              {/* {hotelInfo.map((x) =>
                <View style={styles.hotelResultContainer}>
                  {/* <Image style={styles.hotelPhoto} source={{  }} /> */}
              {/* <View style={styles.hotelResultInfo}>
                    <Text style={styles.hotelResultText}></Text>
                    <Text style={styles.hotelResultText}>Minimum price:</Text>
                    <Text style={styles.hotelResultText}>Score:</Text>
                    <TouchableOpacity style={styles.hotelResultButton} onPress={() => handlePress()}>
                      <Text style={styles.hotelResultButtonText}>Check on booking.com</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )} */} */}
              <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: '#3DCC6D', width: 270, borderRadius: 7 }} onPress={() => clean()}>
                  <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Clean</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>)}
        </View>
      </ImageBackground>
    </View>
  );
};



export default Attractions;