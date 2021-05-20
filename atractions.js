import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Text, ScrollView, Dimensions, Modal, Image, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

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
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    width: 350,
    height: 350,
    margin: 30,
    marginTop: 200,
    marginBottom: 100,
    padding: 35,
    borderRadius: 10,
    backgroundColor: 'rgba(270,270,270,0.8)',
    zIndex: 1002,
  },
  modalText: {
    fontFamily: 'Architects Daughter Regular',
    fontSize: 20,
    marginTop: 60
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1001,
  },
  attractionPhoto: {
    height: 220,
    width: 220,
    marginTop: 20
  },
  attractionResultButton: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#3DCC6D",
    padding: 8,
    borderRadius: 3,
    width: 280

  },
  attractionResultButtonText: {
    fontFamily: 'Architects Daughter Regular',
    color: 'white'
  }
})
const Attractions = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [attractionsInfo, setAttractionsInfo] = useState(null);
  const [attractionsDescription, setAttractionsDescription] = useState(null);
  const [attractionsUrl, setAttractionsUrl] = useState(null);
  const [attractionsCoordinates, setAttractionsCoordinates] = useState(null);
  const [attractionsImage, setAttractionsImage] = useState(null);
  const [myPosition, setMyPosition] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  Geolocation.getCurrentPosition(info => setMyPosition(info));

  const lookingForAttractions = () => {
    fetch(`http://127.0.0.1:5000/attractions/${city}/${country}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        setAttractionsInfo(data)
      })
  }

  const fetchAttractionsWithCurrentPosition = () => {
    if (myPosition.coords && myPosition.coords.latitude && myPosition.coords.longitude) {
      fetch(`http://127.0.0.1:5000/attractionsCoordinates/${myPosition.coords.latitude}/${myPosition.coords.longitude}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .then(data => {
          setAttractionsInfo(data.url)
        })
    }
  }

  const openModal = (wikiId, coordinates) => {
    setModalVisible(true)
    fetch(`http://127.0.0.1:5000/wikidata/description/${wikiId}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (data.entities[wikiId].sitelinks.enwiki) {
          setAttractionsUrl(data.entities[wikiId].sitelinks.enwiki.url)
        }
        else if (data.entities[wikiId].sitelinks.alswiki) {
          setAttractionsUrl(data.entities[wikiId].sitelinks.alswiki.url)
        }
        setAttractionsDescription(data.entities[wikiId].descriptions.en.value)
      })
    fetch(`http://127.0.0.1:5000//wikidata/image/${wikiId}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        setAttractionsImage(data)
      })
      setAttractionsCoordinates(coordinates)
  }

  const handlePress = () => {
    Linking.openURL(attractionsUrl);
  }

  const closeModal = () => {
    setModalVisible(false)
    setAttractionsDescription(null)
    setAttractionsImage(null)
    setAttractionsUrl(null)
    setAttractionsCoordinates(null)
  }

  const clean = () => {
    setAttractionsInfo(null)
    setCity('')
    setCountry('')

  }

  return (
    <View>
      <ImageBackground source={require('./image/atractionsIn.jpg')} resizeMode='cover' style={styles.image} imageStyle={{ opacity: 0.2 }}>
        <View style={styles.inputBackground}>
          {!attractionsInfo ?
            (<View>
              <View style={styles.containerList}>
                <TouchableOpacity style={styles.inputStyle}>
                  <TextInput style={styles.itemText} placeholder='City' onChangeText={setCity}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inputStyle}>
                  <TextInput style={styles.itemText} placeholder='Country' onChangeText={setCountry}></TextInput>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: '#3D6DCC', width: 280, borderRadius: 7, marginRight: 10, marginBottom: 10 }} onPress={() => lookingForAttractions()}>
                  <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Check</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#3DCC6D', width: 280, borderRadius: 7 }} onPress={() => fetchAttractionsWithCurrentPosition()}>
                  <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Get current position</Text>
                </TouchableOpacity>
              </View>
            </View>) :
            (
              <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: '#3DCC6D', width: 280, borderRadius: 7, marginBottom: 10 }} onPress={() => clean()}>
                  <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Clean</Text>
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  dismiss={() => closeModal()}
                  onRequestClose={() => closeModal()}
                  style={styles.modalContainer}
                >
                  <TouchableWithoutFeedback onPress={() => closeModal()}>
                    <View style={styles.modalOverlay} />
                  </TouchableWithoutFeedback>
                  <TouchableOpacity style={styles.modalContent} onPress={() => closeModal()}>
                    {attractionsImage &&
                      <Image style={styles.attractionPhoto} source={attractionsImage} />}
                    <Text style={styles.modalText}>{attractionsDescription && attractionsDescription.charAt(0).toUpperCase() + attractionsDescription.slice(1)}</Text>
                    {attractionsUrl &&
                      <TouchableOpacity style={styles.attractionResultButton} onPress={() => handlePress()}>
                        <Text style={styles.attractionResultButtonText}>Check more on Wikipedia</Text>
                      </TouchableOpacity>}
                    {attractionsCoordinates && attractionsUrl &&
                      <TouchableOpacity style={{ backgroundColor: '#3D6DCC', width: 280, borderRadius: 7, marginRight: 10, marginTop: 15 }} onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${attractionsCoordinates[1]},${attractionsCoordinates[0]}&dir_action=navigate`)}>
                        <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Check on maps</Text>
                      </TouchableOpacity>}
                  </TouchableOpacity>
                </Modal>
                <ScrollView style={{ width: screenWidth }}>
                  {attractionsInfo && attractionsInfo.features.map((x) =>
                    <TouchableOpacity key={x.properties.xid} style={{ backgroundColor: '#d1ddf3', width: screenWidth, borderRadius: 3, padding: 5, marginTop: 15 }} onPress={() => openModal(x.properties.wikidata, x.geometry.coordinates)}>
                      <Text style={{ color: 'black', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>-{x.properties.name}-</Text>
                    </TouchableOpacity>
                  )}
                </ScrollView>
              </View>
            )}
        </View>
      </ImageBackground>
    </View>
  );
};



export default Attractions;