import React from 'react';
import { StyleSheet, ImageBackground, Text, Dimensions,  TouchableOpacity, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const SaveInfo = () => {

  return (
    <View style={styles.container}>
        <ImageBackground source={require('./image/sticky.png')} resizeMode='cover' style={styles.image} imageStyle={{ opacity: 0.2 }}>
            <TouchableOpacity style={styles.button}>
                <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Architects Daughter Regular' }}>Add new note</Text>
            </TouchableOpacity>
        </ImageBackground>
    
    </View>
  );
}

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
        position: 'relative',
        top: 0,
        left: 0,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#3DCC6D', 
        width: '50%', 
        borderRadius: 7,
        marginTop: 20
    }
});

export default SaveInfo