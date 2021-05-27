import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions, TextInput } from 'react-native';
let width = Dimensions.get('window').width;

const SavedInfo = () => {
    const [country, setCountry] = useState('');
    const [info, setInfo] = useState(null);

    const lookingForInfo = () => {
          fetch(`http://127.0.0.1:5000/safe_info/${country}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
          })
            .then(response => response.json())
            .then(data => {
                console.log(data.health.diseasesAndVaccinesInfo.Food/Water.description)
                setInfo(data)
            })
      }

    const clean = () =>{
        setInfo(null)
        setCountry('')
    }

    return (
        <View>
            <ImageBackground source={require('./image/passport.png')} resizeMode='cover' style={styles.image} imageStyle={{ opacity: 0.2 }}>
                {!info?
                (<View>
                    <View>
                        <TouchableOpacity style={styles.inputStyle}>
                            <TextInput style={styles.itemText} placeholder='Country' placeholderTextColor='#505050' onChangeText={setCountry}>
                            </TextInput>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: '#3D6DCC', width: 270, borderRadius: 7, marginRight: 10 }} onPress={() => lookingForInfo()}>
                            <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Check</Text>
                        </TouchableOpacity>
                    </View>
                </View>):(
                    <View>
                        <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: '#3DCC6D', width: 270, borderRadius: 7, marginRight: 10 }} onPress={() => clean()}>
                            <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Clean</Text>
                        </TouchableOpacity>
                        <View>
                           <Text>{info.advisoryText}</Text>
                           <Text>Food and water</Text>
                           {/* <Text>{info.health.diseasesAndVaccinesInfo}</Text> */}
                        </View>
                    </View>
                    </View>
                )}
            </ImageBackground>
        </View>
    )

}
const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
        position: 'relative',
        top: 0,
        left: 0
    },
    inputStyle: {
        height: 50,
        borderColor: '#B7BDC6',
        borderWidth: 2,
        width: 350,
        marginBottom: 15,
        borderRadius: 10,
        marginTop: 80,
        margin:20,
        borderColor: "#505050"
    },
    itemText: {
        fontSize: 15,
        padding: 8,
        margin: 2,
        fontFamily: 'Architects Daughter Regular',
        textAlign: 'center'
    },

});

export default SavedInfo
